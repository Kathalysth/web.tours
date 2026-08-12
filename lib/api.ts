import type { ApiEnvelope, Itinerary, ItineraryRequest } from "@/lib/types";

export async function generateItinerary(
  payload: ItineraryRequest,
): Promise<Itinerary> {
  const response = await fetch("/api/itinerary", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const json = (await response.json()) as ApiEnvelope;

  if (!json.success || !json.data) {
    const fieldErrors = json.error?.fieldErrors;
    throw new Error(
      fieldErrors
        ? Object.values(fieldErrors).join(", ")
        : (json.message ?? "Something went wrong. Please try again."),
    );
  }

  return json.data;
}
