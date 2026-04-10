import { createMMKV } from 'react-native-mmkv';
import type { StateStorage } from 'zustand/middleware';

const mmkv = createMMKV({ id: 'muvees.watchlist' });

export const zustandStorage: StateStorage = {
  getItem: (name) => mmkv.getString(name) ?? null,
  setItem: (name, value) => mmkv.set(name, value),
  removeItem: (name) => {
    mmkv.remove(name);
  },
};

export type WatchlistItem = {
  id: number;
  title: string;
  poster_path?: string | null;
  vote_average: number;
  release_date: string;
  added_at: string;
};
