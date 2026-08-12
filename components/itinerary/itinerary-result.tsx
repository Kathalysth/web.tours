"use client";

import { motion } from "framer-motion";
import { format, parseISO } from "date-fns";
import { ArrowLeft, Sparkle } from "lucide-react";
import type { ReactNode } from "react";
import type { Itinerary } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DayCard } from "./day-card";
import { HeroGallery } from "./hero-gallery";
import { PracticalInfo } from "./practical-info";

interface ItineraryResultProps {
  data: Itinerary;
  onReset: () => void;
}

export function ItineraryResult({
  data,
  onReset,
}: ItineraryResultProps): ReactNode {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col gap-6"
    >
      <HeroGallery
        photos={data.destinationPhotos}
        destination={data.destination}
      />

      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="min-w-0">
          <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
            {data.destination}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {data.duration} days · {data.travelers} traveller
            {data.travelers === 1 ? "" : "s"} ·{" "}
            {data?.startDate
              ? format(parseISO(data.startDate), "d MMMM yyyy")
              : null}
          </p>
        </div>
        <Button variant="outline" onClick={onReset} className="rounded-xl">
          <ArrowLeft className="size-4" />
          New trip
        </Button>
      </div>

      {data.summary ? (
        <p className="max-w-3xl text-base leading-relaxed text-muted-foreground">
          {data.summary}
        </p>
      ) : null}

      {data.highlights && data.highlights.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {data.highlights.map((highlight) => (
            <Badge
              key={highlight}
              variant="secondary"
              className="gap-1.5 rounded-full px-3 py-1"
            >
              <Sparkle className="size-3 text-primary" />
              {highlight}
            </Badge>
          ))}
        </div>
      ) : null}

      {data.totalEstimatedBudget ? (
        <div className="rounded-xl border border-primary/25 bg-primary/5 px-4 py-3 text-sm">
          Total estimated budget:{" "}
          <strong className="font-semibold">{data.totalEstimatedBudget}</strong>
        </div>
      ) : null}

      <div className="flex flex-col gap-4">
        {data.days?.map((day) => (
          <DayCard key={day.dayNumber} day={day} />
        ))}
      </div>

      <PracticalInfo info={data.practicalInfo} />

      <p className="text-center text-xs text-muted-foreground">
        Generated in {(data.generationTimeMs / 1000).toFixed(1)}s
      </p>
    </motion.div>
  );
}
