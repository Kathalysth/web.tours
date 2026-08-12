"use client";

import { useCallback, useState } from "react";
import { generateItinerary } from "@/lib/api";
import type { Itinerary, ItineraryRequest } from "@/lib/types";

interface UseItineraryResult {
  data: Itinerary | null;
  loading: boolean;
  error: string | null;
  submit: (payload: ItineraryRequest) => Promise<void>;
  reset: () => void;
}

export function useItinerary(): UseItineraryResult {
  const [data, setData] = useState<Itinerary | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const submit = useCallback(
    async (payload: ItineraryRequest): Promise<void> => {
      setLoading(true);
      setError(null);
      setData(null);
      try {
        setData(await generateItinerary(payload));
      } catch (cause) {
        setError(
          cause instanceof Error ? cause.message : "Something went wrong.",
        );
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  const reset = useCallback((): void => {
    setData(null);
    setError(null);
  }, []);

  return { data, loading, error, submit, reset };
}
