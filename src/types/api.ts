export interface ApiResponse<T> {
  data: T;
  success: boolean;
  error?: string;
}

export interface ApiError {
  message: string;
  code?: string;
  status?: number;
}

export type LoadingState = "idle" | "loading" | "success" | "error";
