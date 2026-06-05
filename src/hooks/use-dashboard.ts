"use client";

import { useCallback, useState } from "react";
import type { FarmProfile, WeatherData, LoadingState } from "@/types";
import type { RecommendationsResponse } from "@/services/recommendations.service";
import { getWeatherByLocation } from "@/services/weather.service";
import { getRecommendations } from "@/services/recommendations.service";

interface AsyncSlice<T> {
  data: T | null;
  state: LoadingState;
  error: string | null;
}

interface DashboardState {
  weather: AsyncSlice<WeatherData>;
  recommendations: AsyncSlice<RecommendationsResponse>;
}

const idle = <T>(): AsyncSlice<T> => ({ data: null, state: "idle", error: null });
const loading = <T>(): AsyncSlice<T> => ({ data: null, state: "loading", error: null });

export function useDashboard() {
  const [submittedProfile, setSubmittedProfile] = useState<FarmProfile | null>(null);
  const [state, setState] = useState<DashboardState>({
    weather: idle(),
    recommendations: idle(),
  });

  const fetchDashboard = useCallback(async (profile: FarmProfile) => {
    setSubmittedProfile(profile);
    setState({ weather: loading(), recommendations: loading() });

    // Fetch weather first so recommendations can be derived from real conditions
    let weatherData: WeatherData | null = null;
    let weatherSlice: AsyncSlice<WeatherData>;

    try {
      weatherData = await getWeatherByLocation(profile.location);
      weatherSlice = { data: weatherData, state: "success", error: null };
    } catch (err) {
      weatherSlice = {
        data: null,
        state: "error",
        error: (err as Error)?.message ?? "Failed to load weather data",
      };
    }

    setState((prev) => ({ ...prev, weather: weatherSlice }));

    // Pass weather data to the recommendations engine; fall back gracefully if weather failed
    let recsSlice: AsyncSlice<RecommendationsResponse>;
    try {
      const recsData = await getRecommendations({
        profile,
        weather: weatherData ?? undefined,
      });
      recsSlice = { data: recsData, state: "success", error: null };
    } catch (err) {
      recsSlice = {
        data: null,
        state: "error",
        error: (err as Error)?.message ?? "Failed to load recommendations",
      };
    }

    setState((prev) => ({ ...prev, recommendations: recsSlice }));
  }, []);

  return {
    submittedProfile,
    weather: state.weather,
    recommendations: state.recommendations,
    fetchDashboard,
    isLoading:
      state.weather.state === "loading" ||
      state.recommendations.state === "loading",
    hasData: submittedProfile !== null,
  };
}
