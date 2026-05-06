import { create } from 'zustand';
import type { Order } from '../types/models';
import { mockOrders } from './mockData';

type OrderState = {
  orders: Order[];
  byId: (id: string) => Order | undefined;
};

export const useOrderStore = create<OrderState>((_set, get) => ({
  orders: mockOrders,
  byId: (id) => get().orders.find((o) => o.id === id),
}));

