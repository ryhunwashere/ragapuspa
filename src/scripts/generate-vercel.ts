import cards from "../data/cards.json" with { type: "json" };
import { writeFile } from "fs/promises";

type VercelConfig = {
  $schema: string;
  headers: {
    source: string;
    headers: {
      key: string;
      value: string;
    }[];
  }[];
  redirects: {
    source: string;
    destination: string;
    permanent: boolean;
  }[];
}

export const firstSongSlug: string = cards[0].slug;

const newConfig: VercelConfig = {
  $schema: "https://openapi.vercel.sh/vercel.json",
  headers: [
    {
      source: "/fonts/(.*)",
      headers: [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ],
  redirects: [
    {
      source: "/music",
      destination: `/music/${firstSongSlug}`,
      permanent: true
    }
  ]
};

function generateVercelConfig() {
  writeFile(
    "./vercel.json",
    JSON.stringify(newConfig, null, 2),
    "utf-8"
  );
  
  console.log("Succesfully generated new vercel.json config.");
}

generateVercelConfig();