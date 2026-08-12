"use client";

import { motion } from "framer-motion";
import { format, parseISO } from "date-fns";
import { BedDouble } from "lucide-react";
import type { ReactNode } from "react";
import type { ItineraryDay } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { TimeSlot } from "./time-slot";

interface DayCardProps {
  day: ItineraryDay;
}

export function DayCard({ day }: DayCardProps): ReactNode {
  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="rounded-2xl border border-border bg-sand/60 p-4 md:p-6"
    >
      <header className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="flex size-11 shrink-0 flex-col items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <span className="text-[10px] leading-none opacity-80">DAY</span>
            <span className="text-base leading-tight font-semibold">
              {day.dayNumber}
            </span>
          </span>
          <div className="min-w-0">
            <h3 className="truncate text-lg font-semibold">{day.theme}</h3>
            <p className="text-sm text-muted-foreground">
              {format(parseISO(day.date), "EEEE, d MMMM")}
            </p>
          </div>
        </div>
        {day.dailyBudgetEstimate ? (
          <Badge variant="secondary" className="rounded-full">
            {day.dailyBudgetEstimate}
          </Badge>
        ) : null}
      </header>

      <div className="grid gap-3 lg:grid-cols-3">
        <TimeSlot name="morning" slot={day.morning} />
        <TimeSlot name="afternoon" slot={day.afternoon} />
        <TimeSlot name="evening" slot={day.evening} />
      </div>

      {day.accommodation ? (
        <div className="mt-3 flex flex-wrap items-center justify-between gap-2 rounded-xl border border-border bg-card px-4 py-3">
          <span className="flex items-center gap-2 text-sm font-medium">
            <BedDouble className="size-4 text-accent" />
            {day.accommodation.suggestion}
          </span>
          {day.accommodation.estimatedCost ? (
            <span className="text-sm text-muted-foreground">
              {day.accommodation.estimatedCost} / night
            </span>
          ) : null}
        </div>
      ) : null}
    </motion.section>
  );
}
