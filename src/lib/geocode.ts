interface NominatimResult {
  lat: string;
  lon: string;
  display_name: string;
}

export interface GeoResult {
  lat: number;
  lon: number;
  displayName: string;
}

export async function geocodeLocation(location: string): Promise<GeoResult> {
  const url = new URL("https://nominatim.openstreetmap.org/search");
  url.searchParams.set("q", location);
  url.searchParams.set("format", "json");
  url.searchParams.set("limit", "1");

  const res = await fetch(url.toString(), {
    headers: { "User-Agent": "FarmCast/1.0 (willymathuva@gmail.com)" },
    next: { revalidate: 86400 }, // Cache geocoding results for 24 hours
  });

  if (!res.ok) {
    throw new Error(`Geocoding service unavailable (${res.status})`);
  }

  const results: NominatimResult[] = await res.json();

  if (!results.length) {
    throw new Error(`Location not found: "${location}"`);
  }

  return {
    lat: parseFloat(results[0].lat),
    lon: parseFloat(results[0].lon),
    displayName: results[0].display_name,
  };
}
