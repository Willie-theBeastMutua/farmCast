import axios, { AxiosError, AxiosInstance } from "axios";
import { env } from "@/lib/env";
import type { ApiError } from "@/types";

function normalizeError(err: AxiosError): ApiError {
  const status = err.response?.status;
  const data = err.response?.data as Record<string, unknown> | undefined;
  const message =
    (typeof data?.message === "string" ? data.message : undefined) ??
    (typeof data?.error === "string" ? data.error : undefined) ??
    err.message ??
    "An unexpected error occurred";

  return { message, status };
}

const instance: AxiosInstance = axios.create({
  baseURL: env.apiBaseUrl || "",
  headers: { "Content-Type": "application/json" },
  timeout: 15_000,
});

instance.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => Promise.reject(normalizeError(error))
);

export const httpClient = {
  get: <T>(path: string, params?: Record<string, string | number | boolean | undefined>) =>
    instance.get<T>(path, { params }).then((res) => res.data),

  post: <T>(path: string, data?: unknown) =>
    instance.post<T>(path, data).then((res) => res.data),
};
