import type { Metadata } from "next";
import { Navbar } from "@/components/layout";
import { Footer } from "@/components/layout";

export const metadata: Metadata = {
  title: "Dashboard",
  description:
    "Your farm weather dashboard — real-time conditions, 7-day forecast, and crop-specific recommendations.",
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      <div className="flex-1">{children}</div>
      <Footer />
    </div>
  );
}
