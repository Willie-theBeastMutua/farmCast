"use client";

import { useCallback, useRef, useState } from "react";
import { Upload, X, ImageIcon, Loader2, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface AnalysisResult {
  vegetationCoverage: string;
  fieldCondition: string;
  observations: string[];
}

export function ImageUpload() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const handleFile = useCallback((f: File) => {
    if (!f.type.startsWith("image/")) return;
    if (preview) URL.revokeObjectURL(preview);
    setFile(f);
    setResult(null);
    setPreview(URL.createObjectURL(f));
  }, [preview]);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const f = e.dataTransfer.files[0];
      if (f) handleFile(f);
    },
    [handleFile]
  );

  function clearFile() {
    if (preview) URL.revokeObjectURL(preview);
    setFile(null);
    setPreview(null);
    setResult(null);
  }

  async function analyzeImage() {
    if (!file) return;
    setAnalyzing(true);
    await new Promise((res) => setTimeout(res, 1600));
    setResult({
      vegetationCoverage: "65–75%",
      fieldCondition: "Good",
      observations: [
        "Moderate vegetation density across the visible area",
        "No visible signs of water stress or wilting",
        "Field surface appears well-maintained with even crop spacing",
      ],
    });
    setAnalyzing(false);
  }

  return (
    <Card>
      <CardHeader className="border-b border-border/50 pb-4">
        <CardTitle className="flex items-center gap-2 text-sm font-semibold">
          <ImageIcon className="size-4 text-primary" />
          Field Image Analysis
          <span className="text-xs font-normal text-muted-foreground">(Optional)</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-5">
        {!file ? (
          <div
            role="button"
            tabIndex={0}
            className={cn(
              "flex cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed p-10 text-center transition-colors",
              isDragging
                ? "border-primary bg-primary/5"
                : "border-border hover:border-muted-foreground/40 hover:bg-muted/20"
            )}
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            onClick={() => inputRef.current?.click()}
            onKeyDown={(e) => e.key === "Enter" && inputRef.current?.click()}
          >
            <div className="flex size-10 items-center justify-center rounded-full bg-muted">
              <Upload className="size-4 text-muted-foreground" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">
                Drop a field photo here
              </p>
              <p className="mt-0.5 text-xs text-muted-foreground">
                or click to browse &middot; PNG, JPG up to 10 MB
              </p>
            </div>
            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              className="sr-only"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) handleFile(f);
              }}
            />
          </div>
        ) : (
          <div className="space-y-4">
            <div className="relative overflow-hidden rounded-xl border border-border">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={preview!}
                alt="Field preview"
                className="h-48 w-full object-cover"
              />
              <button
                onClick={clearFile}
                className="absolute right-2 top-2 flex size-7 items-center justify-center rounded-full bg-black/50 text-white transition-colors hover:bg-black/70"
                aria-label="Remove image"
              >
                <X className="size-3.5" />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <p className="max-w-[200px] truncate text-sm text-muted-foreground">
                {file.name}
              </p>
              <Button size="sm" onClick={analyzeImage} disabled={analyzing}>
                {analyzing ? (
                  <>
                    <Loader2 className="size-3.5 animate-spin" />
                    Analyzing…
                  </>
                ) : (
                  "Analyze Image"
                )}
              </Button>
            </div>

            {result && (
              <div className="space-y-3 rounded-xl border border-border bg-muted/30 p-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Analysis Results
                </p>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-xs text-muted-foreground">
                      Vegetation Coverage
                    </p>
                    <p className="text-sm font-semibold text-foreground">
                      {result.vegetationCoverage}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">
                      Field Condition
                    </p>
                    <p className="text-sm font-semibold text-foreground">
                      {result.fieldCondition}
                    </p>
                  </div>
                </div>
                <div>
                  <p className="mb-1.5 text-xs text-muted-foreground">
                    Observations
                  </p>
                  <ul className="space-y-1.5">
                    {result.observations.map((obs, i) => (
                      <li key={i} className="flex gap-2 text-xs text-foreground">
                        <CheckCircle2 className="mt-0.5 size-3.5 shrink-0 text-green-600" />
                        {obs}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
