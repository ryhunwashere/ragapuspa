import { writeFile } from "fs/promises";
import { v2 as cloudinary } from "cloudinary";
import "dotenv/config.js"; // Ensure .env is loaded (add `.js` if needed for ESM)

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function generateGalleryIndex() {
  const folder = process.env.CLOUDINARY_FOLDER;
  if (!folder) {
    console.error("❌ CLOUDINARY_FOLDER is not defined in your .env file.");
    return;
  }

  const images = [];
  let nextCursor;

  try {
    do {
      const res = await cloudinary.search
        .expression(`folder:${folder} AND resource_type:image`)
        .max_results(100)
        .next_cursor(nextCursor)
        .execute();

      images.push(...res.resources);
      nextCursor = res.next_cursor;
    } while (nextCursor);

    const simplified = images.map(img => ({
      url: img.secure_url,
      public_id: img.public_id,
    }));

    await writeFile(
      "./src/data/gallery.json",
      JSON.stringify(simplified, null, 2),
      "utf-8"
    );

    console.log(`✅ gallery.json generated with ${simplified.length} images.`);
  } catch (err) {
    console.error("❌ Failed to generate gallery index:", err);
  }
}

generateGalleryIndex();
