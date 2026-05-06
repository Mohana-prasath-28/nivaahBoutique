import { create } from "zustand";

type WishlistState = {
  wishlistItems: Record<string, true>;
  toggleWishlist: (productId: string) => void;
  clearWishlist: () => void;
};

export const useWishlistStore = create<WishlistState>((set) => ({
  wishlistItems: {},
  toggleWishlist: (productId) =>
    set((s) => {
      const next = { ...s.wishlistItems };
      if (next[productId]) delete next[productId];
      else next[productId] = true;
      return { wishlistItems: next };
    }),
  clearWishlist: () => set({ wishlistItems: {} }),
}));

