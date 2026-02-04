import * as React from "react";

import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "file:text-zinc-50 placeholder:text-zinc-400 selection:bg-zinc-50 selection:text-zinc-950 dark:bg-zinc-950/30 border-zinc-800 flex h-9 w-full min-w-0 rounded-full border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-zinc-300 focus-visible:ring-zinc-300/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-red-900/20 dark:aria-invalid:ring-red-900/40 aria-invalid:border-red-900",
        className,
      )}
      {...props}
    />
  );
}

export { Input };
