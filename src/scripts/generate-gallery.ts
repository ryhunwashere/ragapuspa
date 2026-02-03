import { fetchCloudinaryUrls, type CloudinaryConfig } from "./cdn-urls-fetcher.ts";

const WIDTH_NORMAL = 640;
const WIDTH_SMALL = 400;
const FORMAT = "webp";
const QUALITY_NORMAL = "auto:low";
const QUALITY_SMALL = "auto:eco";

function transform(url: string, width: number, quality: string) {
  return url.replace(
    `/upload/`,
    `/upload/w_${width},f_${FORMAT},q_${quality}/`
  );
}

async function getGalleryItems(config: CloudinaryConfig) {
  const fetchedImages = await fetchCloudinaryUrls(config, "image");

  return fetchedImages
    .filter(img => img.url && img.publicId) // validate entries
    .map((img) => ({
      imageUrlNormal: transform(img.url, WIDTH_NORMAL, QUALITY_NORMAL),
      imageUrlSmall: transform(img.url, WIDTH_SMALL, QUALITY_SMALL),
      imagePublicId: img.publicId,
    }));
}

export default getGalleryItems;