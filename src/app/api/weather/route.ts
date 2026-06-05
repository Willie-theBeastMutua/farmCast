import { NextRequest, NextResponse } from "next/server";
import { geocodeLocation } from "@/lib/geocode";
import { env } from "@/lib/env";
import type { WeatherData, DailyForecast } from "@/types";
import type {
  WeatherAIResponse,
  WeatherAICurrent,
  WeatherAIDaily,
  WeatherAIWeatherCondition,
} from "@/types/weather-ai";

const WEATHER_AI_BASE = "https://api.weather-ai.co";

async function fetchWeatherAI(
  lat: number,
  lon: number,
  apiKey: string
): Promise<WeatherAIResponse> {
  const url = new URL(`${WEATHER_AI_BASE}/v1/weather`);
  url.searchParams.set("lat", String(lat));
  url.searchParams.set("lon", String(lon));
  url.searchParams.set("days", "7");
  url.searchParams.set("units", "metric");
  url.searchParams.set("ai", "false");

  const res = await fetch(url.toString(), {
    headers: { Authorization: `Bearer ${apiKey}` },
    next: { revalidate: 1800 },
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`WeatherAI error ${res.status}: ${body}`);
  }

  return res.json() as Promise<WeatherAIResponse>;
}

function resolveCondition(
  condition: string | WeatherAIWeatherCondition | undefined,
  weather: WeatherAIWeatherCondition | undefined
): string {
  if (typeof condition === "string") return condition;
  if (typeof condition === "object" && condition?.description) return condition.description;
  if (weather?.description) return weather.description;
  if (weather?.main) return weather.main;
  return "Clear";
}

function resolveRainProbability(data: WeatherAICurrent | WeatherAIDaily): number {
  const raw =
    data.precip_prob ??
    data.pop ??
    data.precipitation_probability ??
    0;
  return Math.round(raw > 1 ? raw : raw * 100);
}

function mapCurrent(current: WeatherAICurrent): WeatherData["current"] {
  const temp = current.temp ?? current.temperature ?? 0;
  const feelsLike = current.feels_like ?? current.feelsLike ?? temp;
  const uv = current.uv ?? current.uv_index ?? current.uvIndex ?? 0;

  return {
    temperature: Math.round(temp),
    feelsLike: Math.round(feelsLike),
    rainProbability: resolveRainProbability(current),
    windSpeed: Math.round(current.wind_speed ?? current.windSpeed ?? 0),
    humidity: Math.round(current.humidity ?? 0),
    uvIndex: Math.round(uv),
    condition: resolveCondition(current.condition, current.weather),
    icon: current.weather?.icon ?? "clear",
    updatedAt: new Date().toISOString(),
  };
}

function mapDaily(day: WeatherAIDaily, index: number): DailyForecast {
  const today = new Date();
  const date =
    day.date ??
    (() => {
      const d = new Date(today);
      d.setDate(today.getDate() + index);
      return d.toISOString().split("T")[0];
    })();

  let tempMin = 0;
  let tempMax = 0;

  if (typeof day.temp === "object" && day.temp !== null) {
    tempMin = Math.round(day.temp.min);
    tempMax = Math.round(day.temp.max);
  } else {
    tempMin = Math.round(day.temp_min ?? (typeof day.temp === "number" ? day.temp : 0));
    tempMax = Math.round(day.temp_max ?? (typeof day.temp === "number" ? day.temp : 0));
  }

  return {
    date,
    tempMin,
    tempMax,
    rainProbability: resolveRainProbability(day),
    condition: resolveCondition(day.condition, day.weather),
    icon: day.weather?.icon ?? "clear",
  };
}

export async function GET(req: NextRequest) {
  const location = req.nextUrl.searchParams.get("location");
  const latParam = req.nextUrl.searchParams.get("lat");
  const lonParam = req.nextUrl.searchParams.get("lon");

  if (!location && (!latParam || !lonParam)) {
    return NextResponse.json(
      { error: "Provide a location name or lat/lon coordinates" },
      { status: 400 }
    );
  }

  let apiKey: string;
  try {
    apiKey = env.weatherAiApiKey();
  } catch {
    return NextResponse.json(
      { error: "WEATHER_AI_API_KEY is not configured" },
      { status: 503 }
    );
  }

  let lat: number;
  let lon: number;
  let displayName: string;

  if (latParam && lonParam) {
    lat = parseFloat(latParam);
    lon = parseFloat(lonParam);
    displayName = location ?? `${lat.toFixed(4)}, ${lon.toFixed(4)}`;
  } else {
    try {
      const geo = await geocodeLocation(location!);
      lat = geo.lat;
      lon = geo.lon;
      displayName = location!;
    } catch (err) {
      return NextResponse.json(
        { error: (err as Error).message },
        { status: 400 }
      );
    }
  }

  let raw: WeatherAIResponse;
  try {
    raw = await fetchWeatherAI(lat, lon, apiKey);
  } catch (err) {
    return NextResponse.json(
      { error: (err as Error).message },
      { status: 502 }
    );
  }

  if (!raw.current) {
    return NextResponse.json(
      { error: "Unexpected response from weather provider" },
      { status: 502 }
    );
  }

  const days = (raw.daily ?? raw.forecast ?? []).slice(0, 7);

  const data: WeatherData = {
    location: displayName,
    timezone:
      raw.timezone ?? raw.location?.timezone ?? "UTC",
    current: mapCurrent(raw.current),
    forecast: days.map((d, i) => mapDaily(d, i)),
  };

  return NextResponse.json(data);
}
