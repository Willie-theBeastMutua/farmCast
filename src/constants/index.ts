export const CROP_TYPES = [
  { value: "maize", label: "Maize / Corn" },
  { value: "wheat", label: "Wheat" },
  { value: "rice", label: "Rice" },
  { value: "soybean", label: "Soybean" },
  { value: "vegetables", label: "Vegetables" },
  { value: "fruits", label: "Fruits" },
  { value: "coffee", label: "Coffee" },
  { value: "tea", label: "Tea" },
  { value: "other", label: "Other" },
] as const;

export const FARMING_STAGES = [
  { value: "land-prep", label: "Land Preparation" },
  { value: "planting", label: "Planting" },
  { value: "germination", label: "Germination" },
  { value: "vegetative", label: "Vegetative Growth" },
  { value: "flowering", label: "Flowering" },
  { value: "harvest", label: "Harvest" },
  { value: "post-harvest", label: "Post Harvest" },
] as const;

export const FARM_SIZE_UNITS = [
  { value: "acres", label: "Acres" },
  { value: "hectares", label: "Hectares" },
] as const;

export const RISK_SEVERITY_COLORS = {
  low: "bg-green-100 text-green-800 border-green-200",
  moderate: "bg-yellow-100 text-yellow-800 border-yellow-200",
  high: "bg-orange-100 text-orange-800 border-orange-200",
  critical: "bg-red-100 text-red-800 border-red-200",
} as const;

export const WEATHER_REFRESH_INTERVAL = 10 * 60 * 1000; // 10 minutes
