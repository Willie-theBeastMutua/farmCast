import Link from "next/link";
import { Separator } from "@/components/ui/separator";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-14 items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="h-7 w-7 rounded-md bg-[#123956] flex items-center justify-center">
              <span className="text-white text-xs font-bold">FC</span>
            </div>
            <span className="font-semibold text-[#123956] tracking-tight">FarmCast</span>
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
              className="inline-flex items-center rounded-md bg-[#123956] px-3.5 py-1.5 text-sm font-medium text-white hover:bg-[#123956]/90 transition-colors"
            >
              Get Started
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
