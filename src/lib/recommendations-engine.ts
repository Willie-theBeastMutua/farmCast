import type { CurrentWeather, DailyForecast, RiskIndicator, RiskSeverity } from "@/types/weather";
import type { FarmProfile, Recommendation, ActivitySuggestion } from "@/types/farm";

// --- Thresholds ----------------------------------------------------------------

const THRESHOLDS = {
  rain: { high: 70, moderate: 45 },           // % probability
  wind: { high: 25, moderate: 15 },            // km/h
  humidity: { high: 80, moderate: 68 },        // %
  heat: { extreme: 35, high: 30 },             // °C
  uv: { high: 8, moderate: 6 },               // index
  frost: 5,                                    // °C min temp in forecast
} as const;

// --- Helpers ------------------------------------------------------------------

function avgForecastRain(forecast: DailyForecast[]): number {
  if (!forecast.length) return 0;
  return forecast.reduce((s, d) => s + d.rainProbability, 0) / forecast.length;
}

function forecastDaysAboveHeat(forecast: DailyForecast[]): number {
  return forecast.filter((d) => d.tempMax >= THRESHOLDS.heat.high).length;
}

function hasFrostRisk(forecast: DailyForecast[]): boolean {
  return forecast.some((d) => d.tempMin <= THRESHOLDS.frost);
}

function dryDaysInForecast(forecast: DailyForecast[]): DailyForecast[] {
  return forecast.filter((d) => d.rainProbability < 30 && d.condition !== "Light Rain");
}

// --- Recommendations ----------------------------------------------------------

