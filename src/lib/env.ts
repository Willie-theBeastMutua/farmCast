function requireEnv(key: string): string {
  const value = process.env[key];
  if (!value) throw new Error(`Missing required environment variable: ${key}`);
  return value;
}

function optionalEnv(key: string, fallback = ""): string {
  return process.env[key] ?? fallback;
}

export const env = {
  weatherAiApiKey: () => requireEnv("WEATHER_AI_API_KEY"),
  appUrl: optionalEnv("NEXT_PUBLIC_APP_URL", "http://localhost:3000"),
  apiBaseUrl: optionalEnv("NEXT_PUBLIC_API_BASE_URL"),
} as const;
