import { createJSONStorage, persist } from 'zustand/middleware';
import { createWithEqualityFn } from 'zustand/traditional';

import {
  type WatchlistItem,
  zustandStorage,
} from '@/lib/services/watchlist/storage';

type WatchlistState = {
  items: Array<WatchlistItem>;
  addItem: (item: Omit<WatchlistItem, 'added_at'>) => void;
  removeItem: (id: number) => void;
  toggleItem: (item: Omit<WatchlistItem, 'added_at'>) => boolean;
  clearItems: () => void;
};

export const useWatchlist = createWithEqualityFn<WatchlistState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (item) => {
        set((state) => {
          if (state.items.some((i) => i.id === item.id)) return state;
          return {
            items: [
              { ...item, added_at: new Date().toISOString() },
              ...state.items,
            ],
          };
        });
      },

      removeItem: (id) => {
        set((state) => ({ items: state.items.filter((i) => i.id !== id) }));
      },

      toggleItem: (item) => {
        if (get().items.some((i) => i.id === item.id)) {
          get().removeItem(item.id);
          return false;
        }
        get().addItem(item);
        return true;
      },

      clearItems: () => {
        set({ items: [] });
      },
    }),
    {
      name: 'muvees.watchlist',
      storage: createJSONStorage(() => zustandStorage),
    },
  ),
);
