"use client";

import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check } from "lucide-react";
import { cn } from "@/utils/cn";

function Checkbox({ className, ...props }) {
  return (
    <CheckboxPrimitive.Root
      className={cn(
        "peer h-5 w-5 shrink-0 rounded border border-zinc-300 bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:border-zinc-900 data-[state=checked]:bg-zinc-900 data-[state=checked]:text-white",
        className,
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator className="flex items-center justify-center text-current">
        <Check className="h-3.5 w-3.5" strokeWidth={3} />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}

export { Checkbox };
