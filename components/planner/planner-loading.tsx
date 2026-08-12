import type { ReactNode } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export function PlannerLoading({
  destination,
}: {
  destination: string;
}): ReactNode {
  return (
    <div className="flex flex-col gap-4" role="status" aria-live="polite">
      <div className="rounded-2xl border border-border bg-card p-6 text-center">
        <p className="text-lg font-medium">Mapping out {destination}…</p>
        <p className="mt-1 text-sm text-muted-foreground">
          This usually takes 15–30 seconds. Don&apos;t close the tab.
        </p>
      </div>
      <Skeleton className="h-56 w-full rounded-2xl" />
      <div className="grid gap-3 lg:grid-cols-3">
        <Skeleton className="h-48 rounded-xl" />
        <Skeleton className="h-48 rounded-xl" />
        <Skeleton className="h-48 rounded-xl" />
      </div>
    </div>
  );
}
