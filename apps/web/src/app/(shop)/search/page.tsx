import Link from "next/link";

import { PageShell } from "@/components/common/PageShell";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { mockProducts } from "@/constants/mockData";
import { ProductCard } from "@/components/cards/ProductCard";

export default function SearchPage() {
  return (
    <PageShell
      title="Search"
      description="Instant search UI (mock). Suggestions + results UI only."
      right={
        <Link href="/" className="text-sm font-bold text-primary hover:underline">
          Home
        </Link>
      }
    >
      <div className="space-y-4">
        <Input placeholder="Search sarees, fabrics, styles…" />

        <div className="flex flex-wrap gap-2">
          {["Banarasi", "Silk", "Under ₹999", "Bridal", "Cotton"].map((t) => (
            <Badge key={t} variant="secondary">
              {t}
            </Badge>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {mockProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </PageShell>
  );
}

