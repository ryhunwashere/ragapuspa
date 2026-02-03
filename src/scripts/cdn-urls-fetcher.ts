import { v2 as cloudinary } from "cloudinary";

type ImageData = {
  url: string;
  publicId: string;
  uploadedAt: string;
}

export type CloudinaryConfig = {
  cloudName: string,
  apiKey: string,
  apiSecret: string
  galleryFolder: string,
  musicFolder: string,
  musicArtworksFolder: string
}

export async function fetchCloudinaryUrls(config: CloudinaryConfig, type: string): Promise<ImageData[]> {
  cloudinary.config({
    cloud_name: config.cloudName,
    api_key: config.apiKey,
    api_secret: config.apiSecret,
  });

  const allResources = [];
  let nextCursor: string | undefined;

  try {
    do {
      const res = await cloudinary.search
        .expression(`folder:${config.galleryFolder} AND resource_type:${type}`)
        .max_results(100)
        .next_cursor(nextCursor)
        .execute();

      allResources.push(...res.resources);
      nextCursor = res.next_cursor;
    } while (nextCursor);

    return allResources.map((item) => ({
      url: item.secure_url,
      publicId: item.public_id,
      uploadedAt: item.uploaded_at,
    }));
  } catch (err: any) {
    throw new Error(`Failed to fetch from Cloudinary folder "${config.galleryFolder}":`, err);
  }
}
