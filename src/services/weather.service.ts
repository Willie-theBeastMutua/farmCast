import type { WeatherData } from "@/types";
import { httpClient } from "./http-client";

export function getCurrentWeather(latitude: number, longitude: number): Promise<WeatherData> {
  return httpClient.get<WeatherData>("/api/weather", { lat: latitude, lon: longitude });
}

export function getWeatherByLocation(location: string): Promise<WeatherData> {
  return httpClient.get<WeatherData>("/api/weather", { location });
}
