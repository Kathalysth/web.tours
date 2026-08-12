"use client";

import { useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle, Plane } from "lucide-react";
import { useItinerary } from "@/hooks/use-itinerary";
import type { ItineraryRequest } from "@/lib/types";
import { ItineraryResult } from "@/components/itinerary/itinerary-result";
import { PlannerForm } from "@/components/planner/planner-form";
import { PlannerLoading } from "@/components/planner/planner-loading";

export default function HomePage(): ReactNode {
  const { data, loading, error, submit, reset } = useItinerary();
  const [pendingDestination, setPendingDestination] = useState<string>("");

  function handleSubmit(payload: ItineraryRequest): void {
    setPendingDestination(payload.destination);
    void submit(payload);
  }

  return (
    <div className="min-h-dvh bg-background">
      <header className="sticky top-0 z-40 border-b border-border/70 bg-background/80 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-6xl items-center gap-2 px-4 md:px-6">
          <Plane className="size-4 text-primary" />
          <span className="text-sm font-semibold tracking-tight">
            TripPlanner
          </span>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8 md:px-6 md:py-12">
        <AnimatePresence mode="wait">
          {data ? (
            <ItineraryResult key="result" data={data} onReset={reset} />
          ) : (
            <motion.div
              key="planner"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="mx-auto flex max-w-3xl flex-col gap-6"
            >
              <div className="text-center">
                <h1 className="text-3xl font-semibold tracking-tight text-balance md:text-5xl">
                  Plan your perfect trip
                </h1>
                <p className="mx-auto mt-3 max-w-lg text-base text-muted-foreground text-pretty">
                  Personalised, day-by-day itineraries built around how you
                  actually like to travel.
                </p>
              </div>

              {error ? (
                <div className="flex items-start gap-3 rounded-xl border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive">
                  <AlertCircle className="mt-0.5 size-4 shrink-0" />
                  <span>{error}</span>
                </div>
              ) : null}

              {loading ? (
                <PlannerLoading destination={pendingDestination} />
              ) : (
                <PlannerForm loading={loading} onSubmit={handleSubmit} />
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