export function deriveRecommendations(
  current: CurrentWeather,
  forecast: DailyForecast[],
  profile: FarmProfile
): Recommendation[] {
  const recs: Recommendation[] = [];
  const { rainProbability, windSpeed, humidity, temperature } = current;
  const crop = profile.cropType;
  const stage = profile.farmingStage;

  // Irrigation
  if (rainProbability >= THRESHOLDS.rain.high) {
    recs.push({
      id: "rec-irrigation-delay",
      category: "irrigation",
      title: "Delay irrigation — high rainfall expected",
      description: `Rain probability is currently ${rainProbability}%. Irrigating now would waste water and risk waterlogging your ${crop}. Hold off for at least 48 hours.`,
      priority: "high",
      actionRequired: true,
    });
  } else if (rainProbability >= THRESHOLDS.rain.moderate) {
    recs.push({
      id: "rec-irrigation-light",
      category: "irrigation",
      title: "Reduce irrigation volume",
      description: `Rain probability is ${rainProbability}%. Apply half the usual volume today and monitor soil moisture before the next cycle.`,
      priority: "medium",
      actionRequired: false,
    });
  } else if (temperature >= THRESHOLDS.heat.extreme) {
    recs.push({
      id: "rec-irrigation-heat",
      category: "irrigation",
      title: "Increase irrigation frequency",
      description: `Temperature of ${temperature}°C will increase evapotranspiration. Water in early morning or evening to minimise losses.`,
      priority: "high",
      actionRequired: true,
    });
  }

  // Spraying
  if (windSpeed >= THRESHOLDS.wind.high) {
    recs.push({
      id: "rec-spraying-wind",
      category: "spraying",
      title: "Avoid spraying — wind too high",
      description: `Wind speed is ${windSpeed} km/h, above the safe threshold of ${THRESHOLDS.wind.high} km/h. Spray drift will reduce efficacy and risk off-target damage.`,
      priority: windSpeed >= 30 ? "high" : "medium",
      actionRequired: true,
    });
  } else if (rainProbability >= THRESHOLDS.rain.moderate) {
    recs.push({
      id: "rec-spraying-rain",
      category: "spraying",
      title: "Postpone foliar applications",
      description: `Rain probability of ${rainProbability}% will wash off pesticides or foliar fertilisers before they're absorbed. Wait for a dry window.`,
      priority: "medium",
      actionRequired: true,
    });
  }

  // Fungal risk
  if (humidity >= THRESHOLDS.humidity.high) {
    recs.push({
      id: "rec-fungal-high",
      category: "general",
      title: "High fungal disease risk",
      description: `Humidity is ${humidity}%, well above the danger threshold. Inspect ${crop} leaves every 24–48 hours and consider a preventive fungicide application at the ${stage} stage.`,
      priority: "high",
      actionRequired: true,
    });
  } else if (humidity >= THRESHOLDS.humidity.moderate) {
    recs.push({
      id: "rec-fungal-moderate",
      category: "general",
      title: "Monitor for fungal disease",
      description: `Relative humidity at ${humidity}% creates moderate conditions for fungal pathogens on ${crop}. Scout twice this week and ensure good canopy airflow.`,
      priority: "medium",
      actionRequired: false,
    });
  }

  // Heat stress
  if (temperature >= THRESHOLDS.heat.extreme) {
    recs.push({
      id: "rec-heat-extreme",
      category: "general",
      title: "Extreme heat — crop stress alert",
      description: `Temperature of ${temperature}°C exceeds the critical threshold. ${crop} at ${stage} stage is at risk of heat stress. Consider emergency irrigation and temporary shading if feasible.`,
      priority: "high",
      actionRequired: true,
    });
  } else if (forecastDaysAboveHeat(forecast) >= 3) {
    recs.push({
      id: "rec-heat-prolonged",
      category: "general",
      title: "Sustained heat period ahead",
      description: `${forecastDaysAboveHeat(forecast)} of the next 7 days are forecast above ${THRESHOLDS.heat.high}°C. Increase soil moisture monitoring and plan field operations for early morning.`,
      priority: "medium",
      actionRequired: false,
    });
  }

  // Stage-specific rules
  if (stage === "flowering") {
    if (windSpeed >= 20) {
      recs.push({
        id: "rec-flowering-wind",
        category: "general",
        title: "Protect flowers from wind during pollination",
        description: `Wind at ${windSpeed} km/h during flowering can disrupt pollination in ${crop}. Consider windbreaks or wait out the windy period before any in-field work.`,
        priority: "high",
        actionRequired: true,
      });
    }
    if (temperature >= THRESHOLDS.heat.extreme) {
      recs.push({
        id: "rec-flowering-heat",
        category: "general",
        title: "Heat may cause flower drop",
        description: `Temperatures above 35°C during flowering are linked to flower abortion in many crops including ${crop}. Irrigate and monitor pollination success closely.`,
        priority: "high",
        actionRequired: true,
      });
    }
  }

  if (stage === "harvest") {
    const dryDays = dryDaysInForecast(forecast);
    if (dryDays.length >= 2) {
      recs.push({
        id: "rec-harvest-window",
        category: "harvesting",
        title: "Harvest window available",
        description: `${dryDays.length} dry days forecast in the next week. Plan harvest logistics to take advantage of this window and minimise post-harvest losses.`,
        priority: "high",
        actionRequired: true,
      });
    } else if (avgForecastRain(forecast) >= THRESHOLDS.rain.moderate) {
      recs.push({
        id: "rec-harvest-rain-risk",
        category: "harvesting",
        title: "Wet weather may delay harvest",
        description: `Rain is expected across most of the next 7 days. Prioritise drier crop sections and ensure storage is ready to receive harvested produce quickly.`,
        priority: "high",
        actionRequired: true,
      });
    }
  }

  if (stage === "land-prep" || stage === "planting") {
    if (rainProbability >= THRESHOLDS.rain.high) {
      recs.push({
        id: "rec-planting-rain",
        category: "general",
        title: "Delay field operations until rain passes",
        description: `High rainfall probability (${rainProbability}%) will waterlog prepared beds and compact soil under machinery. Wait for drier conditions before tilling or planting.`,
        priority: "medium",
        actionRequired: false,
      });
    }
  }

  // Fertilization window
  if (
    rainProbability < THRESHOLDS.rain.moderate &&
    windSpeed < THRESHOLDS.wind.moderate &&
    humidity < THRESHOLDS.humidity.moderate
  ) {
    recs.push({
      id: "rec-fertilize-window",
      category: "fertilization",
      title: "Good conditions for fertiliser application",
      description: `Low rain probability, calm winds, and moderate humidity create favourable conditions for applying fertiliser today. Apply in the early morning for best uptake.`,
      priority: "low",
      actionRequired: false,
    });
  } else if (avgForecastRain(forecast) < 30) {
    recs.push({
      id: "rec-fertilize-upcoming",
      category: "fertilization",
      title: "Plan fertiliser application for later this week",
      description: `Drier conditions later in the forecast provide a better window for fertiliser application than today. Soil moisture after recent rain will aid nutrient uptake.`,
      priority: "low",
      actionRequired: false,
    });
  }

  // Frost warning
  if (hasFrostRisk(forecast)) {
    recs.push({
      id: "rec-frost",
      category: "general",
      title: "Frost risk in the forecast",
      description: `Temperatures below ${THRESHOLDS.frost}°C are expected in the coming days. Protect sensitive ${crop} with frost cloth or irrigation-based frost protection overnight.`,
      priority: "high",
      actionRequired: true,
    });
  }

  return recs;
}

// --- Risk Indicators ----------------------------------------------------------

