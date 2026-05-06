import { create } from 'zustand';
import type { CartItem, Product } from '../types/models';
import { mockProducts } from './mockData';

type CartState = {
  items: CartItem[];

  add: (product: Product) => void;
  remove: (productId: string) => void;
  setQty: (productId: string, qty: number) => void;
  clear: () => void;

  subtotal: () => number;
};

export const useCartStore = create<CartState>((set, get) => ({
  items: [
    { product: mockProducts[2], qty: 1 },
    { product: mockProducts[6], qty: 2 },
  ],

  add: (product) =>
    set((s) => {
      const existing = s.items.find((it) => it.product.id === product.id);
      if (existing) {
        return {
          items: s.items.map((it) =>
            it.product.id === product.id ? { ...it, qty: it.qty + 1 } : it,
          ),
        };
      }
      return { items: [{ product, qty: 1 }, ...s.items] };
    }),

  remove: (productId) =>
    set((s) => ({ items: s.items.filter((it) => it.product.id !== productId) })),

  setQty: (productId, qty) =>
    set((s) => ({
      items: s.items
        .map((it) =>
          it.product.id === productId ? { ...it, qty: Math.max(1, qty) } : it,
        )
        .filter((it) => it.qty > 0),
    })),

  clear: () => set({ items: [] }),

  subtotal: () => get().items.reduce((sum, it) => sum + it.product.price * it.qty, 0),
}));

