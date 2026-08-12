"use client";

import { useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, ChevronDown } from "lucide-react";
import { useIsDesktop } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

export interface PickerOption<T extends string> {
  value: T;
  label: string;
  hint?: string;
}

interface ResponsivePickerProps<T extends string> {
  label: string;
  description: string;
  options: readonly PickerOption<T>[];
  triggerValue: string;
  children: ReactNode;
}

export function ResponsivePicker<T extends string>({
  label,
  description,
  triggerValue,
  children,
}: Omit<ResponsivePickerProps<T>, "options">): ReactNode {
  const isDesktop = useIsDesktop();
  const [open, setOpen] = useState<boolean>(false);

  const trigger = (
    <button
      type="button"
      onClick={() => setOpen(true)}
      className="group flex w-full items-center justify-between rounded-xl border border-input bg-card px-4 py-3 text-left transition-colors hover:border-primary/40 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
    >
      <span className="min-w-0">
        <span className="block text-xs font-medium tracking-wide text-muted-foreground uppercase">
          {label}
        </span>
        <span className="mt-0.5 block truncate text-sm font-medium">
          {triggerValue}
        </span>
      </span>
      <ChevronDown className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-y-0.5" />
    </button>
  );

  if (isDesktop) {
    return (
      <>
        {trigger}
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>{label}</DialogTitle>
              <DialogDescription>{description}</DialogDescription>
            </DialogHeader>
            <div onClick={() => setOpen(false)}>{children}</div>
          </DialogContent>
        </Dialog>
      </>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      {trigger}
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>{label}</DrawerTitle>
          <DrawerDescription>{description}</DrawerDescription>
        </DrawerHeader>
        <div className="max-h-[60vh] overflow-y-auto px-4 pb-2">{children}</div>
        <DrawerFooter>
          <Button variant="secondary" onClick={() => setOpen(false)}>
            Done
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

interface OptionListProps<T extends string> {
  options: readonly PickerOption<T>[];
  isSelected: (value: T) => boolean;
  isDisabled?: (value: T) => boolean;
  onSelect: (value: T) => void;
}

export function OptionList<T extends string>({
  options,
  isSelected,
  isDisabled,
  onSelect,
}: OptionListProps<T>): ReactNode {
  return (
    <ul className="flex flex-col gap-2">
      {options.map((option) => {
        const selected = isSelected(option.value);
        const disabled = isDisabled?.(option.value) ?? false;

        return (
          <li key={option.value}>
            <button
              type="button"
              disabled={disabled}
              onClick={() => onSelect(option.value)}
              className={cn(
                "flex w-full items-center justify-between gap-3 rounded-xl border px-4 py-3 text-left transition-colors",
                selected
                  ? "border-primary bg-primary/5"
                  : "border-border hover:bg-muted disabled:opacity-40 disabled:hover:bg-transparent",
              )}
            >
              <span className="min-w-0">
                <span className="block text-sm font-medium">
                  {option.label}
                </span>
                {option.hint ? (
                  <span className="mt-0.5 block text-xs text-muted-foreground">
                    {option.hint}
                  </span>
                ) : null}
              </span>
              <AnimatePresence initial={false}>
                {selected ? (
                  <motion.span
                    initial={{ opacity: 0, scale: 0.7 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.7 }}
                    transition={{ duration: 0.15, ease: [0.22, 1, 0.36, 1] }}
                    className="flex size-5 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground"
                  >
                    <Check className="size-3" />
                  </motion.span>
                ) : null}
              </AnimatePresence>
            </button>
          </li>
        );
      })}
    </ul>
  );
}
