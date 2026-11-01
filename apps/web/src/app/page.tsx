"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  Crown,
  Gift,
  Heart,
  ShoppingBag,
  Star,
  Truck,
} from "lucide-react";

import { Container } from "@/components/common/Container";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { mockBanners, mockCategories, mockProducts } from "@/constants/mockData";
import { formatCurrencyINR } from "@/constants/formatters";

const valueProps = [
  { Icon: Truck, title: "Free Shipping", subtitle: "Orders above ₹1,499" },
  { Icon: BadgeCheck, title: "Hand-picked", subtitle: "Curated weaves" },
  { Icon: Gift, title: "Festive Offers", subtitle: "UPI & bank deals" },
  { Icon: Crown, title: "Easy Returns", subtitle: "Seven-day window" },
];

export default function Home() {
  return (
    <div className="pb-24 md:pb-12">
      <Container className="space-y-14 py-8 md:space-y-20 md:py-12">
        <HeroCarousel />
        <ValueStrip />
        <CategoryStrip />
        <PromoDuo />
        <FlashSale />
        <TrendingGrid />
        <EditorialBanner />
        <NewArrivals />
        <Newsletter />
      </Container>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────────
   1) HERO CAROUSEL — clean, modern, image-forward
   ────────────────────────────────────────────────────────────────────── */

function HeroCarousel() {
  return (
    <section className="relative">
      <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-lg shadow-primary/5">
        <Carousel opts={{ loop: true }}>
          <CarouselContent>
            {mockBanners.map((b) => (
              <CarouselItem key={b.id}>
                <Link href="/category" className="block group">
                  <div className="relative aspect-[16/7] w-full bg-muted md:aspect-[16/6]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={b.imageUrl}
                      alt={b.title}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                      loading="eager"
                      referrerPolicy="no-referrer"
                    />
                    {b.label ? (
                      <span className="absolute left-5 top-5 inline-flex items-center gap-1.5 rounded-full bg-primary px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-primary-foreground shadow-md md:left-8 md:top-8">
                        {b.label}
                      </span>
                    ) : null}
                  </div>
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-4 h-11 w-11 border-0 bg-white/90 text-foreground shadow-lg hover:bg-white" />
          <CarouselNext className="right-4 h-11 w-11 border-0 bg-white/90 text-foreground shadow-lg hover:bg-white" />
        </Carousel>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────────────────
   2) VALUE STRIP — refined icon row
   ────────────────────────────────────────────────────────────────────── */

function ValueStrip() {
  return (
    <section className="grid grid-cols-2 gap-3 rounded-2xl border border-border bg-card/60 p-4 md:grid-cols-4 md:gap-6 md:p-6">
      {valueProps.map(({ Icon, title, subtitle }) => (
        <div key={title} className="flex items-center gap-3">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-secondary text-primary">
            <Icon className="h-5 w-5" />
          </span>
          <div className="min-w-0">
            <div className="truncate text-sm font-bold">{title}</div>
            <div className="truncate text-xs text-muted-foreground">{subtitle}</div>
          </div>
        </div>
      ))}
    </section>
  );
}

/* ──────────────────────────────────────────────────────────────────────
   3) CATEGORY STRIP — clean rectangular tiles
   ────────────────────────────────────────────────────────────────────── */

function CategoryStrip() {
  return (
    <section className="space-y-6">
      <SectionHeading title="Shop by Category" link="/category" linkLabel="View all" />

      <div className="grid grid-cols-3 gap-4 md:grid-cols-6 md:gap-5">
        {mockCategories.slice(0, 6).map((c, i) => (
          <motion.div
            key={c.slug}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
          >
            <Link href={`/category/${c.slug}`} className="group block text-center">
              <div className="relative aspect-square overflow-hidden rounded-2xl bg-muted shadow-sm transition group-hover:shadow-md">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={c.imageUrl}
                  alt={c.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/15 to-transparent transition-opacity group-hover:opacity-0" />
              </div>
              <div className="mt-3 text-sm font-semibold tracking-tight">{c.title}</div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────────────────
   4) PROMO DUO — 2 large promotional banners
   ────────────────────────────────────────────────────────────────────── */

function PromoDuo() {
  const promos = [
    {
      slug: "bridal",
      eyebrow: "Bridal Edit",
      title: "The Wedding Collection",
      tagline: "Heirloom silks for forever moments.",
      cta: "Shop Bridal",
      tint: "oklch(0.25 0.15 15)",
      img: mockCategories[5].imageUrl,
    },
    {
      slug: "cotton",
      eyebrow: "Everyday",
      title: "Effortless Cottons",
      tagline: "Breathable, hand-woven, under ₹999.",
      cta: "Shop Cotton",
      tint: "oklch(0.3 0.08 240)",
      img: mockCategories[1].imageUrl,
    },
  ];

  return (
    <section className="grid gap-5 md:grid-cols-2 md:gap-6">
      {promos.map((p, i) => (
        <motion.div
          key={p.slug}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: i * 0.1 }}
        >
          <Link
            href={`/category/${p.slug}`}
            className="group relative block overflow-hidden rounded-3xl bg-card shadow-md transition hover:shadow-xl"
          >
            <div className="relative aspect-[16/10] w-full bg-muted">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={p.img}
                alt={p.title}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
              <div
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(20deg, ${p.tint}e8 0%, ${p.tint}55 50%, transparent 80%)`,
                }}
              />
              <div className="absolute inset-x-6 bottom-6 text-white md:inset-x-9 md:bottom-9">
                <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-[oklch(0.88_0.14_85)]">
                  {p.eyebrow}
                </div>
                <h3 className="mt-2 font-serif text-3xl font-bold tracking-tight md:text-4xl">
                  {p.title}
                </h3>
                <p className="mt-1.5 max-w-xs text-sm text-white/90">{p.tagline}</p>
                <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-[11px] font-bold uppercase tracking-[0.2em] text-foreground transition-all group-hover:gap-3">
                  {p.cta}
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </div>
          </Link>
        </motion.div>
      ))}
    </section>
  );
}

/* ──────────────────────────────────────────────────────────────────────
   5) FLASH SALE — clean maroon panel with countdown
   ────────────────────────────────────────────────────────────────────── */

function FlashSale() {
  return (
    <section className="space-y-6">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-[oklch(0.42_0.16_22)] to-[oklch(0.3_0.13_18)] p-6 text-primary-foreground shadow-lg md:p-10">
        <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-gradient-gold opacity-15 blur-3xl" />

        <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-[oklch(0.88_0.14_85)]">
              Festive Sale · Limited Time
            </div>
            <h2 className="mt-2 font-serif text-3xl font-bold tracking-tight md:text-5xl">
              Up to 70% off
            </h2>
            <p className="mt-1 text-sm text-white/80">On our most-loved heritage drapes.</p>
          </div>

          <div className="flex items-center gap-2">
            {[
              { v: "02", l: "Hrs" },
              { v: "14", l: "Min" },
              { v: "36", l: "Sec" },
            ].map((t) => (
              <div
                key={t.l}
                className="flex w-16 flex-col items-center rounded-xl bg-white/12 px-2 py-2 backdrop-blur md:w-20"
              >
                <span className="font-serif text-2xl font-bold leading-none tabular-nums md:text-3xl">
                  {t.v}
                </span>
                <span className="mt-1 text-[10px] font-semibold uppercase tracking-wider text-white/70">
                  {t.l}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative mt-7 grid grid-cols-2 gap-4 md:grid-cols-4">
          {mockProducts.slice(0, 4).map((p) => (
            <Link
              key={p.id}
              href={`/product/${p.id}`}
              className="group block overflow-hidden rounded-2xl bg-white/95 text-foreground transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-muted">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={p.images[0]}
                  alt={p.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
                {p.discountPct ? (
                  <span className="absolute left-2.5 top-2.5 rounded-full bg-primary px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-primary-foreground shadow">
                    {p.discountPct}% Off
                  </span>
                ) : null}
              </div>
              <div className="p-3">
                <div className="truncate text-sm font-semibold">{p.title}</div>
                <div className="mt-1 flex items-center gap-2">
                  <span className="text-sm font-bold text-primary">
                    {formatCurrencyINR(p.price)}
                  </span>
                  {p.mrp ? (
                    <span className="text-xs text-muted-foreground line-through">
                      {formatCurrencyINR(p.mrp)}
                    </span>
                  ) : null}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────────────────
   6) TRENDING GRID — clean 4-col products
   ────────────────────────────────────────────────────────────────────── */

function TrendingGrid() {
  return (
    <section className="space-y-6">
      <SectionHeading
        title="Trending Now"
        subtitle="Sought-after picks this season."
        link="/category"
        linkLabel="See all"
      />

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
        {mockProducts.slice(4, 12).map((p, i) => (
          <ProductCard key={p.id} product={p} index={i} />
        ))}
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────────────────
   7) EDITORIAL BANNER — full-width signature banner
   ────────────────────────────────────────────────────────────────────── */

function EditorialBanner() {
  return (
    <section className="relative overflow-hidden rounded-3xl shadow-lg">
      <div className="relative aspect-[21/9] w-full bg-muted md:aspect-[21/7]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={mockCategories[6].imageUrl}
          alt="Kanjivaram heritage"
          className="h-full w-full object-cover"
          loading="lazy"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[oklch(0.25_0.12_260)]/90 via-[oklch(0.25_0.12_260)]/40 to-transparent" />

        <div className="absolute inset-y-0 left-0 flex max-w-xl flex-col justify-center p-7 text-white md:p-14">
          <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-[oklch(0.88_0.14_85)]">
            Signature Edit
          </div>
          <h2 className="mt-3 font-serif text-3xl font-bold leading-tight tracking-tight md:text-5xl">
            The Kanjivaram Legacy
          </h2>
          <p className="mt-3 max-w-md text-sm text-white/90 md:text-base">
            Pure mulberry silks woven on Tamil Nadu&apos;s heritage looms. Temple zari,
            traditional motifs, made for keeping.
          </p>
          <div className="mt-5">
            <Link
              href="/category/kanjivaram"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-gold px-6 py-3 text-[11px] font-bold uppercase tracking-[0.2em] text-gold-foreground shadow-md transition hover:brightness-110"
            >
              Discover Kanjivaram
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────────────────
   8) NEW ARRIVALS — clean 4-col products
   ────────────────────────────────────────────────────────────────────── */

function NewArrivals() {
  return (
    <section className="space-y-6">
      <SectionHeading
        title="New Arrivals"
        subtitle="Fresh from the loom."
        link="/category"
        linkLabel="See all"
      />

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
        {mockProducts.slice(12, 20).map((p, i) => (
          <ProductCard key={p.id} product={p} index={i} badge="NEW" />
        ))}
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────────────────
   9) NEWSLETTER — clean signup
   ────────────────────────────────────────────────────────────────────── */

function Newsletter() {
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
   Shared: ProductCard
   ────────────────────────────────────────────────────────────────────── */

function ProductCard({
  product,
  index,
  badge,
}: {
  product: (typeof mockProducts)[number];
  index: number;
  badge?: string;
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

          {/* Badges */}
          {badge ? (
            <span className="absolute left-2.5 top-2.5 rounded-full bg-gradient-gold px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-gold-foreground shadow">
              {badge}
            </span>
          ) : product.discountPct ? (
            <span className="absolute left-2.5 top-2.5 rounded-full bg-primary px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-primary-foreground shadow">
              {product.discountPct}% Off
            </span>
          ) : null}

          {/* Wishlist heart */}
          <button
            type="button"
            aria-label="Add to wishlist"
            onClick={(e) => {
              e.preventDefault();
            }}
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

/* ──────────────────────────────────────────────────────────────────────
   Shared: SectionHeading — left title, optional right link
   ────────────────────────────────────────────────────────────────────── */

function SectionHeading({
  title,
  subtitle,
  link,
  linkLabel,
}: {
  title: string;
  subtitle?: string;
  link?: string;
  linkLabel?: string;
}) {
  return (
    <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
      <div>
        <h2 className="font-serif text-2xl font-bold tracking-tight md:text-4xl">{title}</h2>
        {subtitle ? (
          <p className="mt-1 text-sm text-muted-foreground md:text-base">{subtitle}</p>
        ) : null}
        <span className="mt-2 inline-block h-0.5 w-12 bg-gradient-to-r from-primary to-[oklch(0.78_0.13_85)]" />
      </div>
      {link && linkLabel ? (
        <Link
          href={link}
          className="group inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-primary transition hover:gap-2.5"
        >
          {linkLabel}
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
        </Link>
      ) : null}
    </div>
  );
}
