"use client";

import * as React from "react";
import { Button } from "./button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./select";
import { X, Calendar, ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";

interface DaypartPanelProps {
  onClose?: () => void;
  onCustomDaypart?: (isCustom: boolean) => void;
  onBack?: () => void;
}

function DaypartPanelDeprecated({ onClose, onCustomDaypart, onBack }: DaypartPanelProps) {
  const [selectedPattern, setSelectedPattern] = React.useState<"1week" | "2week" | "norepeat">("norepeat");
  const [selectedCells, setSelectedCells] = React.useState<Set<string>>(new Set());
  const [isCustomDaypart, setIsCustomDaypart] = React.useState(false);
  const [lastClickedCell, setLastClickedCell] = React.useState<string | null>(null);
  const [lastClickedHeader, setLastClickedHeader] = React.useState<{
    type: 'day' | 'hour';
    value: string;
  } | null>(null);
  const [previewCells, setPreviewCells] = React.useState<Set<string>>(new Set());
  const [isSelecting, setIsSelecting] = React.useState(false);
  const [selectionStart, setSelectionStart] = React.useState<{
    type: 'cell' | 'day' | 'hour';
    day?: string;
    hour?: string;
  } | null>(null);

  const days = ["MO", "TU", "WE", "TH", "FR", "SA", "SU"];
  const hours = Array.from({ length: 24 }, (_, i) => `${i.toString().padStart(2, "0")}:00`);
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

  const handleCellClick = (day: string, hour: string, event?: React.MouseEvent) => {
    const cellId = `${day}-${hour}`;
    const newSelected = new Set(selectedCells);
    if (event?.shiftKey && lastClickedCell) {
      const [lastDay, lastHour] = lastClickedCell.split("-");
      const dayIndex = days.indexOf(day);
      const lastDayIndex = days.indexOf(lastDay);
      const hourIndex = hours.indexOf(hour);
      const lastHourIndex = hours.indexOf(lastHour);
      const startDay = Math.min(dayIndex, lastDayIndex);
      const endDay = Math.max(dayIndex, lastDayIndex);
      const startHour = Math.min(hourIndex, lastHourIndex);
      const endHour = Math.max(hourIndex, lastHourIndex);
      for (let d = startDay; d <= endDay; d++) {
        for (let h = startHour; h <= endHour; h++) {
          const rangeCell = `${days[d]}-${hours[h]}`;
          newSelected.add(rangeCell);
        }
      }
    } else {
      if (newSelected.has(cellId)) {
        newSelected.delete(cellId);
      } else {
        newSelected.add(cellId);
      }
    }
    setSelectedCells(newSelected);
    setLastClickedCell(cellId);
  };

  const handleClear = () => {
    setSelectedCells(new Set());
  };

  const handleDayClick = (day: string, event?: React.MouseEvent) => {
    const newSelected = new Set(selectedCells);
    if (event?.shiftKey && lastClickedHeader && lastClickedHeader.type === 'day') {
      // Range select columns
      const startIdx = Math.min(days.indexOf(day), days.indexOf(lastClickedHeader.value));
      const endIdx = Math.max(days.indexOf(day), days.indexOf(lastClickedHeader.value));
      for (let d = startIdx; d <= endIdx; d++) {
        const dayColumnCells = hours.map((hour) => `${days[d]}-${hour}`);
        dayColumnCells.forEach((cellId) => newSelected.add(cellId));
      }
    } else {
      const dayColumnCells = hours.map((hour) => `${day}-${hour}`);
      const allSelected = dayColumnCells.every((cellId) => newSelected.has(cellId));
      if (allSelected) {
        dayColumnCells.forEach((cellId) => newSelected.delete(cellId));
      } else {
        dayColumnCells.forEach((cellId) => newSelected.add(cellId));
      }
    }
    setSelectedCells(newSelected);
    setLastClickedHeader({ type: 'day', value: day });
  };

  const handleHourClick = (hour: string, event?: React.MouseEvent) => {
    const newSelected = new Set(selectedCells);
    if (event?.shiftKey && lastClickedHeader && lastClickedHeader.type === 'hour') {
      // Range select rows
      const startIdx = Math.min(hours.indexOf(hour), hours.indexOf(lastClickedHeader.value));
      const endIdx = Math.max(hours.indexOf(hour), hours.indexOf(lastClickedHeader.value));
      for (let h = startIdx; h <= endIdx; h++) {
        const hourRowCells = days.map((day) => `${day}-${hours[h]}`);
        hourRowCells.forEach((cellId) => newSelected.add(cellId));
      }
    } else {
      const hourRowCells = days.map((day) => `${day}-${hour}`);
      const allSelected = hourRowCells.every((cellId) => newSelected.has(cellId));
      if (allSelected) {
        hourRowCells.forEach((cellId) => newSelected.delete(cellId));
      } else {
        hourRowCells.forEach((cellId) => newSelected.add(cellId));
      }
    }
    setSelectedCells(newSelected);
    setLastClickedHeader({ type: 'hour', value: hour });
  };

  const handleCellKeyDown = (day: string, hour: string, event: React.KeyboardEvent) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleCellClick(day, hour, event.shiftKey ? ({ shiftKey: true } as React.MouseEvent) : undefined);
    }
  };

  // Helper to get range between two cells
  const getCellRange = (start: {day: string, hour: string}, end: {day: string, hour: string}) => {
    const startDayIdx = days.indexOf(start.day);
    const endDayIdx = days.indexOf(end.day);
    const startHourIdx = hours.indexOf(start.hour);
    const endHourIdx = hours.indexOf(end.hour);
    const range = new Set<string>();
    for (let d = Math.min(startDayIdx, endDayIdx); d <= Math.max(startDayIdx, endDayIdx); d++) {
      for (let h = Math.min(startHourIdx, endHourIdx); h <= Math.max(startHourIdx, endHourIdx); h++) {
        range.add(`${days[d]}-${hours[h]}`);
      }
    }
    return range;
  };

  const getDayRange = (startDay: string, endDay: string) => {
    const startIdx = days.indexOf(startDay);
    const endIdx = days.indexOf(endDay);
    const range = new Set<string>();
    for (let d = Math.min(startIdx, endIdx); d <= Math.max(startIdx, endIdx); d++) {
      hours.forEach(hour => range.add(`${days[d]}-${hour}`));
    }
    return range;
  };

  const getHourRange = (startHour: string, endHour: string) => {
    const startIdx = hours.indexOf(startHour);
    const endIdx = hours.indexOf(endHour);
    const range = new Set<string>();
    for (let h = Math.min(startIdx, endIdx); h <= Math.max(startIdx, endIdx); h++) {
      days.forEach(day => range.add(`${day}-${hours[h]}`));
    }
    return range;
  };

  const handleCellMouseDown = (day: string, hour: string) => {
    setIsSelecting(true);
    setSelectionStart({ type: 'cell', day, hour });
    setPreviewCells(new Set([`${day}-${hour}`]));
  };

  const handleCellMouseUp = (day: string, hour: string) => {
    if (isSelecting && selectionStart && selectionStart.type === 'cell') {
      const startKey = `${selectionStart.day}-${selectionStart.hour}`;
      const endKey = `${day}-${hour}`;
      if (startKey === endKey) {
        // Arbitrary selection: toggle only this cell
        const newSelected = new Set(selectedCells);
        if (newSelected.has(startKey)) {
          newSelected.delete(startKey);
        } else {
          newSelected.add(startKey);
        }
        setSelectedCells(newSelected);
        setLastClickedCell(startKey);
      } else {
        // Range selection: add all in range
        const final = getCellRange({ day: selectionStart.day!, hour: selectionStart.hour! }, { day, hour });
        const newSelected = new Set(selectedCells);
        final.forEach(cell => newSelected.add(cell));
        setSelectedCells(newSelected);
        setLastClickedCell(`${day}-${hour}`);
      }
      setPreviewCells(new Set());
      setIsSelecting(false);
      setSelectionStart(null);
    }
  };

  const handleCellMouseEnter = (day: string, hour: string) => {
    if (isSelecting && selectionStart && selectionStart.type === 'cell') {
      setPreviewCells(getCellRange({ day: selectionStart.day!, hour: selectionStart.hour! }, { day, hour }));
    }
  };

  const handleDayMouseDown = (day: string) => {
    setIsSelecting(true);
    setSelectionStart({ type: 'day', day });
    setPreviewCells(new Set(hours.map(hour => `${day}-${hour}`)));
  };

  const handleDayMouseEnter = (day: string) => {
    if (isSelecting && selectionStart && selectionStart.type === 'day') {
      setPreviewCells(getDayRange(selectionStart.day!, day));
    }
  };

  const handleHourMouseDown = (hour: string) => {
    setIsSelecting(true);
    setSelectionStart({ type: 'hour', hour });
    setPreviewCells(new Set(days.map(day => `${day}-${hour}`)));
  };

  const handleHourMouseEnter = (hour: string) => {
    if (isSelecting && selectionStart && selectionStart.type === 'hour') {
      setPreviewCells(getHourRange(selectionStart.hour!, hour));
    }
  };

  // Add useEffect for global mouseup
  React.useEffect(() => {
    if (!isSelecting) return;
    const handleGlobalMouseUp = () => {
      if (previewCells.size > 0) {
        const newSelected = new Set(selectedCells);
        previewCells.forEach(cell => newSelected.add(cell));
        setSelectedCells(newSelected);
      }
      setPreviewCells(new Set());
      setIsSelecting(false);
      setSelectionStart(null);
    };
    window.addEventListener('mouseup', handleGlobalMouseUp);
    return () => window.removeEventListener('mouseup', handleGlobalMouseUp);
  }, [isSelecting, previewCells, selectedCells]);

  return (
    <div className="flex flex-col h-full bg-neutral-50 max-w-96 border border-neutral-900/10 rounded-lg shadow">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-neutral-900/10 pl-4 pt-4 pb-3">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-2">
            {onBack && (
              <Button variant="ghost" size="icon" onClick={onBack} className="h-6 w-6">
                <ChevronLeft className="h-4 w-4" />
              </Button>
            )}
            <span className="font-semibold text-neutral-900 text-base">Pattern</span>
          </div>
          <span className="text-sm text-neutral-500">London_Billboards_Digital</span>
          <Button variant="ghost" size="icon" onClick={onClose} className="h-6 w-6">
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
      {/* Content */}
      <div className="flex-1 p-6 flex flex-col gap-4 overflow-hidden px-4 py-3">
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
          <Button variant="ghost" onClick={handleClear} className="text-primary-600">
            <X className="h-4 w-4 mr-1" />
            Clear
          </Button>
        </div>
        {/* Date Range Selector */}
        <div className="relative">
          <Select defaultValue="jun24-29" disabled={selectedPattern === "1week" || selectedPattern === "2week"}>
            <SelectTrigger
              className={cn(
                "w-full",
                (selectedPattern === "1week" || selectedPattern === "2week") && "opacity-50 cursor-not-allowed",
              )}
            >
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <SelectValue />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="jun24-29">Jun 24, 2025 - Jun 29, 2025</SelectItem>
              <SelectItem value="jul1-6">Jul 1, 2025 - Jul 6, 2025</SelectItem>
              <SelectItem value="jul8-13">Jul 8, 2025 - Jul 13, 2025</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {/* Index Legend */}
        <div className="flex items-center gap-4">
          {indexRanges.map((range) => (
            <div key={range.range} className="flex items-center gap-2">
              <div className={cn("w-4 h-4 rounded-full", range.color)} />
              <span className="text-xs text-neutral-600">{range.label}</span>
            </div>
          ))}
        </div>
        {/* Schedule Grid */}
        <div className="flex-1 overflow-auto">
          <div className="min-w-full">
            {/* Header Row */}
            <div className="grid grid-cols-8 gap-1 mb-2">
              <div className="w-12"></div>
              {days.map((day) => (
                <button
                  key={day}
                  className="text-center font-medium text-xs py-1 text-neutral-600 hover:bg-neutral-200 rounded-sm cursor-pointer transition-colors"
                  onClick={(e) => handleDayClick(day, e)}
                  onMouseDown={() => handleDayMouseDown(day)}
                  onMouseEnter={() => handleDayMouseEnter(day)}
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
                    className="w-12 text-xs text-neutral-600 py-1 text-right pr-2 pt-0 pb-0 hover:bg-neutral-200 rounded-sm cursor-pointer transition-colors"
                    onClick={(e) => handleHourClick(hour, e)}
                    onMouseDown={() => handleHourMouseDown(hour)}
                    onMouseEnter={() => handleHourMouseEnter(hour)}
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
                          "w-full transition-all hover:opacity-80 hover:scale-105 rounded-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary-600 focus:ring-offset-1 box-border",
                          getCellColor(intensity),
                          isSelected ? "border-2 border-primary-600 bg-yellow-600" : "border border-neutral-300",
                          previewCells.has(cellId) && !isSelected ? "opacity-40" : ""
                        )}
                        style={{ height: "20px" }}
                        onClick={(e) => handleCellClick(day, hour, e)}
                        onKeyDown={(e) => handleCellKeyDown(day, hour, e)}
                        onMouseDown={(e) => handleCellMouseDown(day, hour)}
                        onMouseEnter={() => handleCellMouseEnter(day, hour)}
                        onMouseUp={(e) => handleCellMouseUp(day, hour)}
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
        <div className="flex justify-between pt-4 border-t border-neutral-900/10">
          <Button>Cancel</Button>
          <Button variant="primary">Confirm</Button>
        </div>
      </div>
    </div>
  );
}

export { DaypartPanelDeprecated }; 