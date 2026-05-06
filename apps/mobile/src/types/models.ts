import type { OrderStatus } from '../constants/formatters';

export type Gender = 'Male' | 'Female' | 'Other';

export type User = {
  id: string;
  name: string;
  phone: string; // +91 ...
  email: string;
  dob: string; // DD/MM/YYYY
  gender: Gender;
};

export type Category = {
  id: string;
  title: string;
  imageUrl: string;
};

export type Product = {
  id: string;
  title: string;
  brand: string;
  images: string[];
  price: number;
  mrp: number;
  rating: number;
  ratingCount: number;
  badges?: string[];
  deliveryText?: string; // e.g. "Delivery by Tomorrow"
};

export type CartItem = {
  product: Product;
  qty: number;
};

export type Address = {
  id: string;
  name: string;
  phone: string;
  pincode: string;
  city: string;
  state: string;
  addressLine: string;
  isDefault: boolean;
};

export type OrderTimelineItem = {
  status: OrderStatus;
  date: string; // DD/MM/YYYY
  isDone: boolean;
};

export type Order = {
  id: string;
  createdAt: string; // DD/MM/YYYY
  status: OrderStatus;
  items: Array<{ product: Product; qty: number }>;
  total: number;
  deliveryTimeline: OrderTimelineItem[];
};

