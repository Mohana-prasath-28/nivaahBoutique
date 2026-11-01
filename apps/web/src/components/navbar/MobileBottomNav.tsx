"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, List, Search, ShoppingBag, User } from "lucide-react";

import { cn } from "@/lib/utils";
import { useCartStore } from "@/store/cartStore";

const items = [
  { href: "/", label: "Home", Icon: Home },
  { href: "/category", label: "Shop", Icon: List },
  { href: "/search", label: "Search", Icon: Search },
  { href: "/cart", label: "Cart", Icon: ShoppingBag },
  { href: "/profile", label: "Profile", Icon: User },
] as const;

export function MobileBottomNav() {
  const pathname = usePathname();
  const cartCount = useCartStore((s) =>
    s.cartItems.reduce((sum, i) => sum + i.qty, 0)
  );

  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 md:hidden">
      <div className="pointer-events-none absolute inset-x-0 -top-6 h-6 bg-gradient-to-t from-background/80 to-transparent" />
      <div className="mx-3 mb-3 rounded-3xl border border-border bg-background/85 shadow-2xl shadow-primary/10 ring-1 ring-[oklch(0.78_0.13_85)]/20 backdrop-blur-xl">
        <div className="grid grid-cols-5 px-2 pb-[max(env(safe-area-inset-bottom),0px)] pt-2">
          {items.map(({ href, label, Icon }) => {
            const active = pathname === href || (href !== "/" && pathname.startsWith(href));
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "relative flex flex-col items-center justify-center gap-0.5 rounded-2xl px-2 py-2 text-[10px] font-semibold transition",
                  active ? "text-primary" : "text-muted-foreground"
                )}
              >
                <span
                  className={cn(
                    "relative grid h-9 w-9 place-items-center rounded-xl transition",
                    active && "bg-gradient-primary text-primary-foreground shadow-md shadow-primary/30"
                  )}
                >
                  <Icon className="h-[18px] w-[18px]" />
                  {href === "/cart" && cartCount > 0 ? (
                    <span className="absolute -right-1 -top-1 grid h-4 min-w-4 place-items-center rounded-full bg-gradient-gold px-1 text-[9px] font-bold text-gold-foreground">
                      {cartCount}
                    </span>
                  ) : null}
                </span>
                <span className={cn("mt-0.5 truncate", active && "font-bold")}>{label}</span>
                {active ? (
                  <span className="absolute -top-1 h-1 w-6 rounded-full bg-gradient-gold" />
                ) : null}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
