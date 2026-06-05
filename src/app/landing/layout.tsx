import { Navbar } from "@/components/layout";
import { Footer } from "@/components/layout";

export default function LandingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />
      <div className="flex-1">{children}</div>
      <Footer />
    </div>
  );
}
