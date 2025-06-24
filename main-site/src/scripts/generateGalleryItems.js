import { writeFile } from "fs/promises";
import { fetchCloudinaryUrls } from "./cloudinaryHelpers.js";

const WIDTH_NORMAL = "640";
const WIDTH_SMALL = "400";
const FORMAT = "webp";
const QUALITY_NORMAL = "auto:low";
const QUALITY_SMALL = "auto:eco";

function transform(url, width, quality) {
  return url.replace(
    `/upload/`,
    `/upload/w_${width},f_${FORMAT},q_${quality}/`
  );
}

async function generateGalleryItems() {
  const galleryFolder = process.env.CLOUDINARY_FOLDER_GALLERY;

  if (!galleryFolder) {
    console.error("❌ CLOUDINARY_FOLDER_GALLERY is not defined in your .env file.");
    return;
  }

  const fetchedImages = await fetchCloudinaryUrls(galleryFolder, "image");

  const images = fetchedImages
    .filter(img => img.url && img.publicId) // validate entries
    .map((img) => ({
      imageUrlNormal: transform(img.url, WIDTH_NORMAL, QUALITY_NORMAL),
      imageUrlSmall: transform(img.url, WIDTH_SMALL, QUALITY_SMALL),
      imagePublicId: img.publicId,
    }));

  await writeFile(
    "./public/gallery_items.json",
    JSON.stringify(images, null, 2),
    "utf-8"
  );
  console.log(`✅ ./public/gallery_items.json generated with ${images.length} items.`);

  await writeFile(
    "./src/data/gallery_items.json",
    JSON.stringify(images, null, 2),
    "utf-8"
  );
  console.log(`✅ ./src/data/gallery_items.json generated with ${images.length} items.`);
}

generateGalleryItems();
