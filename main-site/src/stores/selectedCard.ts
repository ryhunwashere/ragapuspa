import { writable, type Writable } from 'svelte/store';

export interface CardData {
  title: string;
  audioUrl: string;
  imageUrl: string;
}

type SelectedCardValue = CardData | null;

export const selectedCard: Writable<SelectedCardValue> = writable(null);

export const isPlaying: Writable<boolean> = writable(false);
