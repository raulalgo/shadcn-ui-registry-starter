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
        "flex h-full min-h-[512px] w-96 flex-col gap-0 rounded-lg border border-neutral-900/10 bg-neutral-50 p-0 shadow",
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-neutral-900/10 p-4">
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center gap-2">
            {onBack && (
              <Button
                variant="ghost"
                size="icon"
                onClick={onBack}
                className="h-6 w-6"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
            )}
            <span className="text-base font-semibold text-neutral-900">
              {title}
            </span>
          </div>
          {subtitle && (
            <span className="text-sm text-neutral-500">{subtitle}</span>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="h-6 w-6"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
      {/* Content */}
      <div className="flex flex-1 flex-col gap-4 overflow-hidden p-2">
        <div className="flex flex-1 items-start justify-center text-lg text-neutral-400">
          {children ?? "Content"}
        </div>
      </div>
      {/* Footer */}
      <div className="flex justify-between border-t border-neutral-900/10 p-2">
        <Button onClick={onCancel}>Cancel</Button>
        <Button variant="primary" onClick={onConfirm}>
          Confirm
        </Button>
      </div>
    </Card>
  );
}
