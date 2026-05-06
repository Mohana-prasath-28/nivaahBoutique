import type { OrderStatus } from "./formatters";

export type Category = {
  id: string;
  title: string;
  slug: string;
  imageUrl: string;
};

export type Product = {
  id: string;
  title: string;
  subtitle?: string;
  categorySlug: string;
  price: number;
  mrp?: number;
  discountPct?: number;
  rating?: number;
  ratingCount?: number;
  images: string[];
  fabric?: string;
  color?: string;
};

export type Banner = {
  id: string;
  title: string;
  subtitle?: string;
  imageUrl: string;
  label?: string;
};

export type Order = {
  id: string;
  status: OrderStatus;
  dateISO: string;
  total: number;
  items: Array<{ productId: string; qty: number; price: number }>;
};

export const mockBanners: Banner[] = [
  {
    id: "b1",
    title: "Festival Saree Sale",
    subtitle: "Extra bank offers + UPI deals",
    imageUrl:
      "https://images.unsplash.com/photo-1602810316498-ab67fe2e5161?auto=format&fit=crop&w=1600&q=70",
    label: "Limited time offers",
  },
  {
    id: "b2",
    title: "Kanchipuram Classics",
    subtitle: "Silk sarees with zari borders",
    imageUrl:
      "https://images.unsplash.com/photo-1602810315788-8b7b1c9f7e35?auto=format&fit=crop&w=1600&q=70",
    label: "Big discounts",
  },
  {
    id: "b3",
    title: "Under ₹999 Store",
    subtitle: "Best value picks",
    imageUrl:
      "https://images.unsplash.com/photo-1602810318383-e386f2c27b2c?auto=format&fit=crop&w=1600&q=70",
    label: "Budget deals",
  },
];

export const mockCategories: Category[] = [
  {
    id: "c1",
    title: "Silk Sarees",
    slug: "silk",
    imageUrl:
      "https://images.unsplash.com/photo-1602810316329-f6e3a9b1c3b3?auto=format&fit=crop&w=800&q=70",
  },
  {
    id: "c2",
    title: "Cotton Sarees",
    slug: "cotton",
    imageUrl:
      "https://images.unsplash.com/photo-1610030469539-0b5e9ad49fdb?auto=format&fit=crop&w=800&q=70",
  },
  {
    id: "c3",
    title: "Banarasi",
    slug: "banarasi",
    imageUrl:
      "https://images.unsplash.com/photo-1602810317064-0b0a3f57c429?auto=format&fit=crop&w=800&q=70",
  },
  {
    id: "c4",
    title: "Georgette",
    slug: "georgette",
    imageUrl:
      "https://images.unsplash.com/photo-1602810316785-4d9c76c6f216?auto=format&fit=crop&w=800&q=70",
  },
  {
    id: "c5",
    title: "Chiffon",
    slug: "chiffon",
    imageUrl:
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=70",
  },
  {
    id: "c6",
    title: "Bridal",
    slug: "bridal",
    imageUrl:
      "https://images.unsplash.com/photo-1602810316172-6e05d4953ea7?auto=format&fit=crop&w=800&q=70",
  },
];

export const mockProducts: Product[] = [
  {
    id: "p1",
    title: "Kanchipuram Silk Saree",
    subtitle: "Zari border, temple design",
    categorySlug: "silk",
    price: 1999,
    mrp: 3999,
    discountPct: 50,
    rating: 4.5,
    ratingCount: 1240,
    images: [
      "https://images.unsplash.com/photo-1602810317064-0b0a3f57c429?auto=format&fit=crop&w=1400&q=70",
      "https://images.unsplash.com/photo-1602810316498-ab67fe2e5161?auto=format&fit=crop&w=1400&q=70",
      "https://images.unsplash.com/photo-1602810315788-8b7b1c9f7e35?auto=format&fit=crop&w=1400&q=70",
    ],
    fabric: "Silk",
    color: "Maroon",
  },
  {
    id: "p2",
    title: "Banarasi Saree",
    subtitle: "Rich brocade pattern",
    categorySlug: "banarasi",
    price: 2499,
    mrp: 4999,
    discountPct: 50,
    rating: 4.3,
    ratingCount: 890,
    images: [
      "https://images.unsplash.com/photo-1602810318383-e386f2c27b2c?auto=format&fit=crop&w=1400&q=70",
      "https://images.unsplash.com/photo-1602810317064-0b0a3f57c429?auto=format&fit=crop&w=1400&q=70",
    ],
    fabric: "Silk Blend",
    color: "Gold",
  },
  {
    id: "p3",
    title: "Cotton Saree",
    subtitle: "Soft everyday comfort",
    categorySlug: "cotton",
    price: 799,
    mrp: 1299,
    discountPct: 38,
    rating: 4.2,
    ratingCount: 540,
    images: [
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1400&q=70",
    ],
    fabric: "Cotton",
    color: "Blue",
  },
  {
    id: "p4",
    title: "Georgette Saree",
    subtitle: "Lightweight party wear",
    categorySlug: "georgette",
    price: 999,
    mrp: 1999,
    discountPct: 50,
    rating: 4.1,
    ratingCount: 320,
    images: [
      "https://images.unsplash.com/photo-1602810316785-4d9c76c6f216?auto=format&fit=crop&w=1400&q=70",
    ],
    fabric: "Georgette",
    color: "Black",
  },
];

export const mockOrders: Order[] = [
  {
    id: "NB-102938",
    status: "Delivered",
    dateISO: "2026-05-01T10:10:00.000Z",
    total: 1999,
    items: [{ productId: "p1", qty: 1, price: 1999 }],
  },
  {
    id: "NB-102944",
    status: "Shipped",
    dateISO: "2026-05-04T08:20:00.000Z",
    total: 2499,
    items: [{ productId: "p2", qty: 1, price: 2499 }],
  },
];

