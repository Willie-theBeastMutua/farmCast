export interface CurrentWeather {
  temperature: number;
  feelsLike: number;
  rainProbability: number;
  windSpeed: number;
  humidity: number;
  uvIndex: number;
  condition: string;
  icon: string;
  updatedAt: string;
}

export interface DailyForecast {
  date: string;
  tempMin: number;
  tempMax: number;
  rainProbability: number;
  condition: string;
  icon: string;
}

export interface WeatherData {
  current: CurrentWeather;
  forecast: DailyForecast[];
  location: string;
  timezone: string;
}

export type RiskSeverity = "low" | "moderate" | "high" | "critical";

export interface RiskIndicator {
  id: string;
  type: "rainfall" | "heat" | "wind" | "humidity" | "frost" | "uv";
  label: string;
  severity: RiskSeverity;
  description: string;
  value?: number;
  unit?: string;
}
