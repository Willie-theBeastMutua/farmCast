import { WeatherData } from "@/types";
import { httpClient } from "./http-client";

export async function getWeatherData(
  latitude: number,
  longitude: number
): Promise<WeatherData> {
  return httpClient.get<WeatherData>(
    `/api/weather?lat=${latitude}&lon=${longitude}`
  );
}

export async function getWeatherByLocation(location: string): Promise<WeatherData> {
  const encoded = encodeURIComponent(location);
  return httpClient.get<WeatherData>(`/api/weather?location=${encoded}`);
}
