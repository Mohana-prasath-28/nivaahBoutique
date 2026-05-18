"use client";

import * as React from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { Heart, Search, ShoppingBag, Sparkles, User } from "lucide-react";

import { MegaMenu } from "./MegaMenu";
import { useCartStore } from "@/store/cartStore";
import { useWishlistStore } from "@/store/wishlistStore";

export function Navbar() {
  const { scrollY } = useScroll();
  const bgOpacity = useTransform(scrollY, [0, 80], [0.4, 0.85]);
  const blurAmount = useTransform(scrollY, [0, 80], [8, 20]);
  const borderOpacity = useTransform(scrollY, [0, 80], [0, 0.6]);
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const unsub = scrollY.on("change", (v) => setScrolled(v > 16));
    return () => unsub();
  }, [scrollY]);

  const cartCount = useCartStore((s) =>
    s.cartItems.reduce((sum, i) => sum + i.qty, 0)
  );
  const wishCount = useWishlistStore((s) => Object.keys(s.wishlistItems).length);

  return (
    <motion.header
      className="sticky top-0 z-40"
      style={{
        backgroundColor: useTransform(
          bgOpacity,
          (o) => `color-mix(in oklch, var(--background) ${o * 100}%, transparent)`
        ),
        backdropFilter: useTransform(blurAmount, (b) => `blur(${b}px)`),
        borderBottom: useTransform(
          borderOpacity,
          (o) => `1px solid color-mix(in oklch, var(--border) ${o * 100}%, transparent)`
        ),
      }}
    >
      {/* Announcement strip — slim, refined */}
      <div className="relative hidden h-9 items-center justify-center overflow-hidden bg-gradient-primary text-[11px] font-medium tracking-[0.25em] text-primary-foreground md:flex">
        <motion.div
          className="flex items-center gap-3"
          animate={{ opacity: [0.85, 1, 0.85] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <Sparkles className="h-3 w-3 text-[oklch(0.92_0.12_90)]" />
          <span>FREE SHIPPING ON ORDERS ABOVE ₹1499</span>
          <span className="h-1 w-1 rounded-full bg-[oklch(0.92_0.12_90)]/60" />
          <span>COD AVAILABLE</span>
          <span className="h-1 w-1 rounded-full bg-[oklch(0.92_0.12_90)]/60" />
          <span>DELIVERY BY TOMORROW</span>
          <Sparkles className="h-3 w-3 text-[oklch(0.92_0.12_90)]" />
        </motion.div>
      </div>

      <motion.div
        className="mx-auto flex max-w-7xl items-center gap-3 px-4 md:gap-8 md:px-8"
        animate={{ height: scrolled ? 64 : 80 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        {/* Logo */}
        <Link href="/" aria-label="Nivaah Boutique" className="group flex items-center">
          <motion.img
            src="/OurLogo.png"
            alt="Nivaah Boutique"
            className="w-auto"
            animate={{ height: scrolled ? 40 : 52 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            whileHover={{ scale: 1.03 }}
          />
        </Link>

        <div className="hidden md:block">
          <MegaMenu />
        </div>

        {/* Search */}
        <div className="hidden flex-1 md:flex">
          <Link
            href="/search"
            className="group relative flex w-full max-w-lg items-center gap-3 rounded-full border border-border/70 bg-card/70 px-5 py-2.5 text-sm text-muted-foreground transition-all hover:border-primary/30 hover:bg-card hover:shadow-md hover:shadow-primary/5"
          >
            <Search className="h-4 w-4 transition group-hover:text-primary" />
            <span className="truncate font-medium">Search Kanchipuram, Banarasi, Silk…</span>
            <kbd className="ml-auto hidden rounded-md border border-border/60 bg-muted px-2 py-0.5 text-[10px] font-semibold tracking-wider lg:inline-block">
              ⌘K
            </kbd>
          </Link>
        </div>

        <div className="ml-auto flex-1 md:hidden" />

        <div className="flex items-center gap-1 md:gap-1.5">
          <NavIcon href="/profile/wishlist" label="Wishlist" count={wishCount}>
            <Heart className="h-[18px] w-[18px]" />
          </NavIcon>
          <NavIcon href="/cart" label="Cart" count={cartCount} gold>
            <ShoppingBag className="h-[18px] w-[18px]" />
          </NavIcon>
          <Link
            href="/profile"
            aria-label="Profile"
            className="inline-flex items-center gap-2 rounded-full bg-secondary/70 px-3 py-2 text-sm font-semibold text-foreground/90 transition hover:bg-secondary hover:shadow-sm md:px-4"
          >
            <User className="h-[18px] w-[18px]" />
            <span className="hidden lg:inline">Profile</span>
          </Link>
        </div>
      </motion.div>
    </motion.header>
  );
}

function NavIcon({
  href,
  label,
  count,
  gold,
  children,
}: {
  href: string;
  label: string;
  count: number;
  gold?: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      aria-label={label}
      className="relative inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold text-foreground/90 transition hover:bg-secondary hover:text-primary md:px-4"
    >
      <motion.span whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="inline-flex">
        {children}
      </motion.span>
      <span className="hidden lg:inline">{label}</span>
      {count > 0 ? (
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 500, damping: 20 }}
          className={`absolute -right-0.5 -top-0.5 grid h-[18px] min-w-[18px] place-items-center rounded-full px-1 text-[10px] font-bold ${
            gold ? "bg-gradient-gold text-gold-foreground" : "bg-primary text-primary-foreground"
          }`}
        >
          {count}
        </motion.span>
      ) : null}
    </Link>
  );
}
