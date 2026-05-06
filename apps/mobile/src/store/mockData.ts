import type { Category, Order, Product } from '../types/models';

const sareeThumbs = [
  'https://images.unsplash.com/photo-1678705730064-a7ecbab4b3fb?auto=format&fit=crop&w=400&q=60',
  'https://images.unsplash.com/photo-1706685481823-b8f1a1c11fca?auto=format&fit=crop&w=400&q=60',
  'https://images.unsplash.com/photo-1742677143629-b9784beab2e1?auto=format&fit=crop&w=400&q=60',
  'https://images.unsplash.com/photo-1749317776467-6dcf2bfbd26b?auto=format&fit=crop&w=400&q=60',
  'https://images.unsplash.com/photo-1771507056578-f9675a2a8f8a?auto=format&fit=crop&w=400&q=60',
];

const sareeImages = [
  'https://images.unsplash.com/photo-1678705730064-a7ecbab4b3fb?auto=format&fit=crop&w=1200&q=70',
  'https://images.unsplash.com/photo-1706685481823-b8f1a1c11fca?auto=format&fit=crop&w=1200&q=70',
  'https://images.unsplash.com/photo-1742677143629-b9784beab2e1?auto=format&fit=crop&w=1200&q=70',
  'https://images.unsplash.com/photo-1749317776467-6dcf2bfbd26b?auto=format&fit=crop&w=1200&q=70',
  'https://images.unsplash.com/photo-1771507056578-f9675a2a8f8a?auto=format&fit=crop&w=1200&q=70',
];

export const mockCategories: Category[] = [
  {
    id: 'c1',
    title: 'Silk Sarees',
    imageUrl: sareeThumbs[0],
  },
  {
    id: 'c2',
    title: 'Cotton Sarees',
    imageUrl: sareeThumbs[1],
  },
  {
    id: 'c3',
    title: 'Banarasi',
    imageUrl: sareeThumbs[2],
  },
  {
    id: 'c4',
    title: 'Kanjivaram',
    imageUrl: sareeThumbs[3],
  },
  {
    id: 'c5',
    title: 'Georgette',
    imageUrl: sareeThumbs[4],
  },
  {
    id: 'c6',
    title: 'Chiffon',
    imageUrl: sareeThumbs[0],
  },
  {
    id: 'c7',
    title: 'Designer',
    imageUrl: sareeThumbs[1],
  },
  {
    id: 'c8',
    title: 'Festive',
    imageUrl: sareeThumbs[2],
  },
];

export const mockProducts: Product[] = Array.from({ length: 24 }).map((_, i) => {
  const idx = i + 1;
  const mrp = 1299 + (idx % 8) * 300;
  const price = Math.round(mrp * (0.55 + (idx % 4) * 0.08));
  const fabric = ['Silk', 'Cotton', 'Banarasi', 'Kanjivaram', 'Georgette', 'Chiffon'][idx % 6];
  const color = ['Red', 'Green', 'Blue', 'Pink', 'Maroon', 'Black', 'Beige', 'Purple'][idx % 8];
  const work = ['Zari', 'Printed', 'Embroidered', 'Border', 'Traditional'][idx % 5];
  const base = sareeImages[idx % sareeImages.length];
  return {
    id: `p${idx}`,
    title: `${fabric} Saree • ${color} • ${work}`,
    brand: ['Nivaah Sarees', 'Nivaah Premium', 'Nivaah Weaves', 'Nivaah Studio'][idx % 4],
    images: [
      `${base}&ixid=${idx}a`,
      `${sareeImages[(idx + 1) % sareeImages.length]}&ixid=${idx}b`,
      `${sareeImages[(idx + 2) % sareeImages.length]}&ixid=${idx}c`,
    ],
    mrp,
    price,
    rating: 3.8 + (idx % 12) * 0.1,
    ratingCount: 120 + idx * 17,
    badges:
      idx % 3 === 0 ? ['Big Discount'] : idx % 4 === 0 ? ['Top Rated'] : [],
    deliveryText: idx % 2 === 0 ? 'Delivery by Tomorrow' : 'Delivery in 2 days',
  };
});

export const mockOrders: Order[] = [
  {
    id: 'ORD-245881',
    createdAt: '04/05/2026',
    status: 'Delivered',
    items: [
      { product: mockProducts[0], qty: 1 },
      { product: mockProducts[3], qty: 2 },
    ],
    total: mockProducts[0].price + mockProducts[3].price * 2,
    deliveryTimeline: [
      { status: 'Ordered', date: '04/05/2026', isDone: true },
      { status: 'Packed', date: '04/05/2026', isDone: true },
      { status: 'Shipped', date: '05/05/2026', isDone: true },
      { status: 'Out for Delivery', date: '06/05/2026', isDone: true },
      { status: 'Delivered', date: '06/05/2026', isDone: true },
    ],
  },
  {
    id: 'ORD-245912',
    createdAt: '06/05/2026',
    status: 'Shipped',
    items: [{ product: mockProducts[9], qty: 1 }],
    total: mockProducts[9].price,
    deliveryTimeline: [
      { status: 'Ordered', date: '06/05/2026', isDone: true },
      { status: 'Packed', date: '06/05/2026', isDone: true },
      { status: 'Shipped', date: '06/05/2026', isDone: true },
      { status: 'Out for Delivery', date: '07/05/2026', isDone: false },
      { status: 'Delivered', date: '07/05/2026', isDone: false },
    ],
  },
];

