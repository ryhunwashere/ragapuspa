import { writeFile } from "fs/promises";
import { fetchCloudinaryUrls } from "./cloudinaryHelpers.js";

async function generateMusicItems() {
  const folder_tracks = process.env.CLOUDINARY_FOLDER_MUSIC_TRACKS;
  const folder_artworks = process.env.CLOUDINARY_FOLDER_MUSIC_ARTWORKS;

  if (!folder_tracks || !folder_artworks) {
    console.error(
      "❌ CLOUDINARY_FOLDER_MUSIC_TRACKS and/or CLOUDINARY_FOLDER_MUSIC_ARTWORKS is not defined in your .env file."
    );
    return;
  }

  const track_url = await fetchCloudinaryUrls(folder_tracks, "video");
  const artwork_url = await fetchCloudinaryUrls(folder_artworks, "image");

  const res = [];

  track_url.forEach((track) => {
    const albumName = track.public_id.split("|")[0]; // PascalCase for naming public_id in Cloudinary: "AlbumName|TrackName"
    const lastAlbumName = res[res.length - 1];

    if (res.length > 0 && lastAlbumName.albumName === albumName) {
      lastAlbumName.audioUrls.push({
        url: track.url,
        public_id: track.public_id,
      });
    } else {
      const artwork = artwork_url.find(
        (track) => track.public_id.split("|")[0] === albumName
      );
      res.push({
        albumName,
        audioUrls: [
          {
            url: track.url,
            public_id: track.public_id,
          },
        ],
        artworkUrl: artwork?.url ?? null,
        public_id: artwork?.public_id ?? null,
      });
    }
  });

  await writeFile(
    "./src/data/music_items.json",
    JSON.stringify(res, null, 2),
    "utf-8"
  );

  console.log(`✅ music_items.json generated with ${res.length} items.`);
}

generateMusicItems();

// I've been stuck on making this script for days without any good result.
// Combined with how my family sees me in total disappointment in my home due to my unemployed status, I got so depressed.
// I'm so grateful that there's a friend (whose name wanted to be kept anonymous) that helped me to create this script only in an hour.
// Therefore, I'm expressing my biggest gratitude to my anonymous programmer friend.
// Also to my non-programmer friends that always give me support and encouragement to keep continuing this Ragapuspa project.
// Now, I need to rethink and reevaluate on what the hell I was doing in these last 4 years.
