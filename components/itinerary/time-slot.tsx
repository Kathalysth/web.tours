// components/itinerary/time-slot.tsx
import Image from "next/image";
import type { ReactNode } from "react";
import { Clock, Lightbulb, MapPin, Wallet } from "lucide-react";
import type { SlotName, TimeSlotData } from "@/lib/types";

const SLOT_LABELS: Record<SlotName, string> = {
  morning: "Morning",
  afternoon: "Afternoon",
  evening: "Evening",
};
const SLOT_TIMES: Record<SlotName, string> = {
  morning: "07:00 – 12:00",
  afternoon: "12:00 – 17:00",
  evening: "17:00 – 23:00",
};

interface TimeSlotProps {
  name: SlotName;
  slot: TimeSlotData | null;
}

export function TimeSlot({ name, slot }: TimeSlotProps): ReactNode {
  if (!slot) return null;
  const photo = slot.photos?.[0] ?? null;

  return (
    <article className="flex flex-col overflow-hidden rounded-xl border border-border bg-card">
      {photo ? (
        <div className="relative aspect-[16/9]">
          <Image
            src={photo.mediumUrl}
            alt={photo.alt ?? slot.title}
            fill
            sizes="(min-width: 1024px) 33vw, 100vw"
            className="object-cover"
            unoptimized
          />
          {photo.photographer && photo.photographerUrl ? (
            <a
              href={photo.photographerUrl}
              target="_blank"
              rel="noreferrer"
              className="absolute right-2 bottom-2 rounded-full bg-background/80 px-2 py-0.5 text-[11px] text-muted-foreground backdrop-blur"
            >
              {photo.photographer}
            </a>
          ) : null}
        </div>
      ) : null}

      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex items-baseline justify-between gap-2">
          <span className="text-xs font-semibold tracking-wide text-primary uppercase">
            {SLOT_LABELS[name]}
          </span>
          <span className="text-xs text-muted-foreground tabular-nums">
            {SLOT_TIMES[name]}
          </span>
        </div>

        <h4 className="text-base leading-snug font-semibold">{slot.title}</h4>

        <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <MapPin className="size-3.5 shrink-0" />
          {slot.location}
        </p>
        <p className="text-sm leading-relaxed text-muted-foreground">
          {slot.description}
        </p>

        <div className="mt-auto flex flex-wrap gap-x-4 gap-y-1 pt-2 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Clock className="size-3.5" />
            {slot.estimatedDuration}
          </span>
          <span className="flex items-center gap-1">
            <Wallet className="size-3.5" />
            {slot.estimatedCost}
          </span>
        </div>

        {slot.tips ? (
          <p className="mt-1 flex gap-2 rounded-lg bg-secondary p-3 text-xs leading-relaxed text-secondary-foreground">
            <Lightbulb className="mt-0.5 size-3.5 shrink-0 text-primary" />
            {slot.tips}
          </p>
        ) : null}
      </div>
    </article>
  );
}
