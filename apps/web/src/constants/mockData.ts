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

/* ──────────────────────────────────────────────────────────────────────
   Shared image assets — all live under apps/web/public/.
   ────────────────────────────────────────────────────────────────────── */

/* Shared hero image — lives at apps/web/public/Banner/Banner1.png
   ("Elegance Woven in Tradition · SAREES" teal banner).
   All 4 slides reuse the same artwork; titles/subtitles change to keep
   the carousel feeling varied. */
const HERO_BANNER = "/Banner/Banner1.png";

export const mockBanners: Banner[] = [
  {
    id: "b1",
    title: "Elegance Woven in Tradition",
    subtitle: "Timeless · Graceful · Beautiful",
    imageUrl: HERO_BANNER,
    label: "Festive Collection",
  },
  {
    id: "b2",
    title: "Kanchipuram Classics",
    subtitle: "Silk sarees with zari borders",
    imageUrl: HERO_BANNER,
    label: "Big discounts",
  },
  {
    id: "b3",
    title: "Festival Saree Sale",
    subtitle: "Extra bank offers + UPI deals",
    imageUrl: HERO_BANNER,
    label: "Limited time offers",
  },
  {
    id: "b4",
    title: "Bridal Couture 2026",
    subtitle: "Heirloom silks for forever moments",
    imageUrl: HERO_BANNER,
    label: "Wedding edit",
  },
];

/* Shared category cover — lives at apps/web/public/CategoryCover.jpg */
const CATEGORY_COVER = "/CategoryCover.jpg";

/* Shared product cover — lives at apps/web/public/ProductCover.jpg */
const PRODUCT_COVER = "/ProductCover.jpg";

export const mockCategories: Category[] = [
  { id: "c1",  title: "Silk Sarees",   slug: "silk",        imageUrl: CATEGORY_COVER },
  { id: "c2",  title: "Cotton Sarees", slug: "cotton",      imageUrl: CATEGORY_COVER },
  { id: "c3",  title: "Banarasi",      slug: "banarasi",    imageUrl: CATEGORY_COVER },
  { id: "c4",  title: "Georgette",     slug: "georgette",   imageUrl: CATEGORY_COVER },
  { id: "c5",  title: "Chiffon",       slug: "chiffon",     imageUrl: CATEGORY_COVER },
  { id: "c6",  title: "Bridal",        slug: "bridal",      imageUrl: CATEGORY_COVER },
  { id: "c7",  title: "Kanjivaram",    slug: "kanjivaram",  imageUrl: CATEGORY_COVER },
  { id: "c8",  title: "Linen",         slug: "linen",       imageUrl: CATEGORY_COVER },
  { id: "c9",  title: "Designer",      slug: "designer",    imageUrl: CATEGORY_COVER },
  { id: "c10", title: "Party Wear",    slug: "party-wear",  imageUrl: CATEGORY_COVER },
];