export function deriveRisks(
  current: CurrentWeather,
  forecast: DailyForecast[],
  profile: FarmProfile
): RiskIndicator[] {
  const risks: RiskIndicator[] = [];
  const { rainProbability, windSpeed, humidity, temperature, uvIndex } = current;
  const stage = profile.farmingStage;

  // Rainfall
  const avgRain = avgForecastRain(forecast);
  if (rainProbability >= THRESHOLDS.rain.high || avgRain >= 60) {
    const severity: RiskSeverity =
      rainProbability >= 85 || avgRain >= 75 ? "critical" : "high";
    risks.push({
      id: "risk-rainfall",
      type: "rainfall",
      label: "Heavy Rainfall Risk",
      severity,
      description:
        `Current rain probability ${rainProbability}% with an average of ${Math.round(avgRain)}% across the 7-day forecast. Risk of runoff, waterlogging, and nutrient leaching.`,
      value: rainProbability,
      unit: "%",
    });
  } else if (rainProbability >= THRESHOLDS.rain.moderate) {
    risks.push({
      id: "risk-rainfall",
      type: "rainfall",
      label: "Moderate Rainfall Risk",
      severity: "moderate",
      description: `Rain probability at ${rainProbability}%. Monitor soil saturation and defer irrigation.`,
      value: rainProbability,
      unit: "%",
    });
  } else {
    risks.push({
      id: "risk-rainfall",
      type: "rainfall",
      label: "Rainfall Risk",
      severity: "low",
      description: `Rain probability is low at ${rainProbability}%. Normal irrigation scheduling applies.`,
      value: rainProbability,
      unit: "%",
    });
  }

  // Heat
  if (temperature >= THRESHOLDS.heat.extreme) {
    risks.push({
      id: "risk-heat",
      type: "heat",
      label: "Heat Stress",
      severity: temperature >= 38 ? "critical" : "high",
      description: `Temperature of ${temperature}°C exceeds crop tolerance thresholds. Immediate action recommended to prevent crop damage.`,
      value: temperature,
      unit: "°C",
    });
  } else if (temperature >= THRESHOLDS.heat.high || forecastDaysAboveHeat(forecast) >= 3) {
    risks.push({
      id: "risk-heat",
      type: "heat",
      label: "Heat Stress",
      severity: "moderate",
      description: `Temperatures reaching ${temperature}°C today with sustained heat expected. Monitor crop stress indicators and soil moisture.`,
      value: temperature,
      unit: "°C",
    });
  }

  // Wind
  const windSeverity: RiskSeverity =
    windSpeed >= 35 ? "critical" :
    windSpeed >= 25 ? (stage === "flowering" ? "critical" : "high") :
    windSpeed >= 15 ? "moderate" : "low";

  risks.push({
    id: "risk-wind",
    type: "wind",
    label: "Wind Exposure",
    severity: windSeverity,
    description:
      windSpeed >= THRESHOLDS.wind.high
        ? `Wind gusts at ${windSpeed} km/h${stage === "flowering" ? " — critical risk of pollination disruption during flowering" : " — spray drift and physical crop damage risk"}.`
        : windSpeed >= THRESHOLDS.wind.moderate
        ? `Wind at ${windSpeed} km/h. Defer foliar applications and monitor for lodging in tall crops.`
        : `Wind speeds within acceptable range at ${windSpeed} km/h.`,
    value: windSpeed,
    unit: " km/h",
  });

  // Humidity
  if (humidity >= THRESHOLDS.humidity.high) {
    risks.push({
      id: "risk-humidity",
      type: "humidity",
      label: "High Humidity",
      severity: humidity >= 88 ? "critical" : "high",
      description: `Relative humidity at ${humidity}% strongly favours fungal pathogen development. Increase scouting frequency and consider preventive fungicide.`,
      value: humidity,
      unit: "%",
    });
  } else if (humidity >= THRESHOLDS.humidity.moderate) {
    risks.push({
      id: "risk-humidity",
      type: "humidity",
      label: "Elevated Humidity",
      severity: "moderate",
      description: `Humidity at ${humidity}% creates moderate fungal risk. Scout crops twice this week.`,
      value: humidity,
      unit: "%",
    });
  }

  // UV
  if (uvIndex >= THRESHOLDS.uv.high) {
    risks.push({
      id: "risk-uv",
      type: "uv",
      label: "High UV Index",
      severity: uvIndex >= 10 ? "high" : "moderate",
      description: `UV index of ${uvIndex} — avoid mid-day field work and protect workers. High UV can also accelerate degradation of some pesticides after application.`,
      value: uvIndex,
      unit: "",
    });
  }

  // Frost
  if (hasFrostRisk(forecast)) {
    risks.push({
      id: "risk-frost",
      type: "frost",
      label: "Frost Risk",
      severity: "high",
      description: `Temperatures forecast to drop below ${THRESHOLDS.frost}°C. Frost protection measures required for sensitive crops.`,
      value: THRESHOLDS.frost,
      unit: "°C",
    });
  }

  return risks;
}

