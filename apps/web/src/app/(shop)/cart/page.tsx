"use client";

import Link from "next/link";
import { Trash2 } from "lucide-react";

import { PageShell } from "@/components/common/PageShell";
import { EmptyState } from "@/components/common/EmptyState";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { mockProducts } from "@/constants/mockData";
import { formatCurrencyINR } from "@/constants/formatters";
import { useCartStore } from "@/store/cartStore";

export default function CartPage() {
  const items = useCartStore((s) => s.cartItems);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeFromCart = useCartStore((s) => s.removeFromCart);

  const rows = items
    .map((ci) => {
      const p = mockProducts.find((x) => x.id === ci.productId);
      if (!p) return null;
      return { ...ci, product: p };
    })
    .filter(Boolean) as Array<{ productId: string; qty: number; product: (typeof mockProducts)[number] }>;

  const total = rows.reduce((sum, r) => sum + r.product.price * r.qty, 0);

  if (!rows.length) {
    return (
      <PageShell title="Cart" description="Your selected items.">
        <EmptyState
          title="Your cart is empty"
          description="Add sarees you love to checkout."
          actionHref="/search"
          actionLabel="Browse products"
        />
      </PageShell>
    );
  }

  return (
    <PageShell
      title="Cart"
      description="UI-only cart with quantity stepper."
      right={
        <Button asChild variant="outline" className="font-extrabold">
          <Link href="/checkout">Checkout</Link>
        </Button>
      }
    >
      <div className="grid gap-4 md:grid-cols-[1fr_360px]">
        <div className="space-y-3">
          {rows.map((r) => (
            <Card key={r.productId} className="overflow-hidden">
              <CardContent className="p-4">
                <div className="flex gap-4">
                  <div className="h-20 w-16 overflow-hidden rounded-xl bg-muted">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={r.product.images[0]}
                      alt={r.product.title}
                      className="h-full w-full object-cover"
                      loading="lazy"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-sm font-extrabold">{r.product.title}</div>
                    <div className="mt-1 text-sm text-muted-foreground">
                      {formatCurrencyINR(r.product.price)}
                    </div>
                    <div className="mt-3 flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-9 w-9 p-0 font-extrabold"
                        onClick={() => updateQuantity(r.productId, r.qty - 1)}
                      >
                        -
                      </Button>
                      <div className="w-10 text-center text-sm font-extrabold">{r.qty}</div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-9 w-9 p-0 font-extrabold"
                        onClick={() => updateQuantity(r.productId, r.qty + 1)}
                      >
                        +
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="ml-auto"
                        onClick={() => removeFromCart(r.productId)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="h-fit">
          <CardContent className="p-4 space-y-2">
            <div className="text-sm font-extrabold">Price summary</div>
            <div className="flex items-center justify-between text-sm">
              <div className="text-muted-foreground">Subtotal</div>
              <div className="font-extrabold">{formatCurrencyINR(total)}</div>
            </div>
            <div className="flex items-center justify-between text-sm">
              <div className="text-muted-foreground">Delivery</div>
              <div className="font-extrabold">{formatCurrencyINR(0)}</div>
            </div>
            <div className="flex items-center justify-between text-sm">
              <div className="text-muted-foreground">Discount</div>
              <div className="font-extrabold">- {formatCurrencyINR(0)}</div>
            </div>
            <div className="mt-2 flex items-center justify-between">
              <div className="text-sm font-extrabold">Total</div>
              <div className="text-lg font-extrabold">{formatCurrencyINR(total)}</div>
            </div>
            <Button asChild className="w-full font-extrabold mt-2">
              <Link href="/checkout">Proceed to checkout</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </PageShell>
  );
}

