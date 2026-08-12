export const BUDGETS = ["BUDGET", "MODERATE", "LUXURY"] as const;
export const MODES = ["RELAXED", "MODERATE", "ADVENTUROUS", "LUXURY"] as const;
export const INTERESTS = [
  "BEACHES", "HIKING", "CULTURE", "FOOD", "NIGHTLIFE",
  "SHOPPING", "NATURE", "HISTORY", "ART", "WELLNESS",
] as const;
export const ACCOMMODATIONS = ["HOSTEL", "HOTEL", "RESORT", "AIRBNB", "CAMPING"] as const;

export const MAX_INTERESTS = 5;

export type Budget = (typeof BUDGETS)[number];
export type Mode = (typeof MODES)[number];
export type Interest = (typeof INTERESTS)[number];
export type Accommodation = (typeof ACCOMMODATIONS)[number];

export const BUDGET_LABELS: Record<Budget, string> = {
  BUDGET: "Budget", MODERATE: "Mid-range", LUXURY: "Luxury",
};
export const BUDGET_HINTS: Record<Budget, string> = {
  BUDGET: "Hostels, street food, public transport",
  MODERATE: "Comfortable stays and a few splurges",
  LUXURY: "Premium hotels, private transfers, fine dining",
};

export const MODE_LABELS: Record<Mode, string> = {
  RELAXED: "Relaxed", MODERATE: "Moderate", ADVENTUROUS: "Adventurous", LUXURY: "Luxury",
};
export const MODE_HINTS: Record<Mode, string> = {
  RELAXED: "One or two activities a day, lots of downtime",
  MODERATE: "A balanced pace with room to wander",
  ADVENTUROUS: "Packed days, early starts, more ground covered",
  LUXURY: "Slow, curated, high-touch experiences",
};

export const ACCOMMODATION_LABELS: Record<Accommodation, string> = {
  HOSTEL: "Hostel", HOTEL: "Hotel", RESORT: "Resort", AIRBNB: "Airbnb", CAMPING: "Camping",
};
export const ACCOMMODATION_HINTS: Record<Accommodation, string> = {
  HOSTEL: "Social, low cost, shared spaces",
  HOTEL: "Private rooms with daily service",
  RESORT: "All-in-one with on-site amenities",
  AIRBNB: "Whole homes, kitchens, local streets",
  CAMPING: "Outdoors, minimal, close to nature",
};

export const INTEREST_LABELS: Record<Interest, string> = {
  BEACHES: "Beaches", HIKING: "Hiking", CULTURE: "Culture", FOOD: "Food",
  NIGHTLIFE: "Nightlife", SHOPPING: "Shopping", NATURE: "Nature",
  HISTORY: "History", ART: "Art", WELLNESS: "Wellness",
};