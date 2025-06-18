import { writeFile } from "fs/promises";
import { fetchCloudinaryUrls } from "./cloudinaryHelpers.js";

async function generateGalleryIndex() {
  const galleryFolder = process.env.CLOUDINARY_FOLDER_GALLERY;

  if (!galleryFolder) {
    console.error("❌ CLOUDINARY_FOLDER_GALLERY is not defined in your .env file.");
    return;
  }

  const imageUrl = await fetchCloudinaryUrls(galleryFolder, "image");

  const images = imageUrl.map((img) => ({
    imageUrl: img.url,
    imagePublicId: img.publicId,
  }));

  await writeFile(
    "./src/data/gallery_items.json",
    JSON.stringify(images, null, 2),
    "utf-8"
  );

  console.log(`✅ gallery_items.json generated with ${images.length} items.`);
}

generateGalleryIndex();
