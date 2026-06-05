# FarmCast

Weather-driven agricultural decision support dashboard. Enter your farm location, crop type, and farming stage to get real-time conditions, a 7-day forecast, risk alerts, and actionable recommendations.

## What it does

- Current weather conditions — temperature, rain probability, wind, humidity, UV index
- 7-day forecast with daily temperature range and rain probability
- Crop and stage-aware recommendations for irrigation, spraying, and harvesting
- Risk indicators for heat stress, heavy rain, high winds, and humidity
- Short and mid-term activity suggestions based on forecast trends
- Optional field photo upload for basic vegetation assessment

## Running locally

```bash
npm install
```

Create a `.env.local` file:

```env
WEATHER_API_KEY=your_openweathermap_key
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).
