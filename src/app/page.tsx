import Link from "next/link";
import { Navbar } from "@/components/layout";
import { Footer } from "@/components/layout";

const FEATURES = [
  {
    icon: "☁",
    title: "7-Day Forecast",
    description: "Daily temperature ranges, rain probability, and weather conditions at a glance.",
  },
  {
    icon: "⚡",
    title: "Risk Indicators",
    description:
      "Automatic alerts for heavy rainfall, heat stress, wind exposure, and high humidity.",
  },
  {
    icon: "✓",
    title: "Smart Recommendations",
    description:
      "Irrigation, spraying, and activity guidance generated from real weather conditions.",
  },
  {
    icon: "📍",
    title: "Location-Based",
    description: "Hyperlocal weather data matched to your exact farm location.",
  },
  {
    icon: "🌱",
    title: "Crop-Aware",
    description: "Recommendations adjusted based on your crop type and farming stage.",
  },
  {
    icon: "📷",
    title: "Image Analysis",
    description: "Upload field photos for basic vegetation and condition assessment.",
  },
];

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />
      <main className="flex-1">
        {/* Hero */}
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 text-center">
          <div className="inline-flex items-center rounded-full border border-border bg-muted px-3 py-1 text-xs font-medium text-muted-foreground mb-6">
            Weather-driven farm intelligence
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-[#123956] tracking-tight">
            Smarter farming starts
            <br />
            with better forecasts
          </h1>
          <p className="mt-5 max-w-xl mx-auto text-lg text-muted-foreground">
            FarmCast translates real-time weather data into clear, actionable guidance — so you
            can make the right call at the right time.
          </p>
          <div className="mt-8 flex items-center justify-center gap-4">
            <Link
              href="/dashboard"
              className="inline-flex items-center rounded-md bg-[#123956] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#123956]/90 transition-colors"
            >
              Open Dashboard
            </Link>
            <Link
              href="#features"
              className="inline-flex items-center rounded-md border border-border px-5 py-2.5 text-sm font-medium text-foreground hover:bg-muted transition-colors"
            >
              See how it works
            </Link>
          </div>
        </section>

        {/* Features */}
        <section id="features" className="bg-muted/50 border-y border-border">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
            <h2 className="text-2xl font-semibold text-[#123956] text-center mb-12">
              Everything you need to act on weather
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {FEATURES.map((f) => (
                <div key={f.title} className="bg-white rounded-lg border border-border p-6">
                  <div className="w-8 h-8 rounded-md bg-[#123956]/10 flex items-center justify-center mb-4">
                    <span className="text-[#123956] text-sm">{f.icon}</span>
                  </div>
                  <h3 className="font-semibold text-foreground mb-1">{f.title}</h3>
                  <p className="text-sm text-muted-foreground">{f.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 text-center">
          <h2 className="text-2xl font-semibold text-[#123956]">Ready to get started?</h2>
          <p className="mt-3 text-muted-foreground">
            Enter your farm details and get your first forecast in seconds.
          </p>
          <Link
            href="/dashboard"
            className="mt-6 inline-flex items-center rounded-md bg-[#123956] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#123956]/90 transition-colors"
          >
            Open Dashboard
          </Link>
        </section>
      </main>
      <Footer />
    </div>
  );
}
