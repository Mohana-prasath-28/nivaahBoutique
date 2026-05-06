"use client";

import Link from "next/link";
import { Heart, ShoppingBag, User } from "lucide-react";

import { MegaMenu } from "./MegaMenu";

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="mx-auto flex h-14 max-w-6xl items-center gap-3 px-4">
        <Link href="/" className="font-extrabold tracking-tight">
          Nivaah Boutique
        </Link>

        <div className="hidden md:block">
          <MegaMenu />
        </div>

        <div className="flex-1" />

        <div className="hidden md:flex items-center gap-2">
          <Link
            href="/profile/wishlist"
            className="inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold text-foreground/90 hover:bg-muted"
          >
            <Heart className="h-4 w-4" />
            Wishlist
          </Link>
          <Link
            href="/cart"
            className="inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold text-foreground/90 hover:bg-muted"
          >
            <ShoppingBag className="h-4 w-4" />
            Cart
          </Link>
          <Link
            href="/profile"
            className="inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold text-foreground/90 hover:bg-muted"
          >
            <User className="h-4 w-4" />
            Profile
          </Link>
        </div>
      </div>
    </header>
  );
}

