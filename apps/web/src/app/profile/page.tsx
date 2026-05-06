import Link from "next/link";
import { ChevronRight } from "lucide-react";

import { PageShell } from "@/components/common/PageShell";
import { Card, CardContent } from "@/components/ui/card";

const items = [
  { href: "/profile", title: "My Profile", subtitle: "View & edit details" },
  { href: "/profile/wishlist", title: "Wishlist", subtitle: "Saved sarees" },
  { href: "/profile/address", title: "Address", subtitle: "Manage delivery addresses" },
  { href: "/profile/returns", title: "Returns & Refunds", subtitle: "Return requests (UI)" },
] as const;

export default function ProfilePage() {
  return (
    <PageShell title="Profile" description="Profile menu (UI-only).">
      <div className="grid gap-3 md:grid-cols-2">
        {items.map((it) => (
          <Link key={it.href} href={it.href} className="block">
            <Card className="hover:bg-muted/30">
              <CardContent className="p-4">
                <div className="flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <div className="truncate text-sm font-extrabold">{it.title}</div>
                    <div className="mt-1 text-xs text-muted-foreground">{it.subtitle}</div>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </PageShell>
  );
}

