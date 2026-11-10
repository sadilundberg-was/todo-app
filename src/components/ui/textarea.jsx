import * as React from "react";
import { cn } from "@/utils/cn";

function Textarea({ className, ...props }) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "flex min-h-20 w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 shadow-xs placeholder:text-zinc-400 outline-none transition-[color,box-shadow] focus-visible:border-zinc-400 focus-visible:ring-[3px] focus-visible:ring-zinc-400/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-red-500 aria-invalid:ring-red-500/20",
        className,
      )}
      {...props}
    />
  );
}

export { Textarea };
