"use client";

import Link from "next/link";

import { PageShell } from "@/components/common/PageShell";
import { EmptyState } from "@/components/common/EmptyState";
import { mockProducts } from "@/constants/mockData";
import { useWishlistStore } from "@/store/wishlistStore";
import { ProductCard } from "@/components/cards/ProductCard";
import { Button } from "@/components/ui/button";

export default function WishlistPage() {
  const ids = useWishlistStore((s) => s.wishlistItems);
  const items = mockProducts.filter((p) => ids[p.id]);

  if (!items.length) {
    return (
      <PageShell title="Wishlist" description="Saved sarees.">
        <EmptyState
          title="No items in wishlist"
          description="Tap Wish on any product to save it here."
          actionHref="/search"
          actionLabel="Find sarees"
        />
      </PageShell>
    );
  }

  return (
    <PageShell
      title="Wishlist"
      description="UI-only wishlist using Zustand."
      right={
        <Button asChild variant="outline" className="font-extrabold">
          <Link href="/cart">Go to cart</Link>
        </Button>
      }
    >
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {items.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </PageShell>
  );
}

