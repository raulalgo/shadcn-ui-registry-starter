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
        primary:
          "bg-primary-600/5 text-primary-700 [&>.chip-content]:bg-primary-700 [&>.chip-content]:text-primary-50",
        neutral:
          "bg-neutral-600/5 text-neutral-700 [&>.chip-content]:bg-neutral-700 [&>.chip-content]:text-neutral-50",
        pinkred:
          "bg-pinkred-600/5 text-pinkred-700 [&>.chip-content]:bg-pinkred-700 [&>.chip-content]:text-pinkred-50",
        sky:
          "bg-sky-600/5 text-sky-700 [&>.chip-content]:bg-sky-700 [&>.chip-content]:text-sky-50",
        green:
          "bg-green-600/5 text-green-700 [&>.chip-content]:bg-green-700 [&>.chip-content]:text-green-50",
        yellow:
          "bg-yellow-600/5 text-yellow-700 [&>.chip-content]:bg-yellow-700 [&>.chip-content]:text-yellow-50",
        lime:
          "bg-lime-600/5 text-lime-700 [&>.chip-content]:bg-lime-700 [&>.chip-content]:text-lime-50",
        orange:
          "bg-orange-600/5 text-orange-700 [&>.chip-content]:bg-orange-700 [&>.chip-content]:text-orange-50",
        blue:
          "bg-blue-600/5 text-blue-700 [&>.chip-content]:bg-blue-700 [&>.chip-content]:text-blue-50",
        pink:
          "bg-pink-600/5 text-pink-700 [&>.chip-content]:bg-pink-700 [&>.chip-content]:text-pink-50",
        brown:
          "bg-brown-600/5 text-brown-700 [&>.chip-content]:bg-brown-700 [&>.chip-content]:text-brown-50",
        purple:
          "bg-purple-600/5 text-purple-700 [&>.chip-content]:bg-purple-700 [&>.chip-content]:text-purple-50",
      }
    }
  }
)

function Badge({
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

export { Badge };
