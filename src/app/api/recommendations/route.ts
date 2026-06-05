import { NextRequest, NextResponse } from "next/server";
import type { Recommendation, ActivitySuggestion, RiskIndicator } from "@/types";
import type { RecommendationsResponse } from "@/services/recommendations.service";
import type { FarmProfile } from "@/types";

function buildRecommendations(profile: FarmProfile): Recommendation[] {
  const base: Recommendation[] = [
    {
      id: "rec-1",
      category: "irrigation",
      title: "Delay irrigation for 48 hours",
      description: `Rain probability exceeds 60% over the next two days. Irrigating now would waste water and risk waterlogging for your ${profile.cropType}.`,
      priority: "high",
      actionRequired: true,
    },
    {
      id: "rec-2",
      category: "spraying",
      title: "Postpone pesticide application",
      description: "Avoid foliar sprays when wind speeds exceed 20 km/h or when rain is expected within 6 hours to ensure effective coverage.",
      priority: "medium",
      actionRequired: true,
    },
    {
      id: "rec-3",
      category: "general",
      title: "Monitor for fungal disease",
      description: `High humidity periods increase fungal risk for ${profile.cropType} at the ${profile.farmingStage} stage. Inspect leaves every 48 hours.`,
      priority: "medium",
      actionRequired: false,
    },
    {
      id: "rec-4",
      category: "fertilization",
      title: "Apply fertilizer after rain clears",
      description: "Soil moisture following rainfall improves nutrient uptake. Schedule fertilizer application 1-2 days after rain for best results.",
      priority: "low",
      actionRequired: false,
    },
    {
      id: "rec-5",
      category: "general",
      title: "Provide shade structures for heat stress",
      description: `Temperatures above 32°C may stress ${profile.cropType} during the ${profile.farmingStage} phase. Consider temporary shading or increased mulching.`,
      priority: "low",
      actionRequired: false,
    },
  ];

  if (profile.farmingStage === "flowering") {
    base.unshift({
      id: "rec-flowering",
      category: "general",
      title: "Protect flowering from strong winds",
      description: "Wind speeds above 25 km/h during flowering can cause pollination failure. Consider windbreaks if extended windy conditions are forecast.",
      priority: "high",
      actionRequired: true,
    });
  }

  if (profile.farmingStage === "harvest") {
    base.unshift({
      id: "rec-harvest",
      category: "harvesting",
      title: "Harvest window is approaching",
      description: "Dry conditions in the next 3 days provide a suitable window for harvesting. Plan logistics accordingly.",
      priority: "high",
      actionRequired: true,
    });
  }

  return base;
}

function buildRisks(profile: FarmProfile): RiskIndicator[] {
  return [
    {
      id: "risk-rain",
      type: "rainfall",
      label: "Heavy Rainfall Risk",
      severity: "high",
      description: "Accumulative rainfall over 50mm expected this week. Risk of run-off and crop waterlogging.",
      value: 58,
      unit: "mm",
    },
    {
      id: "risk-heat",
      type: "heat",
      label: "Heat Stress",
      severity: "moderate",
      description: "Daytime highs reaching 33°C. Monitor soil moisture and consider early-morning field operations.",
      value: 33,
      unit: "°C",
    },
    {
      id: "risk-wind",
      type: "wind",
      label: "Wind Exposure",
      severity: profile.farmingStage === "flowering" ? "high" : "low",
      description:
        profile.farmingStage === "flowering"
          ? "Wind gusts up to 35 km/h forecast during peak flowering — risk of pollination disruption."
          : "Wind speeds are within acceptable range for current growth stage.",
      value: 35,
      unit: " km/h",
    },
    {
      id: "risk-humidity",
      type: "humidity",
      label: "High Humidity",
      severity: "moderate",
      description: `Relative humidity sustained above 75% favours fungal pathogens on ${profile.cropType}. Increase scouting frequency.`,
      value: 78,
      unit: "%",
    },
  ];
}

function buildActivities(profile: FarmProfile): ActivitySuggestion[] {
  return [
    {
      id: "act-1",
      timeframe: "today",
      activity: "Inspect crop for early pest signs",
      rationale: `Warm, humid conditions create ideal pest breeding environments for ${profile.cropType} at ${profile.farmingStage} stage.`,
      weatherCondition: "Warm and humid",
    },
    {
      id: "act-2",
      timeframe: "today",
      activity: "Clear drainage channels",
      rationale: "Heavy rain forecast in the next 24-48 hours. Clear channels now to prevent field waterlogging.",
      weatherCondition: "Rain incoming",
    },
    {
      id: "act-3",
      timeframe: "tomorrow",
      activity: "Apply foliar fertilizer",
      rationale: "Light cloud cover and low wind speed tomorrow morning provide ideal conditions for foliar nutrition.",
      weatherCondition: "Partly cloudy, calm",
    },
    {
      id: "act-4",
      timeframe: "this-week",
      activity: "Schedule soil sampling",
      rationale: "Wet soil mid-week will make probe insertion easier for accurate nutrient profiling.",
      weatherCondition: "Post-rain dry spell",
    },
    {
      id: "act-5",
      timeframe: "this-week",
      activity: "Prepare equipment for upcoming harvest window",
      rationale: "Dry conditions forecast from Thursday. Ensure harvest machinery is serviced and ready.",
      weatherCondition: "Dry and sunny",
    },
  ];
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const profile: FarmProfile = body?.profile ?? {
    location: "Unknown",
    cropType: "maize",
    farmSize: 1,
    farmSizeUnit: "acres",
    farmingStage: "vegetative",
  };

  const response: RecommendationsResponse = {
    recommendations: buildRecommendations(profile),
    risks: buildRisks(profile),
    activities: buildActivities(profile),
  };

  return NextResponse.json(response);
}
