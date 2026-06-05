export type CropType =
  | "maize"
  | "wheat"
  | "rice"
  | "soybean"
  | "vegetables"
  | "fruits"
  | "coffee"
  | "tea"
  | "other";

export type FarmingStage =
  | "land-prep"
  | "planting"
  | "germination"
  | "vegetative"
  | "flowering"
  | "harvest"
  | "post-harvest";

export interface FarmProfile {
  location: string;
  latitude?: number;
  longitude?: number;
  cropType: CropType;
  farmSize: number;
  farmSizeUnit: "acres" | "hectares";
  farmingStage: FarmingStage;
}

export interface Recommendation {
  id: string;
  category: "irrigation" | "spraying" | "fertilization" | "harvesting" | "general";
  title: string;
  description: string;
  priority: "low" | "medium" | "high";
  actionRequired: boolean;
}

export interface ActivitySuggestion {
  id: string;
  timeframe: "today" | "tomorrow" | "this-week";
  activity: string;
  rationale: string;
  weatherCondition: string;
}
