import * as React from "react";
import { Card } from "./card";
import { Button } from "./button";
import { X, ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ActionPanelProps {
  onClose?: () => void;
  onBack?: () => void;
  title?: string;
  subtitle?: string;
  onCancel?: () => void;
  onConfirm?: () => void;
  children?: React.ReactNode;
}

export function ActionPanel({
  onClose,
  onBack,
  title = "Action Panel",
  subtitle = "",
  onCancel,
  onConfirm,
  children,
}: ActionPanelProps) {
  return (
    <Card
      className={cn(
        "flex flex-col h-full bg-neutral-50 w-96 border border-neutral-900/10 rounded-lg shadow min-h-[512px] p-0 gap-0"
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-neutral-900/10 p-4">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-2">
            {onBack && (
              <Button variant="ghost" size="icon" onClick={onBack} className="h-6 w-6">
                <ChevronLeft className="h-4 w-4" />
              </Button>
            )}
            <span className="font-semibold text-neutral-900 text-base">{title}</span>
          </div>
          {subtitle && <span className="text-sm text-neutral-500">{subtitle}</span>}
          <Button variant="ghost" size="icon" onClick={onClose} className="h-6 w-6">
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
      {/* Content */}
      <div className="flex-1 p-2 flex flex-col gap-4 overflow-hidden">
        <div className="flex-1 flex items-start justify-center text-neutral-400 text-lg">
          {children ?? "Content"}
        </div>
      </div>
      {/* Footer */}
      <div className="flex justify-between border-t border-neutral-900/10 p-2">
        <Button onClick={onCancel}>Cancel</Button>
        <Button variant="primary" onClick={onConfirm}>Confirm</Button>
      </div>
    </Card>
  );
} 