import { create } from "zustand";

export type CartItem = {
  productId: string;
  qty: number;
};

type CartState = {
  cartItems: CartItem[];
  addToCart: (productId: string) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, qty: number) => void;
  clearCart: () => void;
};

export const useCartStore = create<CartState>((set) => ({
  cartItems: [],
  addToCart: (productId) =>
    set((s) => {
      const existing = s.cartItems.find((i) => i.productId === productId);
      if (existing) {
        return { cartItems: s.cartItems.map((i) => (i.productId === productId ? { ...i, qty: i.qty + 1 } : i)) };
      }
      return { cartItems: [...s.cartItems, { productId, qty: 1 }] };
    }),
  removeFromCart: (productId) => set((s) => ({ cartItems: s.cartItems.filter((i) => i.productId !== productId) })),
  updateQuantity: (productId, qty) =>
    set((s) => ({
      cartItems: s.cartItems
        .map((i) => (i.productId === productId ? { ...i, qty } : i))
        .filter((i) => i.qty > 0),
    })),
  clearCart: () => set({ cartItems: [] }),
}));