// --- Activity Suggestions -----------------------------------------------------

export function deriveActivities(
  current: CurrentWeather,
  forecast: DailyForecast[],
  profile: FarmProfile
): ActivitySuggestion[] {
  const activities: ActivitySuggestion[] = [];
  const { rainProbability, windSpeed, humidity, temperature } = current;
  const tomorrow = forecast[1];
  const crop = profile.cropType;

  // Today
  if (humidity >= THRESHOLDS.humidity.moderate || temperature >= THRESHOLDS.heat.high) {
    activities.push({
      id: "act-today-scout",
      timeframe: "today",
      activity: "Scout crop for pest and disease signs",
      rationale: `${humidity >= THRESHOLDS.humidity.high ? `High humidity (${humidity}%) accelerates fungal spread.` : `Warm temperatures of ${temperature}°C create ideal pest conditions.`} Early detection prevents major losses in ${crop}.`,
      weatherCondition:
        humidity >= THRESHOLDS.humidity.high ? "Warm and humid" : "Hot and dry",
    });
  }

  if (rainProbability >= THRESHOLDS.rain.high) {
    activities.push({
      id: "act-today-drainage",
      timeframe: "today",
      activity: "Clear drainage channels and field outlets",
      rationale: `Rain probability of ${rainProbability}% — clearing channels now prevents waterlogging and soil erosion before the rain arrives.`,
      weatherCondition: "Heavy rain incoming",
    });
  }

  if (windSpeed >= THRESHOLDS.wind.high) {
    activities.push({
      id: "act-today-secure",
      timeframe: "today",
      activity: "Secure loose structures and supports",
      rationale: `Wind speed at ${windSpeed} km/h. Trellises, stakes, and protective structures should be checked and reinforced.`,
      weatherCondition: "High winds",
    });
  }

  // Tomorrow
  if (tomorrow) {
    if (
      tomorrow.rainProbability < 30 &&
      windSpeed < THRESHOLDS.wind.moderate
    ) {
      activities.push({
        id: "act-tomorrow-spray",
        timeframe: "tomorrow",
        activity: "Apply foliar fertiliser or pesticide",
        rationale: `Tomorrow's forecast shows low rain probability (${tomorrow.rainProbability}%) and calm conditions — ideal for effective foliar applications.`,
        weatherCondition: `${tomorrow.condition}, calm`,
      });
    } else if (tomorrow.rainProbability >= THRESHOLDS.rain.moderate) {
      activities.push({
        id: "act-tomorrow-hold",
        timeframe: "tomorrow",
        activity: "Hold off on spray and fertiliser applications",
        rationale: `Rain forecast at ${tomorrow.rainProbability}% tomorrow will reduce effectiveness of foliar treatments. Reschedule to next dry window.`,
        weatherCondition: `${tomorrow.condition}`,
      });
    }
  }

  // This week
  const dryDays = dryDaysInForecast(forecast.slice(2));
  if (dryDays.length >= 2) {
    activities.push({
      id: "act-week-soil",
      timeframe: "this-week",
      activity: "Schedule soil sampling",
      rationale: `${dryDays.length} dry days forecast mid-to-late week. Soil probe insertion is easier after recent moisture and before the next rain.`,
      weatherCondition: "Post-rain dry spell",
    });
  }

  if (profile.farmingStage === "harvest" && dryDays.length >= 1) {
    activities.push({
      id: "act-week-harvest",
      timeframe: "this-week",
      activity: "Prepare harvest machinery",
      rationale: `Dry window of ${dryDays.length} day${dryDays.length > 1 ? "s" : ""} forecast this week. Service and position harvest equipment ahead of that window.`,
      weatherCondition: "Dry and suitable",
    });
  }

  if (avgForecastRain(forecast) >= THRESHOLDS.rain.moderate) {
    activities.push({
      id: "act-week-inputs",
      timeframe: "this-week",
      activity: "Pre-position inputs before rain",
      rationale: `Wet conditions are forecast for much of the week. Stock fertilisers, chemicals, and supplies while access tracks are passable.`,
      weatherCondition: "Extended wet period",
    });
  } else {
    activities.push({
      id: "act-week-fertilize",
      timeframe: "this-week",
      activity: "Apply basal or top-dress fertiliser",
      rationale: `Drier conditions provide a good opportunity for ground-level fertiliser application with minimal leaching risk.`,
      weatherCondition: "Dry and sunny",
    });
  }

  return activities;
}
