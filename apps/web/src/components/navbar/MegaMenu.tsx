"use client";

import * as React from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

import { mockCategories } from "@/constants/mockData";
import { cn } from "@/lib/utils";

export function MegaMenu() {
  const [open, setOpen] = React.useState(false);
  const [active, setActive] = React.useState(mockCategories[0]?.slug ?? "silk");

  const activeCategory = mockCategories.find((c) => c.slug === active) ?? mockCategories[0];

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        className={cn(
          "inline-flex items-center gap-1 rounded-xl px-3 py-2 text-sm font-semibold text-foreground/90 hover:bg-muted"
        )}
        aria-haspopup="menu"
        aria-expanded={open}
      >
        Categories <ChevronDown className="h-4 w-4" />
      </button>

      {open ? (
        <div className="absolute left-0 top-full z-50 mt-2 w-[min(960px,92vw)] overflow-hidden rounded-2xl border bg-background shadow-xl">
          <div className="grid grid-cols-[280px_1fr]">
            <div className="border-r bg-muted/40">
              <div className="px-4 py-3 text-xs font-extrabold tracking-wide text-muted-foreground">
                SHOP BY CATEGORY
              </div>
              <div className="py-2">
                {mockCategories.map((c) => {
                  const selected = c.slug === active;
                  return (
                    <button
                      key={c.slug}
                      type="button"
                      onMouseEnter={() => setActive(c.slug)}
                      onFocus={() => setActive(c.slug)}
                      className={cn(
                        "flex w-full items-start gap-3 px-4 py-2.5 text-left",
                        "hover:bg-muted/70",
                        selected && "bg-muted"
                      )}
                    >
                      <div className="mt-1 h-2 w-2 rounded-full bg-primary/70" />
                      <div className="min-w-0">
                        <div className={cn("truncate text-sm font-semibold", selected && "text-primary")}>
                          {c.title}
                        </div>
                        <div className="text-xs text-muted-foreground">Shop now</div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="p-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <div className="text-lg font-extrabold tracking-tight">{activeCategory?.title}</div>
                  <div className="text-sm text-muted-foreground">
                    Bank offers, UPI deals, COD available.
                  </div>
                </div>
                <Link
                  href={`/category/${activeCategory?.slug}`}
                  className="rounded-xl bg-primary px-4 py-2 text-sm font-extrabold text-primary-foreground"
                >
                  View all
                </Link>
              </div>

              <div className="mt-4 grid grid-cols-3 gap-3">
                {["New Arrivals", "Under ₹999", "Festival Picks", "Best Sellers", "Premium", "Trending"].map(
                  (t) => (
                    <Link
                      key={t}
                      href={`/category/${activeCategory?.slug}`}
                      className="rounded-2xl border bg-card p-3 hover:bg-muted/40"
                    >
                      <div className="text-sm font-extrabold">{t}</div>
                      <div className="mt-1 text-xs text-muted-foreground">Curated for you</div>
                    </Link>
                  )
                )}
              </div>

              <div className="mt-4 overflow-hidden rounded-2xl border">
                {/* Using plain img for remote images (UI-only). Can switch to next/image later with proper domains. */}
                <div className="relative aspect-[16/6] w-full bg-muted">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={activeCategory?.imageUrl}
                    alt={activeCategory?.title ?? "Category"}
                    className="h-full w-full object-cover"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-black/0" />
                  <div className="absolute bottom-3 left-3 right-3">
                    <div className="text-sm font-extrabold text-white">
                      Top deals in {activeCategory?.title}
                    </div>
                    <div className="text-xs text-white/85">Delivery by Tomorrow • COD Available</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

