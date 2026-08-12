"use client";

import { Minus, Plus } from "lucide-react";
import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";

interface StepperFieldProps {
  label: string;
  value: number;
  min: number;
  max: number;
  suffix: string;
  onChange: (value: number) => void;
}

export function StepperField({
  label,
  value,
  min,
  max,
  suffix,
  onChange,
}: StepperFieldProps): ReactNode {
  const clamp = (next: number): number => Math.min(max, Math.max(min, next));

  return (
    <div className="rounded-xl border border-input bg-card px-4 py-3">
      <span className="block text-xs font-medium tracking-wide text-muted-foreground uppercase">
        {label}
      </span>
      <div className="mt-1 flex items-center justify-between gap-2">
        <Button
          type="button"
          variant="outline"
          size="icon"
          className="size-8 rounded-full"
          aria-label={`Decrease ${label}`}
          disabled={value <= min}
          onClick={() => onChange(clamp(value - 1))}
        >
          <Minus className="size-4" />
        </Button>
        <span className="text-sm font-medium tabular-nums">
          {value} {suffix}
        </span>
        <Button
          type="button"
          variant="outline"
          size="icon"
          className="size-8 rounded-full"
          aria-label={`Increase ${label}`}
          disabled={value >= max}
          onClick={() => onChange(clamp(value + 1))}
        >
          <Plus className="size-4" />
        </Button>
      </div>
    </div>
  );
}
