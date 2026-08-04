const BASE_URL = import.meta.env.VITE_API_URL ?? ''

export async function generateItinerary(payload) {
  const res = await fetch(`${BASE_URL}/api/v1/itinerary/generate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })

  const json = await res.json()

  if (!json.success) {
    const message = json.error?.fieldErrors
      ? Object.values(json.error.fieldErrors).join(', ')
      : json.message ?? 'Something went wrong'
    throw new Error(message)
  }

  return json.data
}

export const ENUMS = {
  budget: ['BUDGET', 'MODERATE', 'LUXURY'],
  mode: ['RELAXED', 'MODERATE', 'ADVENTUROUS', 'LUXURY'],
  interests: ['BEACHES', 'HIKING', 'CULTURE', 'FOOD', 'NIGHTLIFE', 'SHOPPING', 'NATURE', 'HISTORY', 'ART', 'WELLNESS'],
  accommodation: ['HOSTEL', 'HOTEL', 'RESORT', 'AIRBNB', 'CAMPING'],
}

export const LABELS = {
  budget: { BUDGET: 'Budget', MODERATE: 'Mid-range', LUXURY: 'Luxury' },
  mode: { RELAXED: 'Relaxed', MODERATE: 'Moderate', ADVENTUROUS: 'Adventurous', LUXURY: 'Luxury' },
  accommodation: { HOSTEL: 'Hostel', HOTEL: 'Hotel', RESORT: 'Resort', AIRBNB: 'Airbnb', CAMPING: 'Camping' },
}