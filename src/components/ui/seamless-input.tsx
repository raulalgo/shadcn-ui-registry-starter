import { type VariantProps, cva } from "class-variance-authority";
import type * as React from "react";

import { cn } from "@/lib/utils";
import { Input } from "./input";

const seamlessInputVariants = cva(
  "border border-transparent bg-transparent shadow-none focus-visible:ring-0 px-2 py-1 w-full",
  {
    variants: {
      fit: {
        default: "text-sm",
        large:
          "!text-lg placeholder:text-lg font-semibold text-neutral-900 hover:border-neutral-300",
      },
    },
  },
);

interface SeamlessInputProps
  extends React.ComponentProps<"input">,
    VariantProps<typeof seamlessInputVariants> {
  placeholder?: string;
  value?: string;
}

export function SeamlessInput({
  className,
  fit = "large",
  placeholder = "Search...",
  value,
  ...props
}: SeamlessInputProps) {
  return (
    <Input
      className={cn(seamlessInputVariants({ fit, className }))}
      placeholder={placeholder}
      value={value}
      {...props}
    />
  );
}

export { seamlessInputVariants };