export const mockProducts: Product[] = [
  {
    id: "p1",
    title: "Kanchipuram Silk Saree",
    subtitle: "Zari border, temple design",
    categorySlug: "kanjivaram",
    price: 1999, mrp: 3999, discountPct: 50,
    rating: 4.5, ratingCount: 1240,
    images: [PRODUCT_COVER],
    fabric: "Pure Silk", color: "Maroon",
  },
  {
    id: "p2",
    title: "Banarasi Brocade Saree",
    subtitle: "Rich brocade pattern with gold zari",
    categorySlug: "banarasi",
    price: 2499, mrp: 4999, discountPct: 50,
    rating: 4.3, ratingCount: 890,
    images: [PRODUCT_COVER],
    fabric: "Silk Blend", color: "Gold",
  },
  {
    id: "p3",
    title: "Handloom Cotton Saree",
    subtitle: "Soft everyday comfort",
    categorySlug: "cotton",
    price: 799, mrp: 1299, discountPct: 38,
    rating: 4.2, ratingCount: 540,
    images: [PRODUCT_COVER],
    fabric: "Pure Cotton", color: "Blue",
  },
  {
    id: "p4",
    title: "Georgette Floral Saree",
    subtitle: "Lightweight party wear",
    categorySlug: "georgette",
    price: 999, mrp: 1999, discountPct: 50,
    rating: 4.1, ratingCount: 320,
    images: [PRODUCT_COVER],
    fabric: "Georgette", color: "Black",
  },
  {
    id: "p5",
    title: "Mysore Silk Classic",
    subtitle: "Crepe finish, plain body",
    categorySlug: "silk",
    price: 2799, mrp: 4499, discountPct: 38,
    rating: 4.6, ratingCount: 980,
    images: [PRODUCT_COVER],
    fabric: "Mysore Silk", color: "Emerald",
  },
  {
    id: "p6",
    title: "Bridal Lehenga Saree",
    subtitle: "Heavy zardosi work, dupatta included",
    categorySlug: "bridal",
    price: 12999, mrp: 24999, discountPct: 48,
    rating: 4.8, ratingCount: 412,
    images: [PRODUCT_COVER],
    fabric: "Silk + Net", color: "Crimson",
  },
  {
    id: "p7",
    title: "Chiffon Printed Saree",
    subtitle: "Floral digital print",
    categorySlug: "chiffon",
    price: 699, mrp: 1499, discountPct: 53,
    rating: 4.0, ratingCount: 215,
    images: [PRODUCT_COVER],
    fabric: "Chiffon", color: "Pastel Pink",
  },
  {
    id: "p8",
    title: "Linen Casual Saree",
    subtitle: "Breathable summer drape",
    categorySlug: "linen",
    price: 1199, mrp: 1999, discountPct: 40,
    rating: 4.3, ratingCount: 168,
    images: [PRODUCT_COVER],
    fabric: "Pure Linen", color: "Beige",
  },
  {
    id: "p9",
    title: "Designer Net Saree",
    subtitle: "Sequin work, embroidered blouse",
    categorySlug: "designer",
    price: 3499, mrp: 7999, discountPct: 56,
    rating: 4.4, ratingCount: 372,
    images: [PRODUCT_COVER],
    fabric: "Net", color: "Wine",
  },
  {
    id: "p10",
    title: "Kanjivaram Bridal Silk",
    subtitle: "Pure mulberry silk, temple zari",
    categorySlug: "kanjivaram",
    price: 8999, mrp: 15999, discountPct: 44,
    rating: 4.7, ratingCount: 605,
    images: [PRODUCT_COVER],
    fabric: "Mulberry Silk", color: "Royal Blue",
  },
  {
    id: "p11",
    title: "Cotton Ikat Saree",
    subtitle: "Tribal motif, handwoven",
    categorySlug: "cotton",
    price: 1499, mrp: 2499, discountPct: 40,
    rating: 4.2, ratingCount: 247,
    images: [PRODUCT_COVER],
    fabric: "Cotton", color: "Indigo",
  },
  {
    id: "p12",
    title: "Banarasi Tissue Saree",
    subtitle: "Lightweight tissue silk",
    categorySlug: "banarasi",
    price: 3299, mrp: 5999, discountPct: 45,
    rating: 4.5, ratingCount: 521,
    images: [PRODUCT_COVER],
    fabric: "Tissue Silk", color: "Rose Gold",
  },
  {
    id: "p13",
    title: "Party Wear Sequin Saree",
    subtitle: "Shimmer drape with belt",
    categorySlug: "party-wear",
    price: 1899, mrp: 3499, discountPct: 46,
    rating: 4.1, ratingCount: 198,
    images: [PRODUCT_COVER],
    fabric: "Lycra Net", color: "Champagne",
  },
  {
    id: "p14",
    title: "Pochampally Ikat Silk",
    subtitle: "Geometric weave, GI tagged",
    categorySlug: "silk",
    price: 4499, mrp: 6999, discountPct: 36,
    rating: 4.6, ratingCount: 358,
    images: [PRODUCT_COVER],
    fabric: "Pochampally Silk", color: "Teal",
  },
  {
    id: "p15",
    title: "Chiffon Plain Saree",
    subtitle: "Solid colour, satin border",
    categorySlug: "chiffon",
    price: 599, mrp: 999, discountPct: 40,
    rating: 3.9, ratingCount: 142,
    images: [PRODUCT_COVER],
    fabric: "Chiffon", color: "Lavender",
  },
  {
    id: "p16",
    title: "Designer Ruffle Saree",
    subtitle: "Ready-to-wear, modern drape",
    categorySlug: "designer",
    price: 2199, mrp: 3999, discountPct: 45,
    rating: 4.3, ratingCount: 263,
    images: [PRODUCT_COVER],
    fabric: "Georgette", color: "Coral",
  },
  {
    id: "p17",
    title: "Bridal Velvet Saree",
    subtitle: "Stone work pallu, blouse piece",
    categorySlug: "bridal",
    price: 9499, mrp: 17999, discountPct: 47,
    rating: 4.7, ratingCount: 289,
    images: [PRODUCT_COVER],
    fabric: "Velvet", color: "Deep Red",
  },
  {
    id: "p18",
    title: "Linen Striped Saree",
    subtitle: "Office-ready elegance",
    categorySlug: "linen",
    price: 1399, mrp: 2299, discountPct: 39,
    rating: 4.2, ratingCount: 184,
    images: [PRODUCT_COVER],
    fabric: "Linen Cotton", color: "Olive",
  },
  {
    id: "p19",
    title: "Party Wear Organza",
    subtitle: "Hand-painted floral",
    categorySlug: "party-wear",
    price: 2599, mrp: 4499, discountPct: 42,
    rating: 4.4, ratingCount: 311,
    images: [PRODUCT_COVER],
    fabric: "Organza", color: "Mint",
  },
  {
    id: "p20",
    title: "Georgette Embroidered Saree",
    subtitle: "Thread work, scalloped border",
    categorySlug: "georgette",
    price: 1799, mrp: 2999, discountPct: 40,
    rating: 4.3, ratingCount: 276,
    images: [PRODUCT_COVER],
    fabric: "Georgette", color: "Mustard",
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
  {
    id: "NB-102971",
    status: "Out for Delivery",
    dateISO: "2026-05-15T09:45:00.000Z",
    total: 4498,
    items: [
      { productId: "p5", qty: 1, price: 2799 },
      { productId: "p7", qty: 1, price: 699 },
      { productId: "p15", qty: 1, price: 599 },
      { productId: "p3", qty: 1, price: 799 },
    ],
  },
  {
    id: "NB-102985",
    status: "Packed",
    dateISO: "2026-05-17T14:02:00.000Z",
    total: 12999,
    items: [{ productId: "p6", qty: 1, price: 12999 }],
  },
];
