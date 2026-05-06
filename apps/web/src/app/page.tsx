import Link from "next/link";

import { Container } from "@/components/common/Container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { mockBanners, mockCategories, mockProducts } from "@/constants/mockData";
import { formatCurrencyINR } from "@/constants/formatters";

export default function Home() {
  return (
    <div className="pb-20 md:pb-6">
      <Container className="py-6 space-y-8">
        {/* 1) Hero banner carousel */}
        <section className="relative overflow-hidden rounded-3xl border bg-card">
          <Carousel opts={{ loop: true }}>
            <CarouselContent>
              {mockBanners.map((b) => (
                <CarouselItem key={b.id}>
                  <div className="relative aspect-[16/7] w-full bg-muted">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={b.imageUrl}
                      alt={b.title}
                      className="h-full w-full object-cover"
                      loading="lazy"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0" />
                    <div className="absolute bottom-4 left-4 right-4">
                      {b.label ? (
                        <Badge className="bg-white/15 text-white hover:bg-white/15">{b.label}</Badge>
                      ) : null}
                      <div className="mt-2 text-xl font-extrabold tracking-tight text-white md:text-2xl">
                        {b.title}
                      </div>
                      {b.subtitle ? (
                        <div className="mt-1 text-sm text-white/85">{b.subtitle}</div>
                      ) : null}
                      <div className="mt-3 flex flex-wrap gap-2">
                        <Badge className="bg-white/15 text-white hover:bg-white/15">UPI</Badge>
                        <Badge className="bg-white/15 text-white hover:bg-white/15">COD Available</Badge>
                        <Badge className="bg-white/15 text-white hover:bg-white/15">
                          Delivery by Tomorrow
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-3" />
            <CarouselNext className="right-3" />
          </Carousel>
        </section>

        {/* 2) Categories grid */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-extrabold tracking-tight">Categories</h2>
            <Link href="/category" className="text-sm font-bold text-primary hover:underline">
              View all
            </Link>
          </div>
          <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
            {mockCategories.slice(0, 6).map((c) => (
              <Link
                key={c.slug}
                href={`/category/${c.slug}`}
                className="group rounded-2xl border bg-card p-2 hover:bg-muted/40"
              >
                <div className="aspect-square overflow-hidden rounded-xl bg-muted">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={c.imageUrl}
                    alt={c.title}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="mt-2 truncate text-xs font-bold">{c.title}</div>
              </Link>
            ))}
          </div>
        </section>

        {/* 3) Flash sale (UI timer placeholder) */}
        <section className="rounded-3xl border bg-card p-4">
          <div className="flex items-center justify-between gap-3">
            <div>
              <div className="text-sm font-extrabold">Flash Sale</div>
              <div className="text-xs text-muted-foreground">Ends in 02:14:36</div>
            </div>
            <Badge variant="secondary" className="font-extrabold">
              Big discounts
            </Badge>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-4">
            {mockProducts.slice(0, 4).map((p) => (
              <Link key={p.id} href={`/product/${p.id}`} className="group">
                <Card className="overflow-hidden">
                  <div className="relative aspect-[4/5] bg-muted">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={p.images[0]}
                      alt={p.title}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                      loading="lazy"
                      referrerPolicy="no-referrer"
                    />
                    {p.discountPct ? (
                      <Badge className="absolute left-2 top-2 bg-primary text-primary-foreground">
                        {p.discountPct}% OFF
                      </Badge>
                    ) : null}
                  </div>
                  <CardContent className="p-3">
                    <div className="truncate text-sm font-extrabold">{p.title}</div>
                    <div className="mt-1 flex items-center gap-2">
                      <div className="text-sm font-extrabold">{formatCurrencyINR(p.price)}</div>
                      {p.mrp ? (
                        <div className="text-xs text-muted-foreground line-through">
                          {formatCurrencyINR(p.mrp)}
                        </div>
                      ) : null}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        {/* Remaining sections will be implemented next (Trending, Brands, Recommended, Budget, New, Recent, Collections, Big banner) */}
        <section className="rounded-3xl border bg-card p-4">
          <div className="text-sm font-extrabold">Next steps</div>
          <div className="mt-1 text-sm text-muted-foreground">
            I’ll now build the remaining Home sections + all routes (category/product/cart/checkout/orders/profile/auth).
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <Button asChild>
              <Link href="/category">Browse categories</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/search">Search</Link>
            </Button>
          </div>
        </section>
      </Container>
    </div>
  );
}
