export type ID = string;

export type SareeCategory = {
  id: ID;
  title: string;
  imageUrl: string;
};

export type Product = {
  id: ID;
  title: string;
  subtitle?: string;
  imageUrl: string;
  images?: string[];
  price: number;
  mrp?: number;
  discountPct?: number;
  rating?: number;
  ratingCount?: number;
  categoryId?: ID;
  fabric?: string;
  color?: string;
};

export type Banner = {
  id: ID;
  title: string;
  imageUrl: string;
};

