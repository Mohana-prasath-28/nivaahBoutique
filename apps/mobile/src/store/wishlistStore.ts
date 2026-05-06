import { create } from 'zustand';
import type { Product } from '../types/models';
import { mockProducts } from './mockData';

type WishlistState = {
  ids: Record<string, true>;
  toggle: (productId: string) => void;
  has: (productId: string) => boolean;
};

export const useWishlistStore = create<WishlistState>((set, get) => ({
  ids: { [mockProducts[0].id]: true, [mockProducts[5].id]: true },

  toggle: (productId) =>
    set((s) => {
      const next = { ...s.ids };
      if (next[productId]) delete next[productId];
      else next[productId] = true;
      return { ids: next };
    }),

  has: (productId) => !!get().ids[productId],
}));

