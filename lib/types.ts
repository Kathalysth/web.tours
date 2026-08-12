import type { Accommodation, Budget, Interest, Mode } from "./constants";

export interface ItineraryRequest {
  destination: string;
  duration: number;
  travelers: number;
  budget: Budget;
  mode: Mode;
  interests: Interest[];
  accommodation: Accommodation;
  startDate: string;
}

export interface Photo {
  id: string;
  alt: string | null;
  smallUrl: string;
  mediumUrl: string;
  largeUrl: string | null;
  photographer: string | null;
  photographerUrl: string | null;
}

export interface TimeSlotData {
  title: string;
  location: string;
  description: string;
  estimatedDuration: string;
  estimatedCost: string;
  tips: string | null;
  photos: Photo[] | null;
}

export interface DayAccommodation {
  suggestion: string;
  estimatedCost: string | null;
}

export interface ItineraryDay {
  dayNumber: number;
  date: string;
  theme: string;
  dailyBudgetEstimate: string | null;
  morning: TimeSlotData | null;
  afternoon: TimeSlotData | null;
  evening: TimeSlotData | null;
  accommodation: DayAccommodation | null;
}

export interface PracticalInfoData {
  currency: string | null;
  language: string | null;
  transportation: string | null;
  bestTimeToVisit: string | null;
  emergencyContacts: string | null;
  packingTips: string[] | null;
}

export interface Itinerary {
  destination: string;
  duration: number;
  travelers: number;
  startDate: string;
  summary: string | null;
  highlights: string[] | null;
  totalEstimatedBudget: string | null;
  destinationPhotos: Photo[] | null;
  days: ItineraryDay[] | null;
  practicalInfo: PracticalInfoData | null;
  generationTimeMs: number;
}

export interface ApiEnvelope {
  success: boolean;
  message?: string;
  data?: Itinerary;
  error?: { fieldErrors?: Record<string, string> };
}

export type SlotName = "morning" | "afternoon" | "evening";