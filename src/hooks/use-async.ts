"use client";

import { useState, useCallback } from "react";
import { LoadingState } from "@/types";

interface AsyncState<T> {
  data: T | null;
  state: LoadingState;
  error: string | null;
}

export function useAsync<T>() {
  const [asyncState, setAsyncState] = useState<AsyncState<T>>({
    data: null,
    state: "idle",
    error: null,
  });

  const execute = useCallback(async (promise: Promise<T>) => {
    setAsyncState({ data: null, state: "loading", error: null });
    try {
      const data = await promise;
      setAsyncState({ data, state: "success", error: null });
      return data;
    } catch (err) {
      const message = err instanceof Error ? err.message : "An error occurred";
      setAsyncState({ data: null, state: "error", error: message });
      throw err;
    }
  }, []);

  return { ...asyncState, execute };
}
