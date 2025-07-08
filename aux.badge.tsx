import { Slot } from "@radix-ui/react-slot";
import { type VariantProps, cva } from "class-variance-authority";
import type * as React from "react";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-md border [&>.badge-content]:px-2 [&>.badge-content]:py-0.5 rounded-full [&>.badge-content]:rounded-full text-sm font-medium w-fit whitespace-nowrap shrink-0 [&>span>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden",
  {
    variants: {
      variant: {
        include:
          "bg-primary-600/5 text-primary-700 [&>.badge-content]:bg-primary-700 [&>.badge-content]:text-primary-50",
        exclude:
          "bg-neutral-950/5 text-neutral-700 [&>.badge-content]:bg-neutral-700 [&>.badge-content]:text-neutral-50",
        
      },
    },
    defaultVariants: {
      variant: "include",
    },
  },
);

function Badge({
  className,
  variant,
  asChild = false,
  label,
  children,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean; label?: string }) {
  const Comp = asChild ? Slot : "span";

  return (
      <Comp
        data-slot="badge"
        className={cn(badgeVariants({ variant }), className)}
        {...props}
      >
        {label && <span className="pl-2">{label}</span>}
        <span className="badge-content flex items-center justify-center">
            {children}
        </span>
      </Comp>
  );
}

export { Badge, badgeVariants };

