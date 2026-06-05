"use client";

import { useState } from "react";
import { MapPin, ChevronRight, Loader2, Tractor } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FormField } from "@/components/shared/form-field";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { CROP_TYPES, FARMING_STAGES, FARM_SIZE_UNITS } from "@/constants";
import { useFarmProfile } from "@/hooks/use-farm-profile";
import type { FarmProfile } from "@/types";

interface FarmProfileFormProps {
  onSubmit: (profile: FarmProfile) => void;
  isLoading?: boolean;
}

export function FarmProfileForm({ onSubmit, isLoading }: FarmProfileFormProps) {
  const { profile, updateProfile } = useFarmProfile();
  const [errors, setErrors] = useState<Record<string, string>>({});

  function validate(): Record<string, string> {
    const next: Record<string, string> = {};
    if (!profile.location.trim()) next.location = "Location is required";
    if (!profile.farmSize || profile.farmSize <= 0) next.farmSize = "Enter a valid farm size";
    return next;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    setErrors({});
    onSubmit(profile);
  }

  return (
    <Card className="sticky top-6">
      <CardHeader className="border-b border-border/50 pb-4">
        <CardTitle className="flex items-center gap-2 text-sm font-semibold">
          <Tractor className="size-4 text-primary" />
          Farm Profile
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-5">
        <form onSubmit={handleSubmit} className="space-y-4">
          <FormField
            label="Location"
            htmlFor="location"
            required
            error={errors.location}
          >
            <div className="relative">
              <MapPin className="pointer-events-none absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="location"
                placeholder="e.g. Nairobi, Kenya"
                value={profile.location}
                onChange={(e) => updateProfile({ location: e.target.value })}
                className="pl-8"
              />
            </div>
          </FormField>

          <FormField label="Crop Type" htmlFor="crop-type" required>
            <Select
              value={profile.cropType}
              onValueChange={(v) =>
                updateProfile({ cropType: v as FarmProfile["cropType"] })
              }
            >
              <SelectTrigger id="crop-type" className="w-full">
                <SelectValue placeholder="Select crop" />
              </SelectTrigger>
              <SelectContent>
                {CROP_TYPES.map((c) => (
                  <SelectItem key={c.value} value={c.value}>
                    {c.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormField>

          <FormField
            label="Farm Size"
            htmlFor="farm-size"
            required
            error={errors.farmSize}
          >
            <div className="flex gap-2">
              <Input
                id="farm-size"
                type="number"
                min={0.1}
                step={0.1}
                placeholder="0.0"
                value={profile.farmSize || ""}
                onChange={(e) =>
                  updateProfile({ farmSize: parseFloat(e.target.value) || 0 })
                }
                className="flex-1"
              />
              <Select
                value={profile.farmSizeUnit}
                onValueChange={(v) =>
                  updateProfile({
                    farmSizeUnit: v as FarmProfile["farmSizeUnit"],
                  })
                }
              >
                <SelectTrigger className="w-28">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {FARM_SIZE_UNITS.map((u) => (
                    <SelectItem key={u.value} value={u.value}>
                      {u.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </FormField>

          <FormField label="Farming Stage" htmlFor="farming-stage" required>
            <Select
              value={profile.farmingStage}
              onValueChange={(v) =>
                updateProfile({
                  farmingStage: v as FarmProfile["farmingStage"],
                })
              }
            >
              <SelectTrigger id="farming-stage" className="w-full">
                <SelectValue placeholder="Select stage" />
              </SelectTrigger>
              <SelectContent>
                {FARMING_STAGES.map((s) => (
                  <SelectItem key={s.value} value={s.value}>
                    {s.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormField>

          <Button
            type="submit"
            className="w-full mt-2"
            size="lg"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                Loading…
              </>
            ) : (
              <>
                Get Forecast
                <ChevronRight className="size-4" />
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
