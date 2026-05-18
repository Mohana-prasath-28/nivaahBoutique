"use client";

import Link from "next/link";
import { Heart, ShoppingBag, Star } from "lucide-react";

import type { Product } from "@/constants/mockData";
import { formatCurrencyINR } from "@/constants/formatters";
import { useCartStore } from "@/store/cartStore";
import { useWishlistStore } from "@/store/wishlistStore";
import { cn } from "@/lib/utils";

export function ProductCard({ product }: { product: Product }) {
  const addToCart = useCartStore((s) => s.addToCart);
  const toggleWishlist = useWishlistStore((s) => s.toggleWishlist);
  const wished = useWishlistStore((s) => Boolean(s.wishlistItems[product.id]));

  return (
    <Link
      href={`/product/${product.id}`}
      className="group relative block overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[oklch(0.78_0.13_85)]/50 hover:shadow-[0_18px_36px_-12px_oklch(0.32_0.13_18/0.18)]"
    >
      {/* ── Image area ── */}
      <div className="relative aspect-[4/5] overflow-hidden bg-muted">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={product.images[0]}
          alt={product.title}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
          referrerPolicy="no-referrer"
        />

        {/* Bottom gradient for chip legibility */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/55 via-black/15 to-transparent" />

        {/* Discount badge — top-left */}
        {product.discountPct ? (
          <span className="absolute left-3 top-3 rounded-md bg-primary px-2 py-0.5 text-[11px] font-bold tracking-wider text-primary-foreground shadow-sm">
            {product.discountPct}% OFF
          </span>
        ) : null}

        {/* Wishlist heart — top-right */}
        <button
          type="button"
          aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
          onClick={(e) => {
            e.preventDefault();
            toggleWishlist(product.id);
          }}
          className={cn(
            "absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full shadow-sm transition",
            wished
              ? "bg-primary text-primary-foreground"
              : "bg-white/95 text-foreground hover:bg-white hover:text-primary"
          )}
        >
          <Heart className={cn("h-[14px] w-[14px]", wished && "fill-current")} />
        </button>

        {/* Rating chip — bottom-left, always visible */}
        {product.rating ? (
          <span className="absolute bottom-3 left-3 inline-flex items-center gap-1 rounded-md bg-white/95 px-1.5 py-0.5 text-[11px] font-bold text-foreground shadow-sm backdrop-blur">
            <Star className="h-3 w-3 fill-[oklch(0.7_0.16_60)] text-[oklch(0.7_0.16_60)]" />
            {product.rating}
            {product.ratingCount ? (
              <span className="text-[10px] font-normal text-muted-foreground">
                · {formatCount(product.ratingCount)}
              </span>
            ) : null}
          </span>
        ) : null}

        {/* Quick "Add to Bag" — slides up from the bottom-right on hover */}
        <button
          type="button"
          aria-label="Add to bag"
          onClick={(e) => {
            e.preventDefault();
            addToCart(product.id);
          }}
          className="absolute bottom-3 right-3 inline-flex translate-y-2 items-center gap-1.5 rounded-full bg-foreground px-3 py-2 text-[10px] font-bold uppercase tracking-[0.15em] text-background opacity-0 shadow-md transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 hover:bg-primary"
        >
          <ShoppingBag className="h-3 w-3" />
          Add
        </button>
      </div>

      {/* ── Content ── */}
      <div className="p-4">
        <div className="min-w-0">
          <h3 className="truncate font-serif text-base font-bold tracking-tight">
            {product.title}
          </h3>
          {product.subtitle ? (
            <p className="mt-0.5 truncate text-xs text-muted-foreground">{product.subtitle}</p>
          ) : null}
        </div>

        {/* Gold accent rule */}
        <span className="mt-2.5 inline-block h-px w-8 bg-gradient-to-r from-[oklch(0.78_0.13_85)] to-transparent" />

        {/* Price row */}
        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-lg font-bold tracking-tight text-primary">
            {formatCurrencyINR(product.price)}
          </span>
          {product.mrp ? (
            <span className="text-xs text-muted-foreground line-through">
              {formatCurrencyINR(product.mrp)}
            </span>
          ) : null}
          {product.discountPct ? (
            <span className="ml-auto text-[11px] font-bold uppercase tracking-[0.1em] text-[oklch(0.62_0.13_60)]">
              −{product.discountPct}%
            </span>
          ) : null}
        </div>

        {/* Fabric · Color meta */}
        {(product.fabric || product.color) ? (
          <div className="mt-2.5 flex flex-wrap items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            {product.fabric ? <span>{product.fabric}</span> : null}
            {product.fabric && product.color ? (
              <span aria-hidden className="h-1 w-1 rounded-full bg-current opacity-30" />
            ) : null}
            {product.color ? <span>{product.color}</span> : null}
          </div>
        ) : null}
      </div>
    </Link>
  );
}

function formatCount(n: number): string {
  if (n >= 1000) {
    const k = (n / 1000).toFixed(n >= 10000 ? 0 : 1);
    return `${k.replace(/\.0$/, "")}k`;
  }
  return String(n);
}
