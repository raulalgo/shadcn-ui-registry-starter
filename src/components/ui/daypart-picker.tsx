import * as React from "react";
import { cn } from "@/lib/utils";

export interface DaypartPickerProps {
  className?: string;
}

export function DaypartPicker({ className }: DaypartPickerProps) {
  const days = ["MO", "TU", "WE", "TH", "FR", "SA", "SU"];
  const hours = Array.from({ length: 24 }, (_, i) => `${i.toString().padStart(2, "0")}:00`);

  const getCellIntensity = (day: string, hour: string) => {
    const hourNum = Number.parseInt(hour.split(":")[0]);
    const dayIndex = days.indexOf(day);
    if (hourNum >= 6 && hourNum <= 7) return 1;
    if (hourNum >= 8 && hourNum <= 11) return 2;
    if (hourNum >= 12 && hourNum <= 19) return 3;
    if (hourNum >= 20 && hourNum <= 21) return 2;
    if (hourNum >= 22 && hourNum <= 23 && dayIndex >= 4) return 2;
    return 0;
  };

  const getCellColor = (intensity: number) => {
    switch (intensity) {
      case 0:
        return "bg-yellow-200";
      case 1:
        return "bg-yellow-200 border-2 border-primary-600";
      case 2:
        return "bg-yellow-400";
      case 3:
        return "bg-yellow-600";
      default:
        return "bg-yellow-200";
    }
  };

  return (
    <div className={cn("flex-1 overflow-auto", className)}>
      <div className="min-w-full">
        {/* Header Row */}
        <div className="grid grid-cols-8 gap-1 mb-2">
          <div className="w-12"></div>
          {days.map((day) => (
            <div
              key={day}
              className="text-center font-medium text-xs py-1 text-neutral-600"
            >
              {day}
            </div>
          ))}
        </div>
        {/* Time Rows */}
        <div className="space-y-1">
          {hours.map((hour) => (
            <div key={hour} className="grid grid-cols-8 gap-1">
              <div className="w-12 text-xs text-neutral-600 py-1 text-right pr-2 pt-0 pb-0">
                {hour}
              </div>
              {days.map((day) => {
                const cellId = `${day}-${hour}`;
                const intensity = getCellIntensity(day, hour);
                return (
                  <div
                    key={cellId}
                    className={cn(
                      "w-full transition-all rounded-sm box-border",
                      getCellColor(intensity),
                      "border border-neutral-300"
                    )}
                    style={{ height: "20px" }}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 