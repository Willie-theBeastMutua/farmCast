// WeatherAI API (https://api.weather-ai.co) response types

export interface WeatherAIWeatherCondition {
  main?: string;
  description?: string;
  icon?: string;
}

export interface WeatherAICurrent {
  temp?: number;
  temperature?: number;
  feels_like?: number;
  feelsLike?: number;
  humidity?: number;
  wind_speed?: number;
  windSpeed?: number;
  uv?: number;
  uv_index?: number;
  uvIndex?: number;
  // precipitation probability — API may return 0–1 or 0–100
  precip_prob?: number;
  pop?: number;
  precipitation_probability?: number;
  weather?: WeatherAIWeatherCondition;
  condition?: string | WeatherAIWeatherCondition;
}

export interface WeatherAIDailyTemp {
  min: number;
  max: number;
}

export interface WeatherAIDaily {
  date?: string;
  dt?: number;
  temp?: WeatherAIDailyTemp | number;
  temp_min?: number;
  temp_max?: number;
  precip_prob?: number;
  pop?: number;
  precipitation_probability?: number;
  weather?: WeatherAIWeatherCondition;
  condition?: string | WeatherAIWeatherCondition;
}

export interface WeatherAILocation {
  lat?: number;
  lon?: number;
  city?: string;
  name?: string;
  country?: string;
  timezone?: string;
}

export interface WeatherAIResponse {
  location?: WeatherAILocation;
  timezone?: string;
  current?: WeatherAICurrent;
  daily?: WeatherAIDaily[];
  forecast?: WeatherAIDaily[];
  ai_summary?: string;
}
