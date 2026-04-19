import { GetObjectCommand, ListObjectsV2Command, S3Client, type S3ClientConfig } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

type S3Config = {
  s3Client: {
    bucket: string;
    folderPrefix: string;
    endpoint: string;
    region: string;
    accessKey: string;
    accessSecret: string;
  };
  cloudflareAccess: {
    clientId: string;
    clientSecret: string;
  };
};

const IMAGE_EXTENSIONS = new Set([".jpg", ".jpeg", ".gif", ".png", ".webp"]);

const getBaseClientConfig = (conf: S3Config["s3Client"]): S3ClientConfig => ({
  endpoint: conf.endpoint,
  region: conf.region,
  credentials: {
    accessKeyId: conf.accessKey,
    secretAccessKey: conf.accessSecret,
  },
  forcePathStyle: true,
});

export default async function getGalleryItems(conf: S3Config) {
  const { bucket, folderPrefix } = conf.s3Client;
  
  const signingClient = new S3Client(getBaseClientConfig(conf.s3Client));
  const internalClient = new S3Client(getBaseClientConfig(conf.s3Client));

  internalClient.middlewareStack.add(
    (next) => (args: any) => {
      args.request.headers["CF-Access-Client-Id"] = conf.cloudflareAccess.clientId;
      args.request.headers["CF-Access-Client-Secret"] = conf.cloudflareAccess.clientSecret;
      return next(args);
    },
    { step: "finalizeRequest", name: "addCloudflareAccessHeaders" }
  );

  try {
    const { Contents = [] } = await internalClient.send(
      new ListObjectsV2Command({ Bucket: bucket, Prefix: folderPrefix })
    );

    return await Promise.all(
      Contents
        .filter(({ Key }) => Key && IMAGE_EXTENSIONS.has(Key.toLowerCase().slice(Key.lastIndexOf("."))))
        .map(async ({ Key }) => {
          const signedUrl = await getSignedUrl(
            signingClient,
            new GetObjectCommand({ Bucket: bucket, Key }),
            { expiresIn: 3600 }
          );

          return {
            imageUrlNormal: signedUrl,
            imageUrlSmall: signedUrl,
            imagePublicId: Key ?? "ragapuspa",
          };
        })
    );
  } catch (err) {
    console.error("S3/Cloudflare Communication Error:", err);
    throw err;
  }
}