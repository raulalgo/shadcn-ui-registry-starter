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
        sky: "bg-sky-600/5 text-sky-700 [&>.chip-content]:bg-sky-700 [&>.chip-content]:text-sky-50",
        green:
          "bg-green-600/5 text-green-700 [&>.chip-content]:bg-green-700 [&>.chip-content]:text-green-50",
        yellow:
          "bg-yellow-600/5 text-yellow-700 [&>.chip-content]:bg-yellow-700 [&>.chip-content]:text-yellow-50",
        lime: "bg-lime-600/5 text-lime-700 [&>.chip-content]:bg-lime-700 [&>.chip-content]:text-lime-50",
        orange:
          "bg-orange-600/5 text-orange-700 [&>.chip-content]:bg-orange-700 [&>.chip-content]:text-orange-50",
        blue: "bg-blue-600/5 text-blue-700 [&>.chip-content]:bg-blue-700 [&>.chip-content]:text-blue-50",
        pink: "bg-pink-600/5 text-pink-700 [&>.chip-content]:bg-pink-700 [&>.chip-content]:text-pink-50",
        brown:
          "bg-brown-600/5 text-brown-700 [&>.chip-content]:bg-brown-700 [&>.chip-content]:text-brown-50",
        purple:
          "bg-purple-600/5 text-purple-700 [&>.chip-content]:bg-purple-700 [&>.chip-content]:text-purple-50",
      },
      inverted: {
        true: "",
        false: "",
      },
    },
    compoundVariants: [
      // Inverted variants that swap colors
      {
        variant: "include",
        inverted: true,
        class:
          "bg-primary-700 text-primary-50 [&>.chip-content]:bg-primary-100 [&>.chip-content]:text-primary-700",
      },
      {
        variant: "exclude",
        inverted: true,
        class:
          "bg-neutral-700 text-neutral-50 [&>.chip-content]:bg-neutral-100 [&>.chip-content]:text-neutral-700",
      },
      {
        variant: "primary",
        inverted: true,
        class:
          "bg-primary-700 text-primary-50 [&>.chip-content]:bg-primary-100 [&>.chip-content]:text-primary-700",
      },
      {
        variant: "neutral",
        inverted: true,
        class:
          "bg-neutral-700 text-neutral-50 [&>.chip-content]:bg-neutral-100 [&>.chip-content]:text-neutral-700",
      },
      {
        variant: "pinkred",
        inverted: true,
        class:
          "bg-pinkred-700 text-pinkred-50 [&>.chip-content]:bg-pinkred-100 [&>.chip-content]:text-pinkred-700",
      },
      {
        variant: "sky",
        inverted: true,
        class:
          "bg-sky-700 text-sky-50 [&>.chip-content]:bg-sky-100 [&>.chip-content]:text-sky-700",
      },
      {
        variant: "green",
        inverted: true,
        class:
          "bg-green-700 text-green-50 [&>.chip-content]:bg-green-100 [&>.chip-content]:text-green-700",
      },
      {
        variant: "yellow",
        inverted: true,
        class:
          "bg-yellow-700 text-yellow-50 [&>.chip-content]:bg-yellow-100 [&>.chip-content]:text-yellow-700",
      },
      {
        variant: "lime",
        inverted: true,
        class:
          "bg-lime-700 text-lime-50 [&>.chip-content]:bg-lime-100 [&>.chip-content]:text-lime-700",
      },
      {
        variant: "orange",
        inverted: true,
        class:
          "bg-orange-700 text-orange-50 [&>.chip-content]:bg-orange-100 [&>.chip-content]:text-orange-700",
      },
      {
        variant: "blue",
        inverted: true,
        class:
          "bg-blue-700 text-blue-50 [&>.chip-content]:bg-blue-100 [&>.chip-content]:text-blue-700",
      },
      {
        variant: "pink",
        inverted: true,
        class:
          "bg-pink-700 text-pink-50 [&>.chip-content]:bg-pink-100 [&>.chip-content]:text-pink-700",
      },
      {
        variant: "brown",
        inverted: true,
        class:
          "bg-brown-700 text-brown-50 [&>.chip-content]:bg-brown-100 [&>.chip-content]:text-brown-700",
      },
      {
        variant: "purple",
        inverted: true,
        class:
          "bg-purple-700 text-purple-50 [&>.chip-content]:bg-purple-100 [&>.chip-content]:text-purple-700",
      },
    ],
  },
);

function Badge({
  className,
  variant = "include",
  inverted = false,
  asChild = false,
  label,
  children = "content",
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean; label?: string }) {
  const Comp = asChild ? Slot : "span";
  return (
    <Comp className={cn(badgeVariants({ variant, inverted }), className)}>
      {label && <span className="pl-2">{label}</span>}
      <span className="chip-content flex items-center justify-center">
        {children}
      </span>
    </Comp>
  );
}

export { Badge };
