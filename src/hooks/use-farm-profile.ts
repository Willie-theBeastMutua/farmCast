"use client";

import { useState } from "react";
import { FarmProfile } from "@/types";

const defaultProfile: FarmProfile = {
  location: "",
  cropType: "maize",
  farmSize: 0,
  farmSizeUnit: "acres",
  farmingStage: "vegetative",
};

export function useFarmProfile() {
  const [profile, setProfile] = useState<FarmProfile>(defaultProfile);

  function updateProfile(updates: Partial<FarmProfile>) {
    setProfile((prev) => ({ ...prev, ...updates }));
  }

  function resetProfile() {
    setProfile(defaultProfile);
  }

  const isValid = profile.location.trim().length > 0 && profile.farmSize > 0;

  return { profile, updateProfile, resetProfile, isValid };
}
