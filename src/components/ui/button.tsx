import { Slot } from "@radix-ui/react-slot";
import { type VariantProps, cva } from "class-variance-authority";
import type * as React from "react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        primary:
          "bg-primary-950 text-primary-50 shadow-sm hover:bg-primary-900/90 border border-primary-900/10",
        destructive:
          "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        default:
          "border bg-neutral-50 border-neutral-800/10 shadow-xs text-accent-foreground hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        medium:
          "bg-primary-600/5 text-primary-600 hover:bg-primary-600/10",
        ghost:
          "bg-transparent text-primary-600 hover:bg-primary-600/5",
        // secondary:
        //   "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80 border border-secondary-border border-opacity-10",
        // ghost:
        //   "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        // link: "text-key underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "p-1",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  leftIcon,
  rightIcon,
  iconOnly = false,
  children,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    iconOnly?: boolean;
    children?: React.ReactNode;
  }) {
  const Comp = asChild ? Slot : "button";

  let contents;
  if (iconOnly) {
    // Prefer leftIcon, then rightIcon, fallback to children if it's a single icon
    const icon = leftIcon || rightIcon || children;
    contents = <span className="flex items-center justify-center w-full h-full">{icon}</span>;
  } else {
    contents = (
      <>
        {leftIcon && <span className="shrink-0 mr-1.5">{leftIcon}</span>}
        {children}
        {rightIcon && <span className="shrink-0 ml-1.5">{rightIcon}</span>}
      </>
    );
  }

  // Add a square aspect ratio for iconOnly
  const iconOnlyClass = iconOnly ? "aspect-square p-0" : "";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }), iconOnlyClass)}
      aria-label={iconOnly && typeof children === "string" ? children : undefined}
      {...props}
    >
      {asChild ? <span className="inline-flex items-center w-full h-full">{contents}</span> : contents}
    </Comp>
  );
}

export { Button, buttonVariants };
