import {
  ListObjectsV2Command,
  S3Client,
  type S3ClientConfig,
} from "@aws-sdk/client-s3";
import fs from "fs";
import path from "path";

type S3Config = {
  s3Client: {
    bucket: string;
    folderPrefix: string;
    endpoint: string;
    region: string;
    accessKey: string;
    accessSecret: string;
  };
};

const IMAGE_EXTENSIONS = new Set([".jpg", ".jpeg", ".gif", ".png", ".webp"]);
const OUTPUT_DIR = path.resolve("src/assets/gallery");

const getBaseClientConfig = (conf: S3Config["s3Client"]): S3ClientConfig => ({
  endpoint: conf.endpoint,
  region: conf.region,
  credentials: {
    accessKeyId: conf.accessKey,
    secretAccessKey: conf.accessSecret,
  },
  forcePathStyle: true,
});

function buildPublicUrl(endpoint: string, bucket: string, key: string): string {
  const base = endpoint.replace(/\/$/, "");
  return `${base}/${bucket}/${encodeURIComponent(key).replace(/%2F/g, "/")}`;
}

async function downloadImage(url: string, destPath: string): Promise<void> {
  if (fs.existsSync(destPath)) return;

  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.status}`);

  const buffer = await res.arrayBuffer();
  fs.mkdirSync(path.dirname(destPath), { recursive: true });
  fs.writeFileSync(destPath, Buffer.from(buffer));
}

async function listAllObjects(
  client: S3Client,
  bucket: string,
  prefix: string,
) {
  let continuationToken: string | undefined = undefined;
  const all: any[] = [];

  while (true) {
    const res = await client.send(
      new ListObjectsV2Command({
        Bucket: bucket,
        Prefix: prefix,
        ContinuationToken: continuationToken,
      }),
    );

    if (res.Contents) all.push(...res.Contents);

    if (!res.IsTruncated) break;
    continuationToken = res.NextContinuationToken;
  }

  return all;
}

async function runWithConcurrency<T>(
  items: T[],
  limit: number,
  worker: (item: T) => Promise<void>,
  delayMs = 150,
) {
  const queue = [...items];

  const workers = Array.from({ length: limit }).map(async () => {
    while (queue.length) {
      const item = queue.shift()!;
      await worker(item);
      if (delayMs > 0) {
        await new Promise((r) => setTimeout(r, delayMs));
      }
    }
  });

  await Promise.all(workers);
}

async function getGalleryItems(conf: S3Config) {
  const { bucket, folderPrefix, endpoint } = conf.s3Client;
  const client = new S3Client(getBaseClientConfig(conf.s3Client));

  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  try {
    const allObjects = await listAllObjects(client, bucket, folderPrefix);

    const imageObjects = allObjects.filter(
      ({ Key }) => Key && IMAGE_EXTENSIONS.has(path.extname(Key).toLowerCase()),
    );

    await runWithConcurrency(
      imageObjects,
      5,
      async ({ Key }) => {
        const url = buildPublicUrl(endpoint, bucket, Key!);
        const filename = Key!.replace(/\//g, "_");
        const destPath = path.join(OUTPUT_DIR, filename);
        await downloadImage(url, destPath);
      },
      150,
    );

    console.log(
      `[gallery] ${imageObjects.length} images ready in ${OUTPUT_DIR}`,
    );
    return imageObjects.length;
  } catch (err) {
    console.error("S3 communication error:", err);
    throw err;
  }
}

const config = {
  s3Client: {
    bucket: process.env.S3_BUCKET || "",
    folderPrefix: process.env.S3_FOLDER_PREFIX || "",
    endpoint: process.env.S3_ENDPOINT || "",
    region: process.env.S3_REGION || "",
    accessKey: process.env.S3_ACCESS_KEY || "",
    accessSecret: process.env.S3_ACCESS_SECRET || "",
  }
};

getGalleryItems(config);