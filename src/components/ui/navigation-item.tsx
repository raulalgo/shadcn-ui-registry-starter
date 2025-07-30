"use client";

import * as React from "react";
import { LucideIcon, Paperclip } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavigationItemProps {
  icon?: LucideIcon;
  label: string;
  isSelected?: boolean;
  onClick?: () => void;
  className?: string;
}

function NavigationItem({
  icon: Icon = Paperclip,
  label,
  isSelected = false,
  onClick,
  className,
}: NavigationItemProps) {
  return (
    <div className="group relative">
      <button
        className={cn(
          "rounded-lg p-3 transition-colors",
          isSelected
            ? "text-primary-50 bg-primary-800"
            : "text-primary-300 hover:text-primary-50 hover:bg-primary-800",
          className,
        )}
        title={label}
        onClick={onClick}
      >
        <Icon className="h-5 w-5" />
      </button>

      {/* Selection indicator - half yellow dot on right edge */}
      {isSelected && (
        <div className="absolute top-1/2 -right-3 h-2 w-2 -translate-y-1/2 transform rounded-full bg-yellow-400" />
      )}
    </div>
  );
}

export { NavigationItem };
