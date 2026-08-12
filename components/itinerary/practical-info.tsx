import type { ReactNode } from "react";
import {
  CalendarDays,
  Coins,
  LifeBuoy,
  Languages,
  Luggage,
  Car,
} from "lucide-react";
import type { PracticalInfoData } from "@/lib/types";

interface PracticalInfoProps {
  info: PracticalInfoData | null;
}

export function PracticalInfo({ info }: PracticalInfoProps): ReactNode {
  if (!info) return null;

  const items = [
    { icon: Coins, label: "Currency", value: info.currency },
    { icon: Languages, label: "Language", value: info.language },
    { icon: Car, label: "Getting around", value: info.transportation },
    {
      icon: CalendarDays,
      label: "Best time to visit",
      value: info.bestTimeToVisit,
    },
    { icon: LifeBuoy, label: "Emergency", value: info.emergencyContacts },
  ].filter((item): item is typeof item & { value: string } =>
    Boolean(item.value),
  );

  if (items.length === 0 && !info.packingTips?.length) return null;

  return (
    <section className="rounded-2xl border border-border bg-dusk/50 p-4 md:p-6">
      <h3 className="mb-4 text-lg font-semibold">Practical info</h3>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {items.map(({ icon: Icon, label, value }) => (
          <div key={label} className="rounded-xl bg-card p-4">
            <span className="flex items-center gap-2 text-xs font-medium tracking-wide text-muted-foreground uppercase">
              <Icon className="size-3.5" />
              {label}
            </span>
            <p className="mt-1 text-sm">{value}</p>
          </div>
        ))}
      </div>

      {info.packingTips && info.packingTips.length > 0 ? (
        <div className="mt-3 rounded-xl bg-card p-4">
          <span className="flex items-center gap-2 text-xs font-medium tracking-wide text-muted-foreground uppercase">
            <Luggage className="size-3.5" />
            Packing tips
          </span>
          <ul className="mt-2 grid gap-1.5 sm:grid-cols-2">
            {info.packingTips.map((tip) => (
              <li
                key={tip}
                className="flex gap-2 text-sm text-muted-foreground"
              >
                <span className="text-primary">•</span>
                {tip}
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </section>
  );
}
