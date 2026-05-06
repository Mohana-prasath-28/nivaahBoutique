import Link from "next/link";
import { notFound } from "next/navigation";

import { PageShell } from "@/components/common/PageShell";
import { mockProducts } from "@/constants/mockData";
import { formatCurrencyINR } from "@/constants/formatters";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function ProductDetailsPage({ params }: { params: { id: string } }) {
  const product = mockProducts.find((p) => p.id === params.id);
  if (!product) return notFound();

  return (
    <PageShell
      title={product.title}
      description={product.subtitle ?? "Product details UI only."}
      right={
        <Button asChild variant="outline" className="font-extrabold">
          <Link href={`/category/${product.categorySlug}`}>Back to category</Link>
        </Button>
      }
    >
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="overflow-hidden">
          <div className="aspect-square bg-muted">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={product.images[0]}
              alt={product.title}
              className="h-full w-full object-cover"
              loading="lazy"
              referrerPolicy="no-referrer"
            />
          </div>
        </Card>

        <div className="space-y-3">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-end gap-3">
                <div className="text-2xl font-extrabold">{formatCurrencyINR(product.price)}</div>
                {product.mrp ? (
                  <div className="pb-1 text-sm text-muted-foreground line-through">
                    {formatCurrencyINR(product.mrp)}
                  </div>
                ) : null}
                {product.discountPct ? (
                  <Badge className="ml-auto">{product.discountPct}% OFF</Badge>
                ) : null}
              </div>

              <div className="mt-3 flex flex-wrap gap-2">
                <Badge variant="secondary">UPI</Badge>
                <Badge variant="secondary">COD Available</Badge>
                <Badge variant="secondary">Delivery by Tomorrow</Badge>
                <Badge variant="secondary">Bank Offers</Badge>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-2">
                <Button className="font-extrabold">Add to Cart</Button>
                <Button variant="outline" className="font-extrabold">
                  Buy Now
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="text-sm font-extrabold">Specifications</div>
              <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-2xl bg-muted p-3">
                  <div className="text-xs text-muted-foreground">Fabric</div>
                  <div className="mt-1 font-bold">{product.fabric ?? "—"}</div>
                </div>
                <div className="rounded-2xl bg-muted p-3">
                  <div className="text-xs text-muted-foreground">Color</div>
                  <div className="mt-1 font-bold">{product.color ?? "—"}</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="text-sm font-extrabold">Ratings & Reviews</div>
              <div className="mt-1 text-sm text-muted-foreground">
                View-only UI will be added (breakdown, verified purchase, images).
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageShell>
  );
}

