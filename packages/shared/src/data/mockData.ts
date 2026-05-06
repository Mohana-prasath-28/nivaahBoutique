import type { Banner, Product, SareeCategory } from '../types';

export const mockBanners: Banner[] = [
  {
    id: 'b1',
    title: 'Festival Saree Sale',
    imageUrl:
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1600&q=70',
  },
  {
    id: 'b2',
    title: 'Kanchipuram Classics',
    imageUrl:
      'https://images.unsplash.com/photo-1602810316498-ab67fe2e5161?auto=format&fit=crop&w=1600&q=70',
  },
  {
    id: 'b3',
    title: 'Under ₹999 Deals',
    imageUrl:
      'https://images.unsplash.com/photo-1602810318383-e386f2c27b2c?auto=format&fit=crop&w=1600&q=70',
  },
];

export const mockCategories: SareeCategory[] = [
  {
    id: 'c1',
    title: 'Silk Sarees',
    imageUrl:
      'https://images.unsplash.com/photo-1602810316329-f6e3a9b1c3b3?auto=format&fit=crop&w=800&q=70',
  },
  {
    id: 'c2',
    title: 'Cotton Sarees',
    imageUrl:
      'https://images.unsplash.com/photo-1610030469539-0b5e9ad49fdb?auto=format&fit=crop&w=800&q=70',
  },
  {
    id: 'c3',
    title: 'Banarasi',
    imageUrl:
      'https://images.unsplash.com/photo-1602810315788-8b7b1c9f7e35?auto=format&fit=crop&w=800&q=70',
  },
  {
    id: 'c4',
    title: 'Georgette',
    imageUrl:
      'https://images.unsplash.com/photo-1602810316785-4d9c76c6f216?auto=format&fit=crop&w=800&q=70',
  },
  {
    id: 'c5',
    title: 'Chiffon',
    imageUrl:
      'https://images.unsplash.com/photo-1610030469611-ecb7f7c2b7b7?auto=format&fit=crop&w=800&q=70',
  },
  {
    id: 'c6',
    title: 'Bridal',
    imageUrl:
      'https://images.unsplash.com/photo-1602810316172-6e05d4953ea7?auto=format&fit=crop&w=800&q=70',
  },
];

export const mockProducts: Product[] = [
  {
    id: 'p1',
    title: 'Kanchipuram Silk Saree',
    subtitle: 'Zari border, temple design',
    imageUrl:
      'https://images.unsplash.com/photo-1602810317064-0b0a3f57c429?auto=format&fit=crop&w=1200&q=70',
    images: [
      'https://images.unsplash.com/photo-1602810317064-0b0a3f57c429?auto=format&fit=crop&w=1400&q=70',
      'https://images.unsplash.com/photo-1602810316498-ab67fe2e5161?auto=format&fit=crop&w=1400&q=70',
      'https://images.unsplash.com/photo-1602810315788-8b7b1c9f7e35?auto=format&fit=crop&w=1400&q=70',
    ],
    price: 1999,
    mrp: 3999,
    discountPct: 50,
    rating: 4.5,
    ratingCount: 1240,
    categoryId: 'c1',
    fabric: 'Silk',
    color: 'Maroon',
  },
  {
    id: 'p2',
    title: 'Banarasi Saree',
    subtitle: 'Rich brocade pattern',
    imageUrl:
      'https://images.unsplash.com/photo-1602810318383-e386f2c27b2c?auto=format&fit=crop&w=1200&q=70',
    price: 2499,
    mrp: 4999,
    discountPct: 50,
    rating: 4.3,
    ratingCount: 890,
    categoryId: 'c3',
    fabric: 'Silk Blend',
    color: 'Gold',
  },
  {
    id: 'p3',
    title: 'Cotton Saree',
    subtitle: 'Soft everyday comfort',
    imageUrl:
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=70',
    price: 799,
    mrp: 1299,
    discountPct: 38,
    rating: 4.2,
    ratingCount: 540,
    categoryId: 'c2',
    fabric: 'Cotton',
    color: 'Blue',
  },
  {
    id: 'p4',
    title: 'Georgette Saree',
    subtitle: 'Lightweight party wear',
    imageUrl:
      'https://images.unsplash.com/photo-1602810316785-4d9c76c6f216?auto=format&fit=crop&w=1200&q=70',
    price: 999,
    mrp: 1999,
    discountPct: 50,
    rating: 4.1,
    ratingCount: 320,
    categoryId: 'c4',
    fabric: 'Georgette',
    color: 'Black',
  },
];

