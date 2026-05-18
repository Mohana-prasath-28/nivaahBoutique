import type { ReactNode } from "react";

import { Container } from "@/components/common/Container";
import { cn } from "@/lib/utils";

export function PageShell({
  title,
  description,
  eyebrow,
  right,
  children,
  className,
}: {
  title: string;
  description?: string;
  eyebrow?: string;
  right?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className="pb-24 md:pb-10">
      <Container className={cn("py-8 space-y-8 md:py-12", className)}>
        <div className="flex items-end justify-between gap-4">
          <div className="min-w-0">
            {eyebrow ? (
              <div className="mb-2 text-[11px] font-bold uppercase tracking-[0.25em] text-primary/70">
                {eyebrow}
              </div>
            ) : null}
            <div className="flex items-baseline gap-3">
              <h1 className="font-serif text-3xl font-bold tracking-tight md:text-5xl">
                {title}
              </h1>
              <span aria-hidden className="hidden h-px flex-1 bg-gradient-to-r from-[oklch(0.78_0.13_85)]/60 to-transparent md:block" />
            </div>
            {description ? (
              <p className="mt-2 max-w-2xl text-sm text-muted-foreground md:text-base">
                {description}
              </p>
            ) : null}
          </div>
          {right ? <div className="shrink-0">{right}</div> : null}
        </div>
        {children}
      </Container>
    </div>
  );
}
