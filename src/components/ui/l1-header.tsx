import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import { Button } from "./button";

interface L1HeaderProps {
  h1: string;
  className?: string;
}

export function L1Header({ h1, className }: L1HeaderProps) {
  return (
    <header className={cn("w-full border-b p-2 flex justify-between items-center", className)}>
        <span>
          <h1 className="text-xl font-semibold leading-7tracking-tight text">{h1}</h1>
        </span>
        <Button variant="primary" size="sm">
            Create Campaign
        </Button>
    </header>
  );
} 