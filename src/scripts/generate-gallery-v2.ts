import { env, S3Client, write } from "bun";
import path from "path";

const OUTPUT_DIR = path.resolve("src/assets/gallery");

async function getGalleryItems() {
  const prefix = env.S3_FOLDER_PREFIX;

  if (!prefix)
    throw new Error("S3_FOLDER_PREFIX is undefined.");

  const s3 = new S3Client({
    bucket: env.S3_BUCKET,
    secretAccessKey: env.S3_ACCESS_SECRET,
    accessKeyId: env.S3_ACCESS_KEY,
    region: env.S3_REGION,
    endpoint: env.S3_ENDPOINT,
  });

  const objList = await s3.list({ prefix });

  await Promise.all(
    (objList.contents ?? []).map(async ({ key }) => {
      if (!key || key === prefix) return;

      const newKey = key.replace(prefix, "");

      const file = s3.file(key);

      await write(`${OUTPUT_DIR}/${newKey}`, file);
      console.log(`Downloaded: ${key}`);
    }),
  );
}

try {
  getGalleryItems();
} catch (err: any) {
  throw err;
}
