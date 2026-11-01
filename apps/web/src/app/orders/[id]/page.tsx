import Link from "next/link";
import { notFound } from "next/navigation";

import { PageShell } from "@/components/common/PageShell";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { mockOrders, mockProducts } from "@/constants/mockData";
import { formatCurrencyINR, formatDateIndia } from "@/constants/formatters";

const timeline = ["Ordered", "Packed", "Shipped", "Out for Delivery", "Delivered"] as const;
type TimelineStatus = (typeof timeline)[number];

export default async function OrderDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const order = mockOrders.find((o) => o.id === id);
  if (!order) return notFound();

  const canReviewOrReturn = order.status === "Delivered";

  return (
    <PageShell
      title={`Order ${order.id}`}
      description={`${formatDateIndia(order.dateISO)} • ${formatCurrencyINR(order.total)}`}
      right={
        <Button asChild variant="outline" className="font-extrabold">
          <Link href="/orders">Back</Link>
        </Button>
      }
    >
      <div className="grid gap-4 md:grid-cols-[1fr_360px]">
        <div className="space-y-3">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between gap-3">
                <div className="text-sm font-extrabold">Status</div>
                <Badge variant="secondary">{order.status}</Badge>
              </div>
              <div className="mt-3 grid grid-cols-5 gap-2">
                {timeline.map((s) => {
                  const orderStatus = order.status as TimelineStatus;
                  const active = timeline.indexOf(s) <= timeline.indexOf(orderStatus);
                  return (
                    <div key={s} className="text-center">
                      <div className={active ? "mx-auto h-2 w-2 rounded-full bg-primary" : "mx-auto h-2 w-2 rounded-full bg-muted"} />
                      <div className="mt-2 text-[10px] font-bold text-muted-foreground">{s}</div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="text-sm font-extrabold">Items</div>
              <div className="mt-3 space-y-2">
                {order.items.map((it) => {
                  const p = mockProducts.find((x) => x.id === it.productId);
                  if (!p) return null;
                  return (
                    <div key={it.productId} className="flex items-center justify-between gap-3">
                      <div className="min-w-0">
                        <div className="truncate text-sm font-bold">{p.title}</div>
                        <div className="text-xs text-muted-foreground">Qty {it.qty}</div>
                      </div>
                      <div className="text-sm font-extrabold">{formatCurrencyINR(it.price)}</div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="h-fit">
          <CardContent className="p-4 space-y-2">
            <div className="text-sm font-extrabold">Actions</div>
            {canReviewOrReturn ? (
              <div className="grid gap-2">
                <Button className="font-extrabold">Add Review</Button>
                <Button variant="outline" className="font-extrabold">
                  Return Product
                </Button>
              </div>
            ) : (
              <div className="text-sm text-muted-foreground">
                Review/Return available only after delivery.
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </PageShell>
  );
}

