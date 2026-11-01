import { PageShell } from "@/components/common/PageShell";
import { EmptyState } from "@/components/common/EmptyState";

export default function AddressPage() {
  return (
    <PageShell title="Address" description="Address management UI-only.">
      <EmptyState
        title="No addresses yet"
        description="Add / edit / delete / set default address UI will be implemented."
        actionHref="/checkout"
        actionLabel="Go to checkout"
      />
    </PageShell>
  );
}

