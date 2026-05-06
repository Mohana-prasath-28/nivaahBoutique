import Link from "next/link";
import { notFound } from "next/navigation";

import { PageShell } from "@/components/common/PageShell";
import { ProductCard } from "@/components/cards/ProductCard";
import { mockCategories, mockProducts } from "@/constants/mockData";
import { Button } from "@/components/ui/button";

export default function CategorySlugPage({ params }: { params: { slug: string } }) {
  const category = mockCategories.find((c) => c.slug === params.slug);
  if (!category) return notFound();

  const products = mockProducts.filter((p) => p.categorySlug === category.slug);

  return (
    <PageShell
      title={category.title}
      description="Filters & sort UI will be added (UI-only)."
      right={
        <Button asChild variant="outline" className="font-extrabold">
          <Link href="/category">All categories</Link>
        </Button>
      }
    >
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </PageShell>
  );
}

