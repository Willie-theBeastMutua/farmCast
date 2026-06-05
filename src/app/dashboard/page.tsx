"use client";

import { CloudSun, MapPin } from "lucide-react";
import { PageShell, PageHeader } from "@/components/layout";
import { EmptyState } from "@/components/shared/empty-state";
import {
  FarmProfileForm,
  WeatherSummary,
  ForecastView,
  RecommendationPanel,
  RiskIndicators,
  ActivitySuggestions,
  ImageUpload,
} from "@/features/dashboard";
import { useDashboard } from "@/hooks/use-dashboard";

export default function DashboardPage() {
  const {
    submittedProfile,
    weather,
    recommendations,
    fetchDashboard,
    isLoading,
    hasData,
  } = useDashboard();

  function retry() {
    if (submittedProfile) fetchDashboard(submittedProfile);
  }

  return (
    <PageShell>
      <PageHeader
        title="Farm Dashboard"
        description="Monitor weather conditions and get personalised recommendations."
      >
        {submittedProfile && (
          <div className="flex items-center gap-1.5 rounded-lg bg-muted px-3 py-1.5 text-sm text-muted-foreground">
            <MapPin className="size-3.5 shrink-0" />
            <span className="truncate max-w-[200px]">{submittedProfile.location}</span>
          </div>
        )}
      </PageHeader>

      <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[340px_1fr]">
        <aside>
          <FarmProfileForm onSubmit={fetchDashboard} isLoading={isLoading} />
        </aside>

        <div className="min-w-0 space-y-6">
          {!hasData ? (
            <EmptyState
              title="Set up your farm profile"
              description="Fill in the form on the left with your location, crop type, and farming stage to get real-time weather data and tailored recommendations."
              icon={<CloudSun />}
              className="py-24"
            />
          ) : (
            <>
              <WeatherSummary
                data={weather.data}
                state={weather.state}
                error={weather.error}
                onRetry={retry}
              />

              <ForecastView
                data={weather.data?.forecast ?? null}
                state={weather.state}
                error={weather.error}
                onRetry={retry}
              />

              <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
                <RecommendationPanel
                  data={recommendations.data?.recommendations ?? null}
                  state={recommendations.state}
                  error={recommendations.error}
                  onRetry={retry}
                />
                <RiskIndicators
                  data={recommendations.data?.risks ?? null}
                  state={recommendations.state}
                />
              </div>

              <ActivitySuggestions
                data={recommendations.data?.activities ?? null}
                state={recommendations.state}
              />

              <ImageUpload />
            </>
          )}
        </div>
      </div>
    </PageShell>
  );
}
