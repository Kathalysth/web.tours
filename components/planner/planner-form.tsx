"use client";

import { useMemo, useState, type FormEvent, type ReactNode } from "react";
import { addDays, format, parseISO, startOfDay } from "date-fns";
import { MapPin, Sparkles } from "lucide-react";
import {
  ACCOMMODATIONS,
  ACCOMMODATION_HINTS,
  ACCOMMODATION_LABELS,
  BUDGETS,
  BUDGET_HINTS,
  BUDGET_LABELS,
  INTERESTS,
  INTEREST_LABELS,
  MAX_INTERESTS,
  MODES,
  MODE_HINTS,
  MODE_LABELS,
  type Accommodation,
  type Budget,
  type Interest,
  type Mode,
} from "@/lib/constants";
import type { ItineraryRequest } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  OptionList,
  ResponsivePicker,
  type PickerOption,
} from "./responsive-picker";
import { StepperField } from "./stepper-field";

const TOMORROW = startOfDay(addDays(new Date(), 1));
const ISO_DATE = "yyyy-MM-dd";

const BUDGET_OPTIONS: readonly PickerOption<Budget>[] = BUDGETS.map(
  (value) => ({
    value,
    label: BUDGET_LABELS[value],
    hint: BUDGET_HINTS[value],
  }),
);
const MODE_OPTIONS: readonly PickerOption<Mode>[] = MODES.map((value) => ({
  value,
  label: MODE_LABELS[value],
  hint: MODE_HINTS[value],
}));
const ACCOMMODATION_OPTIONS: readonly PickerOption<Accommodation>[] =
  ACCOMMODATIONS.map((value) => ({
    value,
    label: ACCOMMODATION_LABELS[value],
    hint: ACCOMMODATION_HINTS[value],
  }));
const INTEREST_OPTIONS: readonly PickerOption<Interest>[] = INTERESTS.map(
  (value) => ({
    value,
    label: INTEREST_LABELS[value],
  }),
);

interface PlannerFormProps {
  loading: boolean;
  onSubmit: (payload: ItineraryRequest) => void;
}

export function PlannerForm({
  loading,
  onSubmit,
}: PlannerFormProps): ReactNode {
  const [form, setForm] = useState<ItineraryRequest>({
    destination: "",
    duration: 5,
    travelers: 2,
    budget: "MODERATE",
    mode: "ADVENTUROUS",
    interests: ["CULTURE", "FOOD"],
    accommodation: "HOTEL",
    startDate: format(TOMORROW, ISO_DATE),
  });

  function set<K extends keyof ItineraryRequest>(
    key: K,
    value: ItineraryRequest[K],
  ): void {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function toggleInterest(interest: Interest): void {
    setForm((current) => {
      if (current.interests.includes(interest)) {
        return {
          ...current,
          interests: current.interests.filter((i) => i !== interest),
        };
      }
      if (current.interests.length >= MAX_INTERESTS) return current;
      return { ...current, interests: [...current.interests, interest] };
    });
  }

  const interestSummary = useMemo(
    () => form.interests.map((i) => INTEREST_LABELS[i]).join(", "),
    [form.interests],
  );

  const canSubmit =
    form.destination.trim().length > 0 && form.interests.length > 0 && !loading;

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    if (!canSubmit) return;
    onSubmit({ ...form, destination: form.destination.trim() });
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <Label htmlFor="destination">Where are you going?</Label>
        <div className="relative">
          <MapPin className="absolute top-1/2 left-4 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            id="destination"
            value={form.destination}
            onChange={(event) => set("destination", event.target.value)}
            placeholder="Bali, Indonesia"
            autoComplete="off"
            className="h-14 rounded-xl bg-card pl-11 text-base md:text-lg"
            required
          />
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <StepperField
          label="Duration"
          value={form.duration}
          min={1}
          max={30}
          suffix="days"
          onChange={(value) => set("duration", value)}
        />
        <StepperField
          label="Travelers"
          value={form.travelers}
          min={1}
          max={20}
          suffix="people"
          onChange={(value) => set("travelers", value)}
        />

        <ResponsivePicker
          label="Start date"
          description="Trips can start from tomorrow onwards."
          triggerValue={format(parseISO(form.startDate), "EEE d MMM yyyy")}
        >
          <div className="flex justify-center">
            <Calendar
              mode="single"
              selected={parseISO(form.startDate)}
              disabled={{ before: TOMORROW }}
              onSelect={(date) => {
                if (date) set("startDate", format(date, ISO_DATE));
              }}
            />
          </div>
        </ResponsivePicker>

        <ResponsivePicker
          label="Budget"
          description="Sets the price bracket for stays, food and activities."
          triggerValue={BUDGET_LABELS[form.budget]}
        >
          <OptionList
            options={BUDGET_OPTIONS}
            isSelected={(value) => form.budget === value}
            onSelect={(value) => set("budget", value)}
          />
        </ResponsivePicker>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <ResponsivePicker
          label="Travel style"
          description="How full should each day feel?"
          triggerValue={MODE_LABELS[form.mode]}
        >
          <OptionList
            options={MODE_OPTIONS}
            isSelected={(value) => form.mode === value}
            onSelect={(value) => set("mode", value)}
          />
        </ResponsivePicker>

        <ResponsivePicker
          label="Accommodation"
          description="Where you'd like to sleep each night."
          triggerValue={ACCOMMODATION_LABELS[form.accommodation]}
        >
          <OptionList
            options={ACCOMMODATION_OPTIONS}
            isSelected={(value) => form.accommodation === value}
            onSelect={(value) => set("accommodation", value)}
          />
        </ResponsivePicker>

        <ResponsivePicker
          label={`Interests (${form.interests.length}/${MAX_INTERESTS})`}
          description={`Pick up to ${MAX_INTERESTS}. These shape what each day is built around.`}
          triggerValue={interestSummary || "Choose at least one"}
        >
          <div onClick={(event) => event.stopPropagation()}>
            <OptionList
              options={INTEREST_OPTIONS}
              isSelected={(value) => form.interests.includes(value)}
              isDisabled={(value) =>
                !form.interests.includes(value) &&
                form.interests.length >= MAX_INTERESTS
              }
              onSelect={toggleInterest}
            />
          </div>
        </ResponsivePicker>
      </div>

      <Button
        type="submit"
        size="lg"
        disabled={!canSubmit}
        className="mt-2 h-14 w-full rounded-xl text-base"
      >
        <Sparkles className="size-4" />
        {loading ? "Planning your trip…" : "Plan my trip"}
      </Button>
    </form>
  );
}
