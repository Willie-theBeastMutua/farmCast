import type { FarmProfile, Recommendation, ActivitySuggestion, RiskIndicator } from "@/types";
import { httpClient } from "./http-client";

export interface RecommendationsPayload {
  profile: FarmProfile;
  weatherDataId?: string;
}

export interface RecommendationsResponse {
  recommendations: Recommendation[];
  activities: ActivitySuggestion[];
  risks: RiskIndicator[];
}

export function getRecommendations(
  payload: RecommendationsPayload
): Promise<RecommendationsResponse> {
  return httpClient.post<RecommendationsResponse>("/api/recommendations", payload);
}
