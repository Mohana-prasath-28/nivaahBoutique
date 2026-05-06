import Link from "next/link";

import { PageShell } from "@/components/common/PageShell";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function CheckoutPage() {
  return (
    <PageShell title="Checkout" description="UI-only checkout. Address + payment + summary.">
      <div className="grid gap-4 md:grid-cols-[1fr_360px]">
        <div className="space-y-3">
          <Card>
            <CardContent className="p-4">
              <div className="text-sm font-extrabold">Delivery address</div>
              <div className="mt-1 text-sm text-muted-foreground">
                Select / add address UI will be wired later.
              </div>
              <div className="mt-3 flex gap-2">
                <Button asChild variant="outline" className="font-extrabold">
                  <Link href="/profile/address">Manage addresses</Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="text-sm font-extrabold">Payment methods</div>
              <div className="mt-3 flex flex-wrap gap-2">
                <Badge variant="secondary">UPI</Badge>
                <Badge variant="secondary">Cards</Badge>
                <Badge variant="secondary">Wallets</Badge>
                <Badge variant="secondary">COD</Badge>
              </div>
              <div className="mt-3 text-sm text-muted-foreground">
                Payment UI only — no real transaction.
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="text-sm font-extrabold">Coupons</div>
              <div className="mt-1 text-sm text-muted-foreground">Coupon input UI will be added.</div>
            </CardContent>
          </Card>
        </div>

        <Card className="h-fit">
          <CardContent className="p-4 space-y-2">
            <div className="text-sm font-extrabold">Order summary</div>
            <div className="text-sm text-muted-foreground">Mock totals — wired later.</div>
            <Button className="w-full font-extrabold mt-2">Place order</Button>
          </CardContent>
        </Card>
      </div>
    </PageShell>
  );
}

