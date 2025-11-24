import { writable, type Writable } from 'svelte/store';

type MusicDetails = {
  description: string,
  album: string,
  arranger: string,
  originalSong: string,
  artworkArtist: string
}

export interface CardData {
  title: string;
  musicDetails: MusicDetails;
  audioUrl: string;
  imageUrl: string;
}

type SelectedCardValue = CardData | null;

export const selectedCard: Writable<SelectedCardValue> = writable(null);

export const isPlaying: Writable<boolean> = writable(false);
