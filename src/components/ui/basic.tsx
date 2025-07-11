import { type VariantProps, cva } from "class-variance-authority";
import type * as React from "react";

import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-full text-sm [&>.chip-content]:px-2 [&>.chip-content]:py-0.5 [&>.chip-content]:rounded-full gap-2",
  {
    variants: {
      variant: {
        include:
          "bg-primary-600/5 text-primary-700 [&>.chip-content]:bg-primary-700 [&>.chip-content]:text-primary-50",
        exclude:
          "bg-neutral-950/5 text-neutral-700 [&>.chip-content]:bg-neutral-700 [&>.chip-content]:text-neutral-50",
      }
    }
  }
)

function Basic({
  className,
  variant = "include",
  asChild = false,
  label,
  children = "content",
  ...props
}:React.ComponentProps<"span"> &
VariantProps<typeof badgeVariants> & { asChild?: boolean; label?: string }) {

  const Comp = asChild ? Slot : "span";
  return (
    <Comp
      className={cn(badgeVariants({ variant }), className)}
    >
      {label && <span className="pl-2">{label}</span>}
      <span className="chip-content flex items-center justify-center">
      {children}
      </span>
      </Comp>
  );
}

export { Basic };
