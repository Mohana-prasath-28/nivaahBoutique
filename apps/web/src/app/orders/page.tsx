import Link from "next/link";

import { PageShell } from "@/components/common/PageShell";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatCurrencyINR, formatDateIndia } from "@/constants/formatters";
import { mockOrders } from "@/constants/mockData";

export default function OrdersPage() {
  return (
    <PageShell title="Orders" description="Orders list (UI-only).">
      <div className="space-y-3">
        {mockOrders.map((o) => (
          <Link key={o.id} href={`/orders/${encodeURIComponent(o.id)}`} className="block">
            <Card className="hover:bg-muted/30">
              <CardContent className="p-4">
                <div className="flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <div className="truncate text-sm font-extrabold">Order {o.id}</div>
                    <div className="mt-1 text-xs text-muted-foreground">
                      {formatDateIndia(o.dateISO)} • {formatCurrencyINR(o.total)}
                    </div>
                  </div>
                  <Badge variant="secondary">{o.status}</Badge>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </PageShell>
  );
}

