import Link from "next/link"
import { Sprout, ShieldAlert, CalendarRange, ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/layout"
import { Footer } from "@/components/layout"

const STEPS = [
  {
    title: "Set up your farm profile",
    description:
      "Tell us your location, crop type, farm size, and current farming stage. Takes about 30 seconds.",
  },
  {
    title: "Get live weather data",
    description:
      "We pull real-time conditions and a 7-day forecast tied to your exact location — not a nearby town.",
  },
  {
    title: "Act on clear guidance",
    description:
      "Receive crop-specific recommendations, risk flags, and daily activity suggestions based on what the weather is actually doing.",
  },
]

const FEATURES = [
  {
    icon: Sprout,
    title: "Crop-aware recommendations",
    description:
      "Irrigation, spraying, and harvesting advice calibrated to your crop type and farming stage — not generic tips that apply to everyone.",
  },
  {
    icon: ShieldAlert,
    title: "Risk flags before they hit",
    description:
      "Heat stress, heavy rain, high winds, and humidity alerts with severity levels so you know what actually needs your attention today.",
  },
  {
    icon: CalendarRange,
    title: "Plan the full week",
    description:
      "See not just today's conditions but the next 7 days — so you can schedule around weather instead of reacting to it after the fact.",
  },
]

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />

      <main className="flex-1">
        {/* Hero */}
        <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-20 pb-24 text-center">
          <p className="text-sm font-semibold text-[#16a34a] mb-5 tracking-wide">
            For farmers who plan ahead
          </p>
          <h1 className="text-5xl sm:text-6xl font-bold text-[#123956] tracking-tight leading-[1.06]">
            Know before
            <br />
            you grow.
          </h1>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-xl mx-auto">
            FarmCast turns real-time weather data into clear, crop-specific
            advice — so you spend less time guessing and more time on the farm.
          </p>
          <div className="mt-8 flex items-center justify-center gap-3 flex-wrap">
            <Button size="xl" render={<Link href="/dashboard" />}>
              Open Dashboard
              <ArrowRight className="size-4" />
            </Button>
            <Button
              size="xl"
              variant="ghost"
              render={<Link href="#how-it-works" />}
            >
              See how it works
            </Button>
          </div>
          <p className="mt-5 text-xs text-muted-foreground">
            No account needed. Enter your location and go.
          </p>
        </section>

        {/* How it works */}
        <section
          id="how-it-works"
          className="border-y border-border bg-muted/30"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground text-center mb-14">
              How FarmCast works
            </p>
            <div className="grid grid-cols-1 gap-10 sm:grid-cols-3">
              {STEPS.map((step, i) => (
                <div key={step.title} className="flex gap-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#123956] text-white text-sm font-bold mt-0.5">
                    {i + 1}
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1.5">
                      {step.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section
          id="features"
          className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24"
        >
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-[#123956] mb-3">
              Built around real farm decisions
            </h2>
            <p className="text-muted-foreground max-w-lg leading-relaxed">
              Every feature is tied to something you actually need to decide —
              not just information that&apos;s nice to have.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
            {FEATURES.map((f) => {
              const Icon = f.icon
              return (
                <div
                  key={f.title}
                  className="rounded-2xl border border-border bg-card p-7"
                >
                  <div className="mb-5 flex size-11 items-center justify-center rounded-xl bg-[#123956]/8 text-[#123956]">
                    <Icon className="size-5" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">
                    {f.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {f.description}
                  </p>
                </div>
              )
            })}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-[#123956]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to make better calls?
            </h2>
            <p className="text-white/60 max-w-sm mx-auto mb-8 leading-relaxed">
              Enter your farm details and get your first weather-based forecast
              in under a minute.
            </p>
            <Button
              size="xl"
              className="bg-white text-[#123956] hover:bg-white/90 font-semibold"
              render={<Link href="/dashboard" />}
            >
              Open Dashboard
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
