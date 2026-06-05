"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, Leaf } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-14 items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="h-7 w-7 rounded-lg bg-[#123956] flex items-center justify-center">
              <Leaf className="size-3.5 text-white" />
            </div>
            <span className="font-bold text-[#123956] tracking-tight">FarmCast</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/dashboard"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Dashboard
            </Link>
            <Separator orientation="vertical" className="h-4" />
            <Link
              href="/dashboard"
              className="inline-flex items-center rounded-lg bg-[#123956] px-3.5 py-1.5 text-sm font-medium text-white hover:bg-[#123956]/90 transition-colors"
            >
              Get Started
            </Link>
          </nav>

          <button
            className="md:hidden flex items-center justify-center rounded-md p-2 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            onClick={() => setMobileOpen((o) => !o)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-white">
          <div className="mx-auto max-w-7xl px-4 py-3 space-y-0.5">
            <Link
              href="/dashboard"
              className="block rounded-md px-3 py-2.5 text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              Dashboard
            </Link>
            <Link
              href="/dashboard"
              className="block rounded-md px-3 py-2.5 text-sm font-medium text-[#123956] hover:bg-muted transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              Get Started
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
