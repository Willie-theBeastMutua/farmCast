import { NextRequest, NextResponse } from "next/server";
import type { DailyForecast } from "@/types";

function seed(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (Math.imul(31, h) + s.charCodeAt(i)) | 0;
  return Math.abs(h);
}

const CONDITIONS = ["Sunny", "Partly Cloudy", "Cloudy", "Light Rain", "Overcast", "Clear"];

export async function GET(req: NextRequest) {
  const location = req.nextUrl.searchParams.get("location") ?? "Unknown";
  const days = parseInt(req.nextUrl.searchParams.get("days") ?? "7", 10);
  const base = seed(location);
  const today = new Date();

  const forecast: DailyForecast[] = Array.from({ length: days }, (_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    const s = (base + i * 137) % 1000;
    return {
      date: d.toISOString().split("T")[0],
      tempMin: Math.round(14 + (s % 8)),
      tempMax: Math.round(24 + (s % 10)),
      rainProbability: Math.round(5 + (s % 80)),
      condition: CONDITIONS[s % CONDITIONS.length],
      icon: CONDITIONS[s % CONDITIONS.length].toLowerCase().replace(" ", "-"),
    };
  });

  return NextResponse.json(forecast);
}
