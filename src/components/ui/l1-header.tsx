import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import { Button } from "./button";

interface L1HeaderProps {
  h1: string;
  className?: string;
}

export function L1Header({ h1, className }: L1HeaderProps) {
  return (
    <header
      className={cn(
        "flex w-full items-center justify-between border-b p-4",
        className,
      )}
    >
      <span>
        <h1 className="leading-7tracking-tight text text-xl font-semibold">
          {h1}
        </h1>
      </span>
      <Button variant="primary" size="sm">
        Create Campaign
      </Button>
    </header>
  );
}
