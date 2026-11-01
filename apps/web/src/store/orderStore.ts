import { create } from "zustand";
import type { OrderStatus } from "@/constants/formatters";
import { mockOrders } from "@/constants/mockData";

export type Order = {
  id: string;
  status: OrderStatus;
  dateISO: string;
  total: number;
};

type OrderState = {
  orders: Order[];
  placeOrder: (order: Order) => void;
  cancelOrder: (orderId: string) => void;
};

export const useOrderStore = create<OrderState>((set) => ({
  orders: mockOrders.map((o) => ({ id: o.id, status: o.status, dateISO: o.dateISO, total: o.total })),
  placeOrder: (order) => set((s) => ({ orders: [order, ...s.orders] })),
  cancelOrder: (orderId) =>
    set((s) => ({
      orders: s.orders.map((o) => (o.id === orderId ? { ...o, status: "Ordered" } : o)),
    })),
}));

