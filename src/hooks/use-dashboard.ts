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

    const [weatherResult, recsResult] = await Promise.allSettled([
      getWeatherByLocation(profile.location),
      getRecommendations({ profile }),
    ]);

    setState({
      weather:
        weatherResult.status === "fulfilled"
          ? { data: weatherResult.value, state: "success", error: null }
          : {
              data: null,
              state: "error",
              error:
                (weatherResult.reason as Error)?.message ??
                "Failed to load weather data",
            },
      recommendations:
        recsResult.status === "fulfilled"
          ? { data: recsResult.value, state: "success", error: null }
          : {
              data: null,
              state: "error",
              error:
                (recsResult.reason as Error)?.message ??
                "Failed to load recommendations",
            },
    });
  }, []);

  return {
    submittedProfile,
    weather: state.weather,
    recommendations: state.recommendations,
    fetchDashboard,
    isLoading:
      state.weather.state === "loading" ||
      state.recommendations.state === "loading",
    hasData:
      state.weather.state === "success" ||
      state.weather.state === "error" ||
      state.recommendations.state === "success",
  };
}
