import type { ReactNode } from "react";

import { Container } from "@/components/common/Container";
import { cn } from "@/lib/utils";

export function PageShell({
  title,
  description,
  right,
  children,
  className,
}: {
  title: string;
  description?: string;
  right?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className="pb-20 md:pb-6">
      <Container className={cn("py-6 space-y-6", className)}>
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h1 className="text-xl font-extrabold tracking-tight md:text-2xl">{title}</h1>
            {description ? (
              <p className="mt-1 text-sm text-muted-foreground">{description}</p>
            ) : null}
          </div>
          {right ? <div className="shrink-0">{right}</div> : null}
        </div>
        {children}
      </Container>
    </div>
  );
}

