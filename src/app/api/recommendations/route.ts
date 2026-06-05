import { NextRequest, NextResponse } from "next/server";
import type { FarmProfile } from "@/types";
import type { WeatherData } from "@/types/weather";
import type { RecommendationsResponse } from "@/services/recommendations.service";
import {
  deriveRecommendations,
  deriveRisks,
  deriveActivities,
} from "@/lib/recommendations-engine";

const FALLBACK_WEATHER: WeatherData = {
  location: "Unknown",
  timezone: "UTC",
  current: {
    temperature: 28,
    feelsLike: 30,
    rainProbability: 30,
    windSpeed: 12,
    humidity: 65,
    uvIndex: 6,
    condition: "Partly Cloudy",
    icon: "partly-cloudy",
    updatedAt: new Date().toISOString(),
  },
  forecast: [],
};

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));

  const profile: FarmProfile = body?.profile ?? {
    location: "Unknown",
    cropType: "maize",
    farmSize: 1,
    farmSizeUnit: "acres",
    farmingStage: "vegetative",
  };

  const weather: WeatherData = body?.weather ?? FALLBACK_WEATHER;
  const { current, forecast } = weather;

  const response: RecommendationsResponse = {
    recommendations: deriveRecommendations(current, forecast, profile),
    risks: deriveRisks(current, forecast, profile),
    activities: deriveActivities(current, forecast, profile),
  };

  return NextResponse.json(response);
}
