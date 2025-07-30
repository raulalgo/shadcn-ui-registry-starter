"use client";

import { cn } from "@/lib/utils";
import { Calendar, ChevronLeft, X } from "lucide-react";
import * as React from "react";
import { Button } from "./button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";

interface DaypartPanelProps {
  onClose?: () => void;
  onCustomDaypart?: (isCustom: boolean) => void;
  onBack?: () => void;
}

function DaypartPanel({ onClose, onCustomDaypart, onBack }: DaypartPanelProps) {
  const [selectedPattern, setSelectedPattern] = React.useState<
    "1week" | "2week" | "norepeat"
  >("norepeat");
  const [selectedCells, setSelectedCells] = React.useState<Set<string>>(
    new Set(),
  );
  const [isCustomDaypart, setIsCustomDaypart] = React.useState(false);
  const [lastClickedCell, setLastClickedCell] = React.useState<string | null>(
    null,
  );
  const [lastClickedHeader, setLastClickedHeader] = React.useState<{
    type: "day" | "hour";
    value: string;
  } | null>(null);
  const [previewCells, setPreviewCells] = React.useState<Set<string>>(
    new Set(),
  );
  const [isSelecting, setIsSelecting] = React.useState(false);
  const [selectionStart, setSelectionStart] = React.useState<{
    type: "cell" | "day" | "hour";
    day?: string;
    hour?: string;
  } | null>(null);
  const [isShiftPreview, setIsShiftPreview] = React.useState(false);
  const [shiftPreviewCells, setShiftPreviewCells] = React.useState<Set<string>>(
    new Set(),
  );
  const [shiftPreviewStart, setShiftPreviewStart] = React.useState<{
    type: "cell" | "day" | "hour";
    day?: string;
    hour?: string;
  } | null>(null);

  const days = ["MO", "TU", "WE", "TH", "FR", "SA", "SU"];
  const hours = Array.from(
    { length: 24 },
    (_, i) => `${i.toString().padStart(2, "0")}:00`,
  );
  const indexRanges = [
    { range: "0-0.54", color: "bg-yellow-200", label: "0-0.54" },
    { range: "0.54-1.08", color: "bg-yellow-400", label: "0.54-1.08" },
    { range: "1.08-1.62", color: "bg-yellow-600", label: "1.08-1.62" },
    { range: "1.63-2.20", color: "bg-yellow-800", label: "1.63 - 2.20" },
  ];

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

  // Listen for shift key up/down to manage preview state
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Shift") setIsShiftPreview(true);
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === "Shift") {
        setIsShiftPreview(false);
        setShiftPreviewCells(new Set());
        setShiftPreviewStart(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  const handleCellMouseOver = (
    day: string,
    hour: string,
    event?: React.MouseEvent,
  ) => {
    if (
      isShiftPreview &&
      shiftPreviewStart &&
      shiftPreviewStart.type === "cell"
    ) {
      setShiftPreviewCells(
        getCellRange(
          { day: shiftPreviewStart.day!, hour: shiftPreviewStart.hour! },
          { day, hour },
        ),
      );
    }
  };

  const handleCellClick = (
    day: string,
    hour: string,
    event?: React.MouseEvent,
  ) => {
    if (event?.shiftKey) {
      if (!shiftPreviewStart) {
        setShiftPreviewStart({ type: "cell", day, hour });
        setShiftPreviewCells(new Set([`${day}-${hour}`]));
      } else {
        const range = getCellRange(
          { day: shiftPreviewStart.day!, hour: shiftPreviewStart.hour! },
          { day, hour },
        );
        const newSelected = new Set(selectedCells);
        range.forEach((cell) => newSelected.add(cell));
        setSelectedCells(newSelected);
        setShiftPreviewCells(new Set());
        setShiftPreviewStart(null);
      }
      setLastClickedCell(`${day}-${hour}`);
      return;
    }
    // Single click: toggle cell
    const cellId = `${day}-${hour}`;
    const newSelected = new Set(selectedCells);
    if (newSelected.has(cellId)) {
      newSelected.delete(cellId);
    } else {
      newSelected.add(cellId);
    }
    setSelectedCells(newSelected);
    setLastClickedCell(cellId);
  };

  const handleClear = () => {
    setSelectedCells(new Set());
  };

  const handleDayMouseOver = (day: string, event?: React.MouseEvent) => {
    if (
      isShiftPreview &&
      shiftPreviewStart &&
      shiftPreviewStart.type === "day"
    ) {
      setShiftPreviewCells(getDayRange(shiftPreviewStart.day!, day));
    }
  };

  const handleDayClick = (day: string, event?: React.MouseEvent) => {
    if (event?.shiftKey) {
      if (!shiftPreviewStart) {
        setShiftPreviewStart({ type: "day", day });
        setShiftPreviewCells(new Set(hours.map((hour) => `${day}-${hour}`)));
      } else if (shiftPreviewStart.type === "day") {
        const range = getDayRange(shiftPreviewStart.day!, day);
        const newSelected = new Set(selectedCells);
        range.forEach((cell) => newSelected.add(cell));
        setSelectedCells(newSelected);
        setShiftPreviewCells(new Set());
        setShiftPreviewStart(null);
      }
      setLastClickedHeader({ type: "day", value: day });
      return;
    }
    // Single click: toggle all or none for day column
    const dayColumnCells = hours.map((hour) => `${day}-${hour}`);
    const newSelected = new Set(selectedCells);
    const allSelected = dayColumnCells.every((cellId) =>
      newSelected.has(cellId),
    );
    if (allSelected) {
      dayColumnCells.forEach((cellId) => newSelected.delete(cellId));
    } else {
      dayColumnCells.forEach((cellId) => newSelected.add(cellId));
    }
    setSelectedCells(newSelected);
    setLastClickedHeader({ type: "day", value: day });
  };

  const handleHourMouseOver = (hour: string, event?: React.MouseEvent) => {
    if (
      isShiftPreview &&
      shiftPreviewStart &&
      shiftPreviewStart.type === "hour"
    ) {
      setShiftPreviewCells(getHourRange(shiftPreviewStart.hour!, hour));
    }
  };

  const handleHourClick = (hour: string, event?: React.MouseEvent) => {
    if (event?.shiftKey) {
      if (!shiftPreviewStart) {
        setShiftPreviewStart({ type: "hour", hour });
        setShiftPreviewCells(new Set(days.map((day) => `${day}-${hour}`)));
      } else if (shiftPreviewStart.type === "hour") {
        const range = getHourRange(shiftPreviewStart.hour!, hour);
        const newSelected = new Set(selectedCells);
        range.forEach((cell) => newSelected.add(cell));
        setSelectedCells(newSelected);
        setShiftPreviewCells(new Set());
        setShiftPreviewStart(null);
      }
      setLastClickedHeader({ type: "hour", value: hour });
      return;
    }
    // Single click: toggle all or none for hour row
    const hourRowCells = days.map((day) => `${day}-${hour}`);
    const newSelected = new Set(selectedCells);
    const allSelected = hourRowCells.every((cellId) => newSelected.has(cellId));
    if (allSelected) {
      hourRowCells.forEach((cellId) => newSelected.delete(cellId));
    } else {
      hourRowCells.forEach((cellId) => newSelected.add(cellId));
    }
    setSelectedCells(newSelected);
    setLastClickedHeader({ type: "hour", value: hour });
  };

  const handleCellKeyDown = (
    day: string,
    hour: string,
    event: React.KeyboardEvent,
  ) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleCellClick(
        day,
        hour,
        event.shiftKey ? ({ shiftKey: true } as React.MouseEvent) : undefined,
      );
    }
  };

  // Helper to get range between two cells
  const getCellRange = (
    start: { day: string; hour: string },
    end: { day: string; hour: string },
  ) => {
    const startDayIdx = days.indexOf(start.day);
    const endDayIdx = days.indexOf(end.day);
    const startHourIdx = hours.indexOf(start.hour);
    const endHourIdx = hours.indexOf(end.hour);
    const range = new Set<string>();
    for (
      let d = Math.min(startDayIdx, endDayIdx);
      d <= Math.max(startDayIdx, endDayIdx);
      d++
    ) {
      for (
        let h = Math.min(startHourIdx, endHourIdx);
        h <= Math.max(startHourIdx, endHourIdx);
        h++
      ) {
        range.add(`${days[d]}-${hours[h]}`);
      }
    }
    return range;
  };

  const getDayRange = (startDay: string, endDay: string) => {
    const startIdx = days.indexOf(startDay);
    const endIdx = days.indexOf(endDay);
    const range = new Set<string>();
    for (
      let d = Math.min(startIdx, endIdx);
      d <= Math.max(startIdx, endIdx);
      d++
    ) {
      hours.forEach((hour) => range.add(`${days[d]}-${hour}`));
    }
    return range;
  };

  const getHourRange = (startHour: string, endHour: string) => {
    const startIdx = hours.indexOf(startHour);
    const endIdx = hours.indexOf(endHour);
    const range = new Set<string>();
    for (
      let h = Math.min(startIdx, endIdx);
      h <= Math.max(startIdx, endIdx);
      h++
    ) {
      days.forEach((day) => range.add(`${day}-${hours[h]}`));
    }
    return range;
  };

  const handleCellMouseDown = (day: string, hour: string) => {
    setIsSelecting(true);
    setSelectionStart({ type: "cell", day, hour });
    setPreviewCells(new Set([`${day}-${hour}`]));
  };

  const handleCellMouseEnter = (day: string, hour: string) => {
    if (isSelecting && selectionStart && selectionStart.type === "cell") {
      setPreviewCells(
        getCellRange(
          { day: selectionStart.day!, hour: selectionStart.hour! },
          { day, hour },
        ),
      );
    }
  };

  const handleDayMouseDown = (day: string) => {
    setIsSelecting(true);
    setSelectionStart({ type: "day", day });
    setPreviewCells(new Set(hours.map((hour) => `${day}-${hour}`)));
  };

  const handleDayMouseEnter = (day: string) => {
    if (isSelecting && selectionStart && selectionStart.type === "day") {
      setPreviewCells(getDayRange(selectionStart.day!, day));
    }
  };

  const handleHourMouseDown = (hour: string) => {
    setIsSelecting(true);
    setSelectionStart({ type: "hour", hour });
    setPreviewCells(new Set(days.map((day) => `${day}-${hour}`)));
  };

  const handleHourMouseEnter = (hour: string) => {
    if (isSelecting && selectionStart && selectionStart.type === "hour") {
      setPreviewCells(getHourRange(selectionStart.hour!, hour));
    }
  };

  // Add useEffect for global mouseup
  React.useEffect(() => {
    if (!isSelecting) return;
    const handleGlobalMouseUp = () => {
      if (previewCells.size > 0) {
        const newSelected = new Set(selectedCells);
        previewCells.forEach((cell) => newSelected.add(cell));
        setSelectedCells(newSelected);
      }
      setPreviewCells(new Set());
      setIsSelecting(false);
      setSelectionStart(null);
    };
    window.addEventListener("mouseup", handleGlobalMouseUp);
    return () => window.removeEventListener("mouseup", handleGlobalMouseUp);
  }, [isSelecting, previewCells, selectedCells]);

  return (
    <div className="flex h-full max-w-96 flex-col rounded-lg border border-neutral-900/10 bg-neutral-50 shadow">
      {/* Header */}
      <div className="flex items-center justify-between border-neutral-900/10 border-b p-6 pt-4 pb-3 pl-4">
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
            <span className="font-semibold text-base text-neutral-900">
              Pattern
            </span>
          </div>
          <span className="text-neutral-500 text-sm">
            London_Billboards_Digital
          </span>
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
      <div className="flex flex-1 flex-col gap-4 overflow-hidden p-6 px-4 py-3">
        {/* Pattern Selection */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button
              variant={selectedPattern === "1week" ? "primary" : "default"}
              size="sm"
              onClick={() => setSelectedPattern("1week")}
              className="rounded-full"
            >
              1 Week
            </Button>
            <Button
              variant={selectedPattern === "2week" ? "primary" : "default"}
              size="sm"
              onClick={() => setSelectedPattern("2week")}
              className="rounded-full"
            >
              2 Week
            </Button>
            <Button
              variant={selectedPattern === "norepeat" ? "primary" : "default"}
              size="sm"
              onClick={() => setSelectedPattern("norepeat")}
              className="rounded-full"
            >
              No repeat
            </Button>
          </div>
          <Button
            variant="ghost"
            onClick={handleClear}
            className="text-primary-600"
          >
            <X className="mr-1 h-4 w-4" />
            Clear
          </Button>
        </div>
        {/* Date Range Selector */}
        <div className="relative">
          <Select
            defaultValue="jun24-29"
            disabled={
              selectedPattern === "1week" || selectedPattern === "2week"
            }
          >
            <SelectTrigger
              className={cn(
                "w-full",
                (selectedPattern === "1week" || selectedPattern === "2week") &&
                  "cursor-not-allowed opacity-50",
              )}
            >
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <SelectValue />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="jun24-29">
                Jun 24, 2025 - Jun 29, 2025
              </SelectItem>
              <SelectItem value="jul1-6">Jul 1, 2025 - Jul 6, 2025</SelectItem>
              <SelectItem value="jul8-13">
                Jul 8, 2025 - Jul 13, 2025
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        {/* Index Legend */}
        <div className="flex items-center gap-4">
          {indexRanges.map((range) => (
            <div key={range.range} className="flex items-center gap-2">
              <div className={cn("h-4 w-4 rounded-full", range.color)} />
              <span className="text-neutral-600 text-xs">{range.label}</span>
            </div>
          ))}
        </div>
        {/* Schedule Grid */}
        <div className="flex-1 overflow-auto">
          <div className="min-w-full">
            {/* Header Row */}
            <div className="mb-2 grid grid-cols-8 gap-1">
              <div className="w-12" />
              {days.map((day) => (
                <button
                  key={day}
                  className="cursor-pointer rounded-sm py-1 text-center font-medium text-neutral-600 text-xs transition-colors hover:bg-neutral-200"
                  onClick={(e) => handleDayClick(day, e)}
                  onMouseDown={() => handleDayMouseDown(day)}
                  onMouseEnter={() => handleDayMouseEnter(day)}
                  onMouseOver={(e) => handleDayMouseOver(day, e)}
                >
                  {day}
                </button>
              ))}
            </div>
            {/* Time Rows */}
            <div className="space-y-1">
              {hours.map((hour) => (
                <div key={hour} className="grid grid-cols-8 gap-1">
                  <button
                    className="w-12 cursor-pointer rounded-sm py-1 pt-0 pr-2 pb-0 text-right text-neutral-600 text-xs transition-colors hover:bg-neutral-200"
                    onClick={(e) => handleHourClick(hour, e)}
                    onMouseDown={() => handleHourMouseDown(hour)}
                    onMouseEnter={() => handleHourMouseEnter(hour)}
                    onMouseOver={(e) => handleHourMouseOver(hour, e)}
                  >
                    {hour}
                  </button>
                  {days.map((day) => {
                    const cellId = `${day}-${hour}`;
                    const intensity = getCellIntensity(day, hour);
                    const isSelected = selectedCells.has(cellId);
                    return (
                      <button
                        key={cellId}
                        className={cn(
                          "box-border w-full cursor-pointer rounded-sm transition-all hover:scale-105 hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-primary-600 focus:ring-offset-1",
                          getCellColor(intensity),
                          isSelected
                            ? "border-2 border-primary-600"
                            : "border border-neutral-300",
                          previewCells.has(cellId) && !isSelected
                            ? "opacity-40"
                            : "",
                          shiftPreviewCells.has(cellId) && !isSelected
                            ? "opacity-40"
                            : "",
                        )}
                        style={{ height: "20px" }}
                        onClick={(e) => handleCellClick(day, hour, e)}
                        onKeyDown={(e) => handleCellKeyDown(day, hour, e)}
                        onMouseDown={() => handleCellMouseDown(day, hour)}
                        onMouseEnter={() => handleCellMouseEnter(day, hour)}
                        onMouseOver={(e) => handleCellMouseOver(day, hour, e)}
                        tabIndex={0}
                        aria-label={`Select ${day} at ${hour}`}
                      />
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Footer */}
        <div className="flex justify-between border-neutral-900/10 border-t pt-4">
          <Button>Cancel</Button>
          <Button variant="primary">Confirm</Button>
        </div>
      </div>
    </div>
  );
}

export { DaypartPanel };
