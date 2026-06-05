import { ApiError } from "@/types";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "";

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const url = `${BASE_URL}${path}`;
  const res = await fetch(url, {
    headers: { "Content-Type": "application/json", ...options?.headers },
    ...options,
  });

  if (!res.ok) {
    const error: ApiError = {
      message: `Request failed: ${res.statusText}`,
      status: res.status,
    };
    throw error;
  }

  return res.json() as Promise<T>;
}

export const httpClient = {
  get: <T>(path: string, options?: RequestInit) =>
    request<T>(path, { method: "GET", ...options }),
  post: <T>(path: string, body: unknown, options?: RequestInit) =>
    request<T>(path, { method: "POST", body: JSON.stringify(body), ...options }),
};
