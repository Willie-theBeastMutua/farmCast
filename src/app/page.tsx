import Link from "next/link"
import {
  Sprout,
  ShieldAlert,
  CalendarRange,
  ArrowRight,
  MapPin,
  Droplets,
  Wind,
  Thermometer,
} from "lucide-react"

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
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-16 pb-24">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:items-center">
            {/* Left */}
            <div>
              <p className="text-sm font-semibold text-[#16a34a] mb-5 tracking-wide">
                For farmers who plan ahead
              </p>
              <h1 className="text-5xl sm:text-6xl font-bold text-[#123956] tracking-tight leading-[1.06]">
                Know before
                <br />
                you grow.
              </h1>
              <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-md">
                FarmCast turns real-time weather data into clear, crop-specific
                advice — so you spend less time guessing and more time on the
                farm.
              </p>
              <div className="mt-8 flex items-center gap-3 flex-wrap">
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
            </div>

            {/* Right: weather preview */}
            <div className="hidden lg:block">
              <WeatherPreviewCard />
            </div>
          </div>
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

function WeatherPreviewCard() {
  return (
    <div className="rounded-2xl border border-border bg-card shadow-sm overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3.5 border-b border-border/60">
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <MapPin className="size-3.5" />
          <span className="font-medium">Nairobi, Kenya</span>
        </div>
        <span className="rounded-md bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">
          Partly Cloudy
        </span>
      </div>

      {/* Temperature display */}
      <div className="grid grid-cols-[auto_1fr]">
        <div className="px-6 py-6 border-r border-border/60">
          <p className="text-7xl font-bold text-[#123956] tabular-nums tracking-tight leading-none">
            28°
          </p>
          <p className="text-xs text-muted-foreground mt-2">Feels like 31°C</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 divide-y divide-border/60">
          {[
            { icon: Droplets, label: "Rain chance", value: "15%" },
            { icon: Wind, label: "Wind speed", value: "12 km/h" },
            { icon: Thermometer, label: "Humidity", value: "67%" },
          ].map((s) => {
            const Icon = s.icon
            return (
              <div key={s.label} className="flex items-center gap-3 px-5 py-3">
                <Icon className="size-3.5 text-muted-foreground shrink-0" />
                <span className="text-xs text-muted-foreground flex-1">
                  {s.label}
                </span>
                <span className="text-xs font-semibold tabular-nums text-foreground">
                  {s.value}
                </span>
              </div>
            )
          })}
        </div>
      </div>

      {/* Recommendation */}
      <div className="border-t border-border/60 bg-[#16a34a]/5 px-5 py-4">
        <p className="text-xs font-semibold text-[#16a34a] mb-1">
          Today&apos;s recommendation
        </p>
        <p className="text-xs text-muted-foreground leading-relaxed">
          Good conditions for spraying. Wind is calm and no rain expected in the
          next 6 hours.
        </p>
      </div>
    </div>
  )
}
