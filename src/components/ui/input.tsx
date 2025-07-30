import type * as React from "react";

import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const inputVariants = cva(
  "flex rounded-md border border-neutral-950/10 bg-neutral-50 shadow-xs transition-[color,box-shadow] outline-none file:text-neutral-800 placeholder:text-neutral-500 selection:bg-primary-200 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus-visible:border-ring focus-visible:ring-primary-600 focus-visible:ring-[1px] aria-invalid:border-pinkred-600 aria-invalid:ring-pinkred-600/20 dark:aria-invalid:ring-pinkred-600/40",
  {
    variants: {
      fit: {
        default: "px-3 py-2 text-base",
        sm: "px-2 py-1 text-sm",
      },
    },
    defaultVariants: {
      fit: "default",
    },
  },
);

function Input({
  className,
  type,
  fit,
  ...props
}: React.ComponentProps<"input"> &
  VariantProps<typeof inputVariants> & {
    fit?: "default" | "sm";
  }) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(inputVariants({ fit, className }))}
      {...props}
    />
  );
}

export { Input, inputVariants };
