import { NextRequest, NextResponse } from "next/server";
import type { FarmProfile } from "@/types";
import type { WeatherData } from "@/types/weather";
import type { RecommendationsResponse } from "@/services/recommendations.service";
import {
  deriveRecommendations,
  deriveRisks,
  deriveActivities,
} from "@/lib/recommendations-engine";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));

  const profile: FarmProfile | undefined = body?.profile;
  const weather: WeatherData | undefined = body?.weather;

  if (!profile) {
    return NextResponse.json({ error: "profile is required" }, { status: 400 });
  }

  if (!weather?.current) {
    return NextResponse.json({ error: "weather data is required" }, { status: 400 });
  }

  const { current, forecast } = weather;

  const response: RecommendationsResponse = {
    recommendations: deriveRecommendations(current, forecast, profile),
    risks: deriveRisks(current, forecast, profile),
    activities: deriveActivities(current, forecast, profile),
  };

  return NextResponse.json(response);
}
