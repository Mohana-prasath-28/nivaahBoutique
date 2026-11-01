"use client";

import * as React from "react";
import Link from "next/link";
import { ChevronDown, Sparkles } from "lucide-react";

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
          "inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-sm font-semibold text-foreground/90 transition",
          "hover:bg-secondary hover:text-primary",
          open && "bg-secondary text-primary"
        )}
        aria-haspopup="menu"
        aria-expanded={open}
      >
        Categories
        <ChevronDown className={cn("h-4 w-4 transition", open && "rotate-180")} />
      </button>

      {open ? (
        <div className="absolute left-0 top-full z-50 mt-3 w-[min(1000px,94vw)] overflow-hidden rounded-3xl border border-border bg-popover/95 shadow-2xl shadow-primary/10 ring-1 ring-[oklch(0.78_0.13_85)]/20 backdrop-blur-xl">
          <div className="grid grid-cols-[260px_1fr]">
            <div className="border-r border-border bg-gradient-to-b from-secondary/60 to-secondary/20">
              <div className="px-5 pt-4 pb-3">
                <div className="font-serif text-base font-bold text-primary">Shop by Category</div>
                <div className="text-xs text-muted-foreground">Hand-picked for you</div>
              </div>
              <div className="pb-3">
                {mockCategories.map((c) => {
                  const selected = c.slug === active;
                  return (
                    <button
                      key={c.slug}
                      type="button"
                      onMouseEnter={() => setActive(c.slug)}
                      onFocus={() => setActive(c.slug)}
                      className={cn(
                        "flex w-full items-center gap-3 px-5 py-2.5 text-left transition",
                        "hover:bg-background/70",
                        selected && "bg-background"
                      )}
                    >
                      <span
                        className={cn(
                          "h-1.5 w-1.5 rounded-full transition",
                          selected ? "bg-gradient-gold scale-150" : "bg-primary/40"
                        )}
                      />
                      <span className="min-w-0 flex-1">
                        <span className={cn("block truncate text-sm font-semibold", selected && "text-primary")}>
                          {c.title}
                        </span>
                      </span>
                      {selected ? (
                        <span className="text-[10px] font-bold uppercase tracking-wider text-primary/70">
                          ●
                        </span>
                      ) : null}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="p-5">
              <div className="flex items-end justify-between gap-3">
                <div>
                  <div className="font-serif text-2xl font-bold tracking-tight">{activeCategory?.title}</div>
                  <div className="mt-0.5 flex items-center gap-1.5 text-sm text-muted-foreground">
                    <Sparkles className="h-3.5 w-3.5 text-[oklch(0.7_0.15_60)]" />
                    Bank offers · UPI deals · COD available
                  </div>
                </div>
                <Link
                  href={`/category/${activeCategory?.slug}`}
                  className="rounded-full bg-gradient-primary px-5 py-2 text-xs font-bold uppercase tracking-wider text-primary-foreground shadow-md shadow-primary/20 ring-1 ring-[oklch(0.78_0.13_85)]/40 transition hover:brightness-110"
                >
                  View all
                </Link>
              </div>

              <div className="mt-4 grid grid-cols-3 gap-3">
                {["New Arrivals", "Under ₹999", "Festival Picks", "Best Sellers", "Premium", "Trending"].map(
                  (t, i) => (
                    <Link
                      key={t}
                      href={`/category/${activeCategory?.slug}`}
                      className="group rounded-2xl border border-border bg-card p-3 transition hover:border-primary/30 hover:shadow-md hover:shadow-primary/5"
                    >
                      <div className="flex items-center gap-2">
                        <span className="grid h-7 w-7 place-items-center rounded-lg bg-secondary text-xs font-bold text-primary">
                          {i + 1}
                        </span>
                        <div className="text-sm font-bold">{t}</div>
                      </div>
                      <div className="mt-1 text-xs text-muted-foreground">Curated for you</div>
                    </Link>
                  )
                )}
              </div>

              <Link
                href={`/category/${activeCategory?.slug}`}
                className="mt-4 block overflow-hidden rounded-2xl border border-border"
              >
                <div className="relative aspect-[16/6] w-full bg-muted">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={activeCategory?.imageUrl}
                    alt={activeCategory?.title ?? "Category"}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />
                  <div className="absolute bottom-3 left-4 right-4 text-white">
                    <div className="font-serif text-lg font-bold">
                      Top deals in {activeCategory?.title}
                    </div>
                    <div className="text-xs text-white/85">Delivery by Tomorrow · COD Available</div>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
