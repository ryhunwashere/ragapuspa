import { writeFile } from "fs/promises";
import { fetchCloudinaryUrls } from "./cloudinaryHelpers.js";

async function generateMusicItems() {
  const tracksFolder = process.env.CLOUDINARY_FOLDER_MUSIC_TRACKS;
  const artworksFolder = process.env.CLOUDINARY_FOLDER_MUSIC_ARTWORKS;

  if (!tracksFolder || !artworksFolder) {
    console.error(
      "❌ CLOUDINARY_FOLDER_MUSIC_TRACKS and/or CLOUDINARY_FOLDER_MUSIC_ARTWORKS is not defined in your .env file."
    );
    return;
  }

  const trackUrls = await fetchCloudinaryUrls(tracksFolder, "video");
  const artworkUrls = await fetchCloudinaryUrls(artworksFolder, "image");

  const albums = [];

  // Group tracks by album name using naming convention: AlbumName|TrackName
  trackUrls.forEach((track) => {
    const basePublicId = track.publicId.split("_")[0]; // Remove random Cloudinary suffix if exists
    const albumName = basePublicId.split("|")[0];

    const lastAlbumEntry = albums[albums.length - 1];
    const isSameAsPreviousAlbum =
      lastAlbumEntry && lastAlbumEntry.albumName === albumName;

    if (isSameAsPreviousAlbum) {
      // Add track to existing album entry
      lastAlbumEntry.tracks.push({
        url: track.url,
        publicId: track.publicId,
      });
    } else {
      // Find matching artwork using same albumName prefix
      const artwork = artworkUrls.find(
        (art) => art.publicId === albumName
      );

      albums.push({
        albumName,
        tracks: [
          {
            trackUrl: track.url,
            trackPublicId: track.publicId,
          },
        ],
        artworkUrl: artwork?.url ?? null,
        artworkPublicId: artwork?.publicId ?? null,
      });
    }
  });

  await writeFile(
    "./src/data/music_items.json",
    JSON.stringify(albums, null, 2),
    "utf-8"
  );

  console.log(`✅ music_items.json generated with ${albums.length} items.`);
}

generateMusicItems();

// I've been stuck on making this script for days without any good result.
// Combined with how my family sees me in total disappointment in my home due to my unemployed status, I got so depressed.
// I'm so grateful that there's a friend (whose name wanted to be kept anonymous) that helped me to create this script only in an hour.
// Therefore, I'm expressing my biggest gratitude to my anonymous programmer friend.
// Also to my non-programmer friends that always give me support and encouragement to keep continuing this Ragapuspa project.
// Now, I need to rethink and reevaluate on what the hell I was doing in these last 4 years.
