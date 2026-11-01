import { PageShell } from "@/components/common/PageShell";
import { EmptyState } from "@/components/common/EmptyState";

export default function ReturnsPage() {
  return (
    <PageShell title="Returns & Refunds" description="UI only. Return flow will be wired later.">
      <EmptyState
        title="No return requests"
        description="When an order is Delivered you can request return (UI only)."
        actionHref="/orders"
        actionLabel="View orders"
      />
    </PageShell>
  );
}

