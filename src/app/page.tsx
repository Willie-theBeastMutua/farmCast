import Link from "next/link"
import {
  Cloud,
  Zap,
  CheckCircle,
  MapPin,
  Leaf,
  Camera,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/layout"
import { Footer } from "@/components/layout"

const FEATURES = [
  {
    icon: Cloud,
    title: "7-Day Forecast",
    description:
      "Daily temperature ranges, rain probability, and weather conditions at a glance.",
  },
  {
    icon: Zap,
    title: "Risk Indicators",
    description:
      "Automatic alerts for heavy rainfall, heat stress, wind exposure, and high humidity.",
  },
  {
    icon: CheckCircle,
    title: "Smart Recommendations",
    description:
      "Irrigation, spraying, and activity guidance generated from real weather conditions.",
  },
  {
    icon: MapPin,
    title: "Location-Based",
    description: "Hyperlocal weather data matched to your exact farm location.",
  },
  {
    icon: Leaf,
    title: "Crop-Aware",
    description:
      "Recommendations adjusted based on your crop type and farming stage.",
  },
  {
    icon: Camera,
    title: "Image Analysis",
    description:
      "Upload field photos for basic vegetation and condition assessment.",
  },
]

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />

      <main className="flex-1">
        {/* Hero */}
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 text-center">
          <div className="inline-flex items-center rounded-full border border-border bg-muted px-3 py-1 text-xs font-medium text-muted-foreground mb-6">
            Weather-driven farm intelligence
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-primary tracking-tight">
            Smarter farming starts
            <br />
            with better forecasts
          </h1>
          <p className="mt-5 max-w-xl mx-auto text-lg text-muted-foreground">
            FarmCast translates real-time weather data into clear, actionable
            guidance — so you can make the right call at the right time.
          </p>
          <div className="mt-8 flex items-center justify-center gap-3 flex-wrap">
            <Button size="xl" render={<Link href="/dashboard" />}>
              Open Dashboard
            </Button>
            <Button size="xl" variant="outline" render={<Link href="#features" />}>
              See how it works
            </Button>
          </div>
        </section>

        {/* Features */}
        <section id="features" className="border-y border-border bg-muted/40">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
            <h2 className="text-2xl font-semibold text-primary text-center mb-12">
              Everything you need to act on weather
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {FEATURES.map((f) => {
                const Icon = f.icon
                return (
                  <div
                    key={f.title}
                    className="rounded-xl border border-border bg-card p-6 ring-1 ring-foreground/5"
                  >
                    <div className="mb-4 flex size-9 items-center justify-center rounded-lg bg-primary/8 text-primary">
                      <Icon className="size-4" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-1.5">
                      {f.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {f.description}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 text-center">
          <h2 className="text-2xl font-semibold text-primary">
            Ready to get started?
          </h2>
          <p className="mt-3 text-muted-foreground max-w-sm mx-auto">
            Enter your farm details and get your first forecast in seconds.
          </p>
          <div className="mt-6">
            <Button size="xl" render={<Link href="/dashboard" />}>
              Open Dashboard
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
