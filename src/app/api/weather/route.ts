import { NextRequest, NextResponse } from "next/server";
import type { WeatherData, DailyForecast } from "@/types";

function seed(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (Math.imul(31, h) + s.charCodeAt(i)) | 0;
  return Math.abs(h);
}

function seeded(n: number, min: number, max: number): number {
  return Math.round(min + (n % 1000) / 1000 * (max - min));
}

const CONDITIONS = ["Sunny", "Partly Cloudy", "Cloudy", "Light Rain", "Overcast", "Clear"];

function buildForecast(base: number): DailyForecast[] {
  const today = new Date();
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    const s = (base + i * 137) % 1000;
    return {
      date: d.toISOString().split("T")[0],
      tempMin: seeded(s + 1, 14, 22),
      tempMax: seeded(s + 2, 24, 34),
      rainProbability: seeded(s + 3, 5, 85),
      condition: CONDITIONS[s % CONDITIONS.length],
      icon: CONDITIONS[s % CONDITIONS.length].toLowerCase().replace(" ", "-"),
    };
  });
}

export async function GET(req: NextRequest) {
  const location = req.nextUrl.searchParams.get("location") ?? "Unknown";
  const n = seed(location);

  const temperature = seeded(n, 18, 36);
  const rainProbability = seeded(n + 1, 10, 75);
  const windSpeed = seeded(n + 2, 5, 40);
  const humidity = seeded(n + 3, 45, 88);
  const uvIndex = seeded(n + 4, 2, 11);
  const condition = CONDITIONS[n % CONDITIONS.length];

  const data: WeatherData = {
    location,
    timezone: "Africa/Nairobi",
    current: {
      temperature,
      feelsLike: temperature + seeded(n + 5, -2, 4),
      rainProbability,
      windSpeed,
      humidity,
      uvIndex,
      condition,
      icon: condition.toLowerCase().replace(" ", "-"),
      updatedAt: new Date().toISOString(),
    },
    forecast: buildForecast(n),
  };

  return NextResponse.json(data);
}
