import * as React from "react";

import { cn } from "@/lib/utils";
import { Button } from "./button";
import { EllipsisVertical, MapPin } from "lucide-react";
import { Badge } from "./badge";
import { cva } from "class-variance-authority";

const cardVariants = cva(
  "flex flex-col rounded-xl border w-full max-w-lg p-2 gap-2 ",
  {
    variants: {
      variant: {
        default:
          "border-primary-600 border-dashed text-primary-600 font-medium hover:bg-primary-50",
        active:
          "bg-neutral-50 text-neutral-900 shadow-sm hover:border-primary-600",
        required:
          "bg-neutral-50 text-neutral-900 shadow-sm hover:border-primary-600",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

function DealRow({ children }: { children: React.ReactNode }) {
  return (
    <div className="group flex min-h-8 w-full flex-row-reverse items-center justify-between gap-2 rounded-sm">
      {children}
      <Button variant="ghost" size="sm" className="hidden group-hover:block">
        Add Objective
      </Button>
    </div>
  );
}

const defaultChildren = [
  <Badge label="City">Lisboa</Badge>,
  <Badge>Port</Badge>,
  <Badge>Aveiro</Badge>,
  <Badge>Braga</Badge>,
  <Badge>Faro</Badge>,
  <Badge>Coimbra</Badge>,
];

function isEmptyChildren(children: React.ReactNode) {
  // Returns true if children is null, undefined, false, or an empty array
  if (children == null || children === false) return true;
  if (Array.isArray(children) && children.length === 0) return true;
  // If children is an array, check if all elements are falsy
  if (Array.isArray(children) && children.every((child) => !child)) return true;
  return false;
}

function DealCard({
  title = "Location",
  icon,
  children = defaultChildren,
  variant = isEmptyChildren(children) ? "default" : "active",
}: {
  title?: string;
  icon?: React.ReactNode;
  children?: React.ReactNode;
  variant?: "default" | "active" | "required";
}) {
  return (
    <div className={cn(cardVariants({ variant }))}>
      <div className="flex flex-row items-center gap-2">
        {icon || <MapPin className="h-4 w-4" />}
        <div className="grow p-0">{title}</div>
        {variant === "required" && (
          <span className="text-primary-600">Required</span>
        )}
        <Button variant="ghost" size="icon">
          <EllipsisVertical />
        </Button>
      </div>
      {variant === "active" && (
        <div className="px-4 py-0">
          {React.Children.map(children, (child, index) => (
            <DealRow key={index}>{child}</DealRow>
          ))}
        </div>
      )}
    </div>
  );
}

export { DealCard };
