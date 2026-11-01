"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Heart, ShoppingBag, Star } from "lucide-react";

import { Container } from "@/components/common/Container";
import { mockCategories, mockProducts } from "@/constants/mockData";
import { formatCurrencyINR } from "@/constants/formatters";

/* Heritage descriptor per category — light contemporary-Indian touch */
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

export default function CategoryPage() {
  return (
    <div className="pb-24 md:pb-12">
      <Container className="space-y-14 py-8 md:space-y-20 md:py-12">
        <PageHeader />
        <CategoryGrid />
        <PromoBanner />
        <CuratedPicks />
        <NewsletterCta />
      </Container>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────────
   1) PAGE HEADER — clean, bold serif, left-aligned with gold rule
   ────────────────────────────────────────────────────────────────────── */

function PageHeader() {
  return (
    <motion.header
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between"
    >
      <div>
        <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary">
          Shop All
        </div>
        <h1 className="mt-2 font-serif text-4xl font-bold tracking-tight md:text-6xl">
          Collections
        </h1>
        <p className="mt-2 max-w-xl text-sm text-muted-foreground md:text-base">
          Explore our hand-picked weaves — {mockCategories.length} collections, {mockProducts.length}+
          drapes from artisans across India.
        </p>
        <span className="mt-3 inline-block h-0.5 w-16 bg-gradient-to-r from-primary to-[oklch(0.78_0.13_85)]" />
      </div>
      <Link
        href="/search"
        className="group inline-flex items-center gap-2 self-start rounded-full border border-border bg-card px-5 py-2.5 text-[11px] font-bold uppercase tracking-[0.2em] text-foreground transition hover:border-primary/40 hover:text-primary md:self-end"
      >
        Search All
        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
      </Link>
    </motion.header>
  );
}

/* ──────────────────────────────────────────────────────────────────────
   2) CATEGORY GRID — clean rectangular tiles, 2 sizes
   ────────────────────────────────────────────────────────────────────── */

function CategoryGrid() {
  /* Asymmetric 12-col bento, but clean rectangles — not arches. */
  const layout: Array<{ slug: string; span: 4 | 6 | 8 | 12; aspect: string }> = [
    { slug: "silk", span: 8, aspect: "16 / 10" }, // big
    { slug: "cotton", span: 4, aspect: "3 / 4" },
    { slug: "banarasi", span: 4, aspect: "3 / 4" },
    { slug: "georgette", span: 4, aspect: "3 / 4" },
    { slug: "chiffon", span: 4, aspect: "3 / 4" },
    { slug: "bridal", span: 8, aspect: "16 / 10" }, // big
    { slug: "kanjivaram", span: 4, aspect: "3 / 4" },
    { slug: "linen", span: 4, aspect: "3 / 4" },
    { slug: "designer", span: 4, aspect: "3 / 4" },
    { slug: "party-wear", span: 12, aspect: "21 / 7" }, // wide
  ];

  const spanClass: Record<number, string> = {
    4: "md:col-span-4",
    6: "md:col-span-6",
    8: "md:col-span-8",
    12: "md:col-span-12",
  };

  return (
    <section className="grid grid-cols-1 gap-5 md:grid-cols-12 md:gap-6">
      {layout.map((item, i) => {
        const category = mockCategories.find((c) => c.slug === item.slug);
        if (!category) return null;
        const count = mockProducts.filter((p) => p.categorySlug === category.slug).length;
        const tag = CAT_TAG[category.slug] ?? "Heritage";
        const isFeature = item.span >= 8;

        return (
          <motion.div
            key={category.slug}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: i * 0.04 }}
            className={`col-span-1 ${spanClass[item.span]}`}
          >
            <Link
              href={`/category/${category.slug}`}
              className="group relative block overflow-hidden rounded-2xl bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div
                className="relative w-full overflow-hidden bg-muted"
                style={{ aspectRatio: item.aspect }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={category.imageUrl}
                  alt={category.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/15 to-transparent" />

                {/* Tag pill top-left */}
                <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-foreground shadow-sm backdrop-blur">
                  {tag}
                </span>

                {/* Title block bottom-left */}
                <div className="absolute inset-x-5 bottom-5 text-white md:inset-x-7 md:bottom-7">
                  <h3
                    className={`font-serif font-bold leading-tight tracking-tight ${
                      isFeature ? "text-3xl md:text-5xl" : "text-2xl md:text-3xl"
                    }`}
                  >
                    {category.title}
                  </h3>
                  <div className="mt-1.5 flex items-center justify-between gap-2">
                    <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/80">
                      {count} drapes
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-white transition-all group-hover:gap-2.5">
                      Shop
                      <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        );
      })}
    </section>
  );
}

/* ──────────────────────────────────────────────────────────────────────
   3) PROMO BANNER — mid-page editorial banner
   ────────────────────────────────────────────────────────────────────── */

function PromoBanner() {
  return (
    <section className="relative overflow-hidden rounded-3xl shadow-lg">
      <div className="relative aspect-[21/9] w-full bg-muted md:aspect-[21/7]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={mockCategories[2].imageUrl}
          alt="Festive offers"
          className="h-full w-full object-cover"
          loading="lazy"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/55 to-transparent" />

        <div className="absolute inset-y-0 left-0 flex max-w-xl flex-col justify-center p-7 text-primary-foreground md:p-14">
          <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-[oklch(0.88_0.14_85)]">
            Festive Sale
          </div>
          <h2 className="mt-2 font-serif text-3xl font-bold leading-tight tracking-tight md:text-5xl">
            Up to 70% off on heritage drapes
          </h2>
          <p className="mt-2 max-w-md text-sm text-white/90 md:text-base">
            Hand-picked weaves, festive prices. Limited time only.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href="/search"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-gold px-6 py-3 text-[11px] font-bold uppercase tracking-[0.2em] text-gold-foreground shadow-md transition hover:brightness-110"
            >
              Shop the Sale
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
            <Link
              href="/category/bridal"
              className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/10 px-6 py-3 text-[11px] font-bold uppercase tracking-[0.2em] text-white backdrop-blur transition hover:bg-white/15"
            >
              Bridal Edit
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────────────────
   4) CURATED PICKS — product grid
   ────────────────────────────────────────────────────────────────────── */

function CuratedPicks() {
  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary">
            Editor&apos;s Picks
          </div>
          <h2 className="mt-2 font-serif text-2xl font-bold tracking-tight md:text-4xl">
            Bestsellers This Week
          </h2>
          <span className="mt-2 inline-block h-0.5 w-12 bg-gradient-to-r from-primary to-[oklch(0.78_0.13_85)]" />
        </div>
        <Link
          href="/search"
          className="group inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-primary transition hover:gap-2.5"
        >
          See all
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
        {mockProducts.slice(0, 8).map((p, i) => (
          <ProductTile key={p.id} product={p} index={i} />
        ))}
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────────────────
   5) NEWSLETTER CTA — closing strip
   ────────────────────────────────────────────────────────────────────── */

function NewsletterCta() {
  return (
    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-secondary via-card to-accent/50 p-7 md:p-12">
      <div className="absolute -right-12 -top-12 h-44 w-44 rounded-full bg-gradient-gold opacity-25 blur-3xl" />

      <div className="relative grid gap-6 md:grid-cols-[1.4fr_1fr] md:items-center">
        <div>
          <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary">
            Nivaah Insider
          </div>
          <h3 className="mt-2 font-serif text-3xl font-bold tracking-tight md:text-4xl">
            Get 10% off your first order.
          </h3>
          <p className="mt-2 max-w-md text-sm text-muted-foreground">
            Join 25,000+ patrons for early drops, festive previews, and styling notes.
          </p>
        </div>

        <form className="flex flex-col gap-3">
          <div className="flex overflow-hidden rounded-full border border-border bg-card shadow-sm">
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 bg-transparent px-5 py-3.5 text-sm outline-none placeholder:text-muted-foreground"
            />
            <button
              type="button"
              className="bg-primary px-6 text-[11px] font-bold uppercase tracking-[0.2em] text-primary-foreground transition hover:brightness-110"
            >
              Subscribe
            </button>
          </div>
          <p className="text-[11px] text-muted-foreground">
            By signing up, you agree to our terms. Unsubscribe anytime.
          </p>
        </form>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────────────────
   Shared: ProductTile — clean rectangular product card
   ────────────────────────────────────────────────────────────────────── */

function ProductTile({
  product,
  index,
}: {
  product: (typeof mockProducts)[number];
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, delay: index * 0.04 }}
    >
      <Link
        href={`/product/${product.id}`}
        className="group block overflow-hidden rounded-2xl bg-card shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
      >
        <div className="relative aspect-[4/5] overflow-hidden bg-muted">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={product.images[0]}
            alt={product.title}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
            referrerPolicy="no-referrer"
          />

          {product.discountPct ? (
            <span className="absolute left-2.5 top-2.5 rounded-full bg-primary px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-primary-foreground shadow">
              {product.discountPct}% Off
            </span>
          ) : null}

          {/* Wishlist heart */}
          <button
            type="button"
            aria-label="Add to wishlist"
            onClick={(e) => e.preventDefault()}
            className="absolute right-2.5 top-2.5 grid h-9 w-9 place-items-center rounded-full bg-white/95 text-foreground shadow-sm backdrop-blur transition hover:bg-white hover:text-primary"
          >
            <Heart className="h-4 w-4" />
          </button>

          {/* Quick add */}
          <div className="absolute inset-x-2.5 bottom-2.5 translate-y-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            <div className="flex items-center justify-center gap-1.5 rounded-full bg-foreground/90 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-background backdrop-blur">
              <ShoppingBag className="h-3 w-3" />
              Add to Bag
            </div>
          </div>
        </div>

        <div className="space-y-1.5 p-4">
          <div className="truncate text-sm font-semibold">{product.title}</div>
          <div className="flex items-center gap-2">
            <span className="text-base font-bold text-primary">
              {formatCurrencyINR(product.price)}
            </span>
            {product.mrp ? (
              <span className="text-xs text-muted-foreground line-through">
                {formatCurrencyINR(product.mrp)}
              </span>
            ) : null}
            {product.discountPct ? (
              <span className="ml-auto text-[11px] font-bold text-[oklch(0.55_0.18_140)]">
                Save {product.discountPct}%
              </span>
            ) : null}
          </div>
          {product.rating ? (
            <div className="inline-flex items-center gap-1 rounded-md bg-secondary px-1.5 py-0.5 text-[11px] font-semibold text-foreground">
              <Star className="h-3 w-3 fill-[oklch(0.78_0.15_85)] text-[oklch(0.78_0.15_85)]" />
              {product.rating}
              {product.ratingCount ? (
                <span className="text-muted-foreground">({product.ratingCount})</span>
              ) : null}
            </div>
          ) : null}
        </div>
      </Link>
    </motion.div>
  );
}
