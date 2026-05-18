"use client";

import * as React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronDown, ChevronRight, SlidersHorizontal } from "lucide-react";

import { Container } from "@/components/common/Container";
import { ProductCard } from "@/components/cards/ProductCard";
import { mockCategories, mockProducts, type Product } from "@/constants/mockData";

const CAT_TAG: Record<string, string> = {
  silk: "Heritage Silk",
  cotton: "Daily Drape",
  banarasi: "Royal Brocade",
  georgette: "Modern Flow",
  chiffon: "Floral Whisper",
  bridal: "Wedding Edit",
  kanjivaram: "Temple Silk",
  linen: "Effortless",
  designer: "Atelier Edit",
  "party-wear": "Festive Glam",
};

type SortKey = "recommended" | "price-asc" | "price-desc" | "rating" | "discount";

const SORT_LABEL: Record<SortKey, string> = {
  recommended: "Recommended",
  "price-asc": "Price: Low to High",
  "price-desc": "Price: High to Low",
  rating: "Top Rated",
  discount: "Highest Discount",
};

export default function CategorySlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug: routeSlug } = React.use(params);
  const category = mockCategories.find((c) => c.slug === routeSlug);
  const slug = category?.slug ?? "";

  const baseProducts = React.useMemo(
    () => (slug ? mockProducts.filter((p) => p.categorySlug === slug) : []),
    [slug]
  );

  const [sort, setSort] = React.useState<SortKey>("recommended");
  const products = React.useMemo(() => sortProducts(baseProducts, sort), [baseProducts, sort]);

  if (!category) return notFound();

  const tag = CAT_TAG[category.slug] ?? "Heritage";
  const prices = baseProducts.map((p) => p.price);
  const minPrice = prices.length ? Math.min(...prices) : 0;
  const maxPrice = prices.length ? Math.max(...prices) : 0;

  return (
    <div className="pb-24 md:pb-12">
      <Container className="space-y-8 py-6 md:space-y-12 md:py-8">
        {/* Breadcrumb */}
        <Breadcrumb categoryTitle={category.title} />

        {/* Hero strip — category image + overlay */}
        <Hero category={category} tag={tag} count={baseProducts.length} priceRange={{ min: minPrice, max: maxPrice }} />

        {/* Sticky toolbar */}
        <Toolbar count={products.length} sort={sort} setSort={setSort} />

        {/* Product grid or empty state */}
        {products.length === 0 ? (
          <EmptyState categoryTitle={category.title} />
        ) : (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}

        {/* Related categories */}
        <RelatedCategories currentSlug={category.slug} />
      </Container>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────────
   Breadcrumb
   ────────────────────────────────────────────────────────────────────── */

function Breadcrumb({ categoryTitle }: { categoryTitle: string }) {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-muted-foreground">
      <Link href="/" className="hover:text-primary">
        Home
      </Link>
      <ChevronRight className="h-3 w-3" />
      <Link href="/category" className="hover:text-primary">
        Collections
      </Link>
      <ChevronRight className="h-3 w-3" />
      <span className="font-semibold text-foreground">{categoryTitle}</span>
    </nav>
  );
}

/* ──────────────────────────────────────────────────────────────────────
   Hero — category cover with overlay
   ────────────────────────────────────────────────────────────────────── */

function Hero({
  category,
  tag,
  count,
  priceRange,
}: {
  category: (typeof mockCategories)[number];
  tag: string;
  count: number;
  priceRange: { min: number; max: number };
}) {
  return (
    <section className="relative overflow-hidden rounded-3xl bg-card shadow-md">
      <div className="relative aspect-[21/10] w-full bg-muted md:aspect-[21/8]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={category.imageUrl}
          alt={category.title}
          className="h-full w-full object-cover"
          loading="eager"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

        <div className="absolute inset-y-0 left-0 flex max-w-xl flex-col justify-center p-6 text-white md:p-12">
          <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.3em] text-white backdrop-blur ring-1 ring-white/25">
            {tag}
          </span>
          <h1 className="mt-4 font-serif text-4xl font-bold leading-tight tracking-tight md:text-6xl">
            {category.title}
          </h1>
          <div className="mt-3 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/85">
            <span>{count} drapes</span>
            {priceRange.min > 0 && (
              <>
                <span aria-hidden className="h-1 w-1 rounded-full bg-white/40" />
                <span>
                  ₹{priceRange.min.toLocaleString("en-IN")} – ₹{priceRange.max.toLocaleString("en-IN")}
                </span>
              </>
            )}
          </div>
          <span className="mt-4 inline-block h-0.5 w-16 bg-gradient-to-r from-[oklch(0.88_0.14_85)] to-transparent" />
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────────────────
   Toolbar — sticky, result count + sort dropdown
   ────────────────────────────────────────────────────────────────────── */

function Toolbar({
  count,
  sort,
  setSort,
}: {
  count: number;
  sort: SortKey;
  setSort: (s: SortKey) => void;
}) {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  return (
    <div className="sticky top-[88px] z-20 -mx-4 border-y border-border bg-background/85 px-4 py-3 backdrop-blur md:top-[100px] md:-mx-8 md:px-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="text-sm">
          <span className="font-bold text-foreground">{count}</span>
          <span className="text-muted-foreground"> drapes</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-[11px] font-bold uppercase tracking-[0.2em] text-foreground transition hover:border-primary/40 hover:text-primary"
          >
            <SlidersHorizontal className="h-3.5 w-3.5" />
            Filter
          </button>

          <div ref={ref} className="relative">
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-[11px] font-bold uppercase tracking-[0.2em] text-foreground transition hover:border-primary/40 hover:text-primary"
            >
              Sort: {SORT_LABEL[sort]}
              <ChevronDown className={`h-3.5 w-3.5 transition ${open ? "rotate-180" : ""}`} />
            </button>

            {open ? (
              <div className="absolute right-0 top-full z-30 mt-2 w-56 overflow-hidden rounded-2xl border border-border bg-card shadow-xl">
                {(Object.keys(SORT_LABEL) as SortKey[]).map((key) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => {
                      setSort(key);
                      setOpen(false);
                    }}
                    className={`flex w-full items-center justify-between px-4 py-2.5 text-left text-sm transition hover:bg-secondary ${
                      sort === key ? "bg-secondary font-bold text-primary" : "text-foreground"
                    }`}
                  >
                    {SORT_LABEL[key]}
                    {sort === key ? <span className="text-primary">●</span> : null}
                  </button>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────────
   Empty state
   ────────────────────────────────────────────────────────────────────── */

function EmptyState({ categoryTitle }: { categoryTitle: string }) {
  return (
    <div className="rounded-3xl border border-border bg-card/60 px-6 py-16 text-center">
      <div className="mx-auto max-w-md">
        <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary">
          Coming Soon
        </div>
        <h3 className="mt-2 font-serif text-2xl font-bold tracking-tight md:text-3xl">
          We&apos;re adding new {categoryTitle.toLowerCase()} drapes.
        </h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Meanwhile, explore other collections from our atelier.
        </p>
        <Link
          href="/category"
          className="mt-5 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-[11px] font-bold uppercase tracking-[0.2em] text-primary-foreground shadow-md transition hover:brightness-110"
        >
          Browse Collections
        </Link>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────────
   Related categories — keep shopping
   ────────────────────────────────────────────────────────────────────── */

function RelatedCategories({ currentSlug }: { currentSlug: string }) {
  const related = mockCategories.filter((c) => c.slug !== currentSlug).slice(0, 6);
  return (
    <section className="space-y-5 pt-4">
      <div className="flex items-end justify-between gap-3">
        <div>
          <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary">
            Keep Exploring
          </div>
          <h2 className="mt-2 font-serif text-2xl font-bold tracking-tight md:text-3xl">
            More Collections
          </h2>
          <span className="mt-2 inline-block h-0.5 w-12 bg-gradient-to-r from-primary to-[oklch(0.78_0.13_85)]" />
        </div>
      </div>

      <div className="-mx-4 overflow-x-auto px-4 [scrollbar-width:none] md:-mx-8 md:px-8 [&::-webkit-scrollbar]:hidden">
        <div className="flex w-max gap-4 pb-2 md:gap-5">
          {related.map((c) => (
            <Link
              key={c.slug}
              href={`/category/${c.slug}`}
              className="group block w-[140px] shrink-0 md:w-[180px]"
            >
              <div className="relative aspect-square overflow-hidden rounded-2xl bg-muted shadow-sm transition group-hover:shadow-md">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={c.imageUrl}
                  alt={c.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent transition-opacity group-hover:opacity-0" />
              </div>
              <div className="mt-2 text-center text-sm font-semibold">{c.title}</div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────────────────
   Sorting helper
   ────────────────────────────────────────────────────────────────────── */

function sortProducts(products: Product[], key: SortKey): Product[] {
  const list = [...products];
  switch (key) {
    case "price-asc":
      return list.sort((a, b) => a.price - b.price);
    case "price-desc":
      return list.sort((a, b) => b.price - a.price);
    case "rating":
      return list.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
    case "discount":
      return list.sort((a, b) => (b.discountPct ?? 0) - (a.discountPct ?? 0));
    case "recommended":
    default:
      return list;
  }
}
