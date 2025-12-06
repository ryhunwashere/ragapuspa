import cloudinary from "@scripts/cloudinaryConfig.ts";

export async function fetchCloudinaryUrls(folderPath: string, type: string) {
  const allResources = [];
  let nextCursor: string | undefined;

  try {
    do {
      const res = await cloudinary.search
        .expression(`folder:${folderPath} AND resource_type:${type}`)
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
  } catch (err) {
    console.error(`❌ Failed to fetch from Cloudinary folder "${folderPath}":`, err);
    return [];
  }
}
