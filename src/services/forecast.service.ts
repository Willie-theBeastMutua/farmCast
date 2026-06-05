import type { DailyForecast } from "@/types";
import { httpClient } from "./http-client";

export function getForecast(
  latitude: number,
  longitude: number,
  days = 7
): Promise<DailyForecast[]> {
  return httpClient.get<DailyForecast[]>("/api/forecast", { lat: latitude, lon: longitude, days });
}

export function getForecastByLocation(location: string, days = 7): Promise<DailyForecast[]> {
  return httpClient.get<DailyForecast[]>("/api/forecast", { location, days });
}
