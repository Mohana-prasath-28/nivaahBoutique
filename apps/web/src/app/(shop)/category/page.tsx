import Link from "next/link";

import { PageShell } from "@/components/common/PageShell";
import { mockCategories } from "@/constants/mockData";
import { Card, CardContent } from "@/components/ui/card";

export default function CategoryPage() {
  return (
    <PageShell title="Category" description="Browse saree categories.">
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {mockCategories.map((c) => (
          <Link key={c.slug} href={`/category/${c.slug}`} className="group">
            <Card className="overflow-hidden">
              <div className="aspect-square bg-muted">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={c.imageUrl}
                  alt={c.title}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
              </div>
              <CardContent className="p-3">
                <div className="truncate text-sm font-extrabold">{c.title}</div>
                <div className="mt-1 text-xs text-muted-foreground">Shop now</div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </PageShell>
  );
}

