import { writeFile } from "fs/promises";
import { fetchCloudinaryUrls } from "./cloudinaryHelpers.js";

async function generateGalleryIndex() {
  const folder_gallery = process.env.CLOUDINARY_FOLDER_GALLERY;

  if (!folder_gallery) {
    console.error("❌ CLOUDINARY_FOLDER_GALLERY is not defined in your .env file.");
    return;
  }

  const image_url = await fetchCloudinaryUrls(folder_gallery, "image");

  const res = image_url.map((img) => ({
    url: img.url,
    public_id: img.public_id,
  }));

  await writeFile(
    "./src/data/gallery_items.json",
    JSON.stringify(res, null, 2),
    "utf-8"
  );

  console.log(`✅ gallery_items.json generated with ${res.length} items.`);
}

generateGalleryIndex();
