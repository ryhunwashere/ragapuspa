import cloudinary from "./cloudinaryConfig.js";

export async function fetchCloudinaryUrls(folder, type) {
  const allResources = [];
  let nextCursor;

  try {
    do {
      const res = await cloudinary.search
        .expression(`folder:${folder} AND resource_type:${type}`)
        .max_results(100)
        .next_cursor(nextCursor)
        .execute();

      allResources.push(...res.resources);
      nextCursor = res.next_cursor;
    } while (nextCursor);

    return allResources.map((item) => ({
      url: item.secure_url,
      public_id: item.public_id,
      uploaded_at: item.uploaded_at,
    }));
  } catch (err) {
    console.error(`❌ Failed to fetch from Cloudinary folder "${folder}":`, err);
    return [];
  }
}
