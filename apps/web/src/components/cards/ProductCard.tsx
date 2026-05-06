"use client";

import Link from "next/link";
import { Heart, ShoppingBag } from "lucide-react";

import type { Product } from "@/constants/mockData";
import { formatCurrencyINR } from "@/constants/formatters";
import { useCartStore } from "@/store/cartStore";
import { useWishlistStore } from "@/store/wishlistStore";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function ProductCard({ product }: { product: Product }) {
  const addToCart = useCartStore((s) => s.addToCart);
  const toggleWishlist = useWishlistStore((s) => s.toggleWishlist);
  const wished = useWishlistStore((s) => Boolean(s.wishlistItems[product.id]));

  return (
    <Card className="overflow-hidden">
      <Link href={`/product/${product.id}`} className="group block">
        <div className="relative aspect-[4/5] bg-muted">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={product.images[0]}
            alt={product.title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
            loading="lazy"
            referrerPolicy="no-referrer"
          />
          {product.discountPct ? (
            <Badge className="absolute left-2 top-2">{product.discountPct}% OFF</Badge>
          ) : null}
        </div>
      </Link>

      <CardContent className="p-3">
        <div className="truncate text-sm font-extrabold">{product.title}</div>
        <div className="mt-1 flex items-center gap-2">
          <div className="text-sm font-extrabold">{formatCurrencyINR(product.price)}</div>
          {product.mrp ? (
            <div className="text-xs text-muted-foreground line-through">
              {formatCurrencyINR(product.mrp)}
            </div>
          ) : null}
        </div>

        <div className="mt-3 grid grid-cols-2 gap-2">
          <Button
            variant="secondary"
            className="w-full font-extrabold"
            onClick={() => addToCart(product.id)}
          >
            <ShoppingBag className="mr-2 h-4 w-4" />
            Cart
          </Button>
          <Button
            variant={wished ? "default" : "outline"}
            className="w-full font-extrabold"
            onClick={() => toggleWishlist(product.id)}
          >
            <Heart className="mr-2 h-4 w-4" />
            Wish
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

