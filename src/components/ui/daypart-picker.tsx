"use client";
import * as React from "react";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import * as DropdownMenu from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

export interface DaypartPickerProps {
  className?: string;
}

const daypartPickerCellVariants = cva(
  "w-full h-5 rounded-sm bg-primary-200 transition-all hover:opacity-40 active:opacity-20",
  {
    variants: {
      variant: {
        default: "",
        selected: "bg-primary-800",
      },
    },
  },
);

interface DaypartPickerCellProps
  extends VariantProps<typeof daypartPickerCellVariants> {
  day: string;
  hour: string;
  variant: "default" | "selected";
  className?: string;
  onMouseEnter?: (e: React.MouseEvent) => void;
  onMouseDown?: (e: React.MouseEvent) => void;
  onMouseUp?: (e: React.MouseEvent) => void;
}

function DaypartPickerCell({
  day,
  hour,
  variant,
  className,
  onMouseEnter,
  onMouseDown,
  onMouseUp,
}: DaypartPickerCellProps) {
  return (
    <button
      type="button"
      className={cn(daypartPickerCellVariants({ variant, className }))}
      onMouseEnter={onMouseEnter}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      tabIndex={0}
    />
  );
}

export function DaypartPicker({ className }: DaypartPickerProps) {
  const hours = Array.from(
    { length: 24 },
    (_, i) => `${i.toString().padStart(2, "0")}:00`,
  );

  // State for header hover effects
  const [hoveredDay, setHoveredDay] = React.useState<string | null>(null);
  const [hoveredHour, setHoveredHour] = React.useState<string | null>(null);

  // State for header active effects
  const [activeDay, setActiveDay] = React.useState<string | null>(null);
  const [activeHour, setActiveHour] = React.useState<string | null>(null);

  // State for cell selection
  const [selectedCells, setSelectedCells] = React.useState<Set<string>>(
    new Set(),
  );

  // State for mouse drag range selection
  const [dragAnchor, setDragAnchor] = React.useState<{
    day: string;
    hour: string;
  } | null>(null);
  const [dragPreview, setDragPreview] = React.useState<Set<string>>(new Set());
  const [isDragging, setIsDragging] = React.useState(false);

  // State for header drag range selection
  const [headerDragAnchor, setHeaderDragAnchor] = React.useState<{
    type: "day" | "hour";
    value: string;
  } | null>(null);
  const [headerDragPreview, setHeaderDragPreview] = React.useState<Set<string>>(
    new Set(),
  );
  const [isHeaderDragging, setIsHeaderDragging] = React.useState(false);

  // Add state for last clicked cell/header
  const [lastClickedCell, setLastClickedCell] = React.useState<{
    day: string;
    hour: string;
  } | null>(null);
  const [lastClickedDay, setLastClickedDay] = React.useState<string | null>(
    null,
  );
  const [lastClickedHour, setLastClickedHour] = React.useState<string | null>(
    null,
  );

  // State for shift+click range selection
  const [shiftPreview, setShiftPreview] = React.useState<Set<string>>(
    new Set(),
  );
  const [shiftHeld, setShiftHeld] = React.useState(false);

  // Add state for tab selection and no-repeat dropdown
  const [tab, setTab] = React.useState<string>("1week");
  const weekOptions = [
    "Apr 29 – May 5, 2024",
    "May 6 – May 12, 2024",
    "May 13 – May 19, 2024",
  ];
  const [noRepeatWeek, setNoRepeatWeek] = React.useState<string>(
    weekOptions[0],
  );

  // For 2 weeks, double the days array
  const days1 = ["MO", "TU", "WE", "TH", "FR", "SA", "SU"];
  // For 2 weeks, create unique day keys (MO-1, MO-2, ...)
  const days =
    tab === "2week"
      ? days1.map((d, i) => `${d}-1`).concat(days1.map((d, i) => `${d}-2`))
      : days1;

  // Remove fixed cell width, use only grid for sizing
  const cellWidth = "";

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

  const handleCellMouseDown = (day: string, hour: string) => {
    if (shiftHeld && lastClickedCell) {
      // Preview the range
      const range = getCellRange(lastClickedCell, { day, hour });
      setShiftPreview(range);
    } else {
      setDragAnchor({ day, hour });
      setIsDragging(true);
      setDragPreview(new Set([`${day}-${hour}`]));
    }
  };

  const handleCellMouseEnter = (day: string, hour: string) => {
    if (isDragging && dragAnchor) {
      const range = getCellRange(dragAnchor, { day, hour });
      setDragPreview(range);
    }
    // Shift+hover preview
    if (shiftHeld && lastClickedCell) {
      const range = getCellRange(lastClickedCell, { day, hour });
      setShiftPreview(range);
    }
  };

  const handleCellMouseUp = (day: string, hour: string) => {
    if (shiftHeld && lastClickedCell) {
      // Confirm the range selection (toggle all in range)
      const range = getCellRange(lastClickedCell, { day, hour });
      setSelectedCells((prev) => {
        const next = new Set(prev);
        let allSelected = true;
        range.forEach((cellId) => {
          if (!next.has(cellId)) allSelected = false;
        });
        range.forEach((cellId) => {
          if (allSelected) {
            next.delete(cellId);
          } else {
            next.add(cellId);
          }
        });
        return next;
      });
      setShiftPreview(new Set());
      setLastClickedCell({ day, hour });
      return;
    }
    // Normal click/drag logic
    if (isDragging && dragAnchor) {
      if (dragAnchor.day === day && dragAnchor.hour === hour) {
        const cellId = `${day}-${hour}`;
        setSelectedCells((prev) => {
          const next = new Set(prev);
          if (next.has(cellId)) {
            next.delete(cellId);
          } else {
            next.add(cellId);
          }
          return next;
        });
      } else {
        const range = getCellRange(dragAnchor, { day, hour });
        setSelectedCells((prev) => {
          const next = new Set(prev);
          range.forEach((cellId) => next.add(cellId));
          return next;
        });
      }
      setDragAnchor(null);
      setDragPreview(new Set());
      setIsDragging(false);
      setLastClickedCell({ day, hour });
    } else {
      // Individual cell toggle
      const cellId = `${day}-${hour}`;
      setSelectedCells((prev) => {
        const next = new Set(prev);
        if (next.has(cellId)) {
          next.delete(cellId);
        } else {
          next.add(cellId);
        }
        return next;
      });
      setLastClickedCell({ day, hour });
    }
  };

  const handleDayHeaderMouseEnter = (day: string) => {
    setHoveredDay(day);
    if (
      isHeaderDragging &&
      headerDragAnchor &&
      headerDragAnchor.type === "day"
    ) {
      const startIdx = Math.min(
        days.indexOf(headerDragAnchor.value),
        days.indexOf(day),
      );
      const endIdx = Math.max(
        days.indexOf(headerDragAnchor.value),
        days.indexOf(day),
      );
      const range = new Set<string>();
      for (let d = startIdx; d <= endIdx; d++) {
        hours.forEach((hour) => range.add(`${days[d]}-${hour}`));
      }
      setHeaderDragPreview(range);
    }
    // Shift+hover preview for headers
    if (shiftHeld && lastClickedDay) {
      const startIdx = Math.min(
        days.indexOf(lastClickedDay),
        days.indexOf(day),
      );
      const endIdx = Math.max(days.indexOf(lastClickedDay), days.indexOf(day));
      const range = new Set<string>();
      for (let d = startIdx; d <= endIdx; d++) {
        hours.forEach((hour) => range.add(`${days[d]}-${hour}`));
      }
      setShiftPreview(range);
    }
  };

  const handleDayHeaderMouseLeave = () => {
    setHoveredDay(null);
  };

  const handleHourHeaderMouseEnter = (hour: string) => {
    setHoveredHour(hour);
    if (
      isHeaderDragging &&
      headerDragAnchor &&
      headerDragAnchor.type === "hour"
    ) {
      const startIdx = Math.min(
        hours.indexOf(headerDragAnchor.value),
        hours.indexOf(hour),
      );
      const endIdx = Math.max(
        hours.indexOf(headerDragAnchor.value),
        hours.indexOf(hour),
      );
      const range = new Set<string>();
      for (let h = startIdx; h <= endIdx; h++) {
        days.forEach((day) => range.add(`${day}-${hours[h]}`));
      }
      setHeaderDragPreview(range);
    }
    // Shift+hover preview for headers
    if (shiftHeld && lastClickedHour) {
      const startIdx = Math.min(
        hours.indexOf(lastClickedHour),
        hours.indexOf(hour),
      );
      const endIdx = Math.max(
        hours.indexOf(lastClickedHour),
        hours.indexOf(hour),
      );
      const range = new Set<string>();
      for (let h = startIdx; h <= endIdx; h++) {
        days.forEach((day) => range.add(`${day}-${hours[h]}`));
      }
      setShiftPreview(range);
    }
  };

  const handleHourHeaderMouseLeave = () => {
    setHoveredHour(null);
  };

  const handleDayHeaderMouseDown = (day: string) => {
    if (shiftHeld && lastClickedDay) {
      // Preview the range
      const startIdx = Math.min(
        days.indexOf(lastClickedDay),
        days.indexOf(day),
      );
      const endIdx = Math.max(days.indexOf(lastClickedDay), days.indexOf(day));
      const range = new Set<string>();
      for (let d = startIdx; d <= endIdx; d++) {
        hours.forEach((hour) => range.add(`${days[d]}-${hour}`));
      }
      setShiftPreview(range);
    } else {
      setActiveDay(day);
      setHeaderDragAnchor({ type: "day", value: day });
      setIsHeaderDragging(true);
      const dayCells = hours.map((hour) => `${day}-${hour}`);
      setHeaderDragPreview(new Set(dayCells));
    }
  };

  const handleDayHeaderMouseUp = (day: string) => {
    setActiveDay(null);
    if (shiftHeld && lastClickedDay) {
      // Confirm the range selection (toggle all in range)
      const startIdx = Math.min(
        days.indexOf(lastClickedDay),
        days.indexOf(day),
      );
      const endIdx = Math.max(days.indexOf(lastClickedDay), days.indexOf(day));
      const range = new Set<string>();
      for (let d = startIdx; d <= endIdx; d++) {
        hours.forEach((hour) => range.add(`${days[d]}-${hour}`));
      }
      setSelectedCells((prev) => {
        const next = new Set(prev);
        let allSelected = true;
        range.forEach((cellId) => {
          if (!next.has(cellId)) allSelected = false;
        });
        range.forEach((cellId) => {
          if (allSelected) {
            next.delete(cellId);
          } else {
            next.add(cellId);
          }
        });
        return next;
      });
      setShiftPreview(new Set());
      setLastClickedDay(day);
      return;
    }
    // Normal header logic
    if (
      isHeaderDragging &&
      headerDragAnchor &&
      headerDragAnchor.type === "day"
    ) {
      if (headerDragAnchor.value === day) {
        const dayCells = hours.map((hour) => `${day}-${hour}`);
        const allSelected = dayCells.every((cellId) =>
          selectedCells.has(cellId),
        );
        setSelectedCells((prev) => {
          const next = new Set(prev);
          if (allSelected) {
            dayCells.forEach((cellId) => next.delete(cellId));
          } else {
            dayCells.forEach((cellId) => next.add(cellId));
          }
          return next;
        });
      } else {
        const startIdx = Math.min(
          days.indexOf(headerDragAnchor.value),
          days.indexOf(day),
        );
        const endIdx = Math.max(
          days.indexOf(headerDragAnchor.value),
          days.indexOf(day),
        );
        const range = new Set<string>();
        for (let d = startIdx; d <= endIdx; d++) {
          hours.forEach((hour) => range.add(`${days[d]}-${hour}`));
        }
        setSelectedCells((prev) => {
          const next = new Set(prev);
          range.forEach((cellId) => next.add(cellId));
          return next;
        });
      }
      setHeaderDragAnchor(null);
      setHeaderDragPreview(new Set());
      setIsHeaderDragging(false);
      setLastClickedDay(day);
    } else {
      // Single header click
      setLastClickedDay(day);
    }
  };

  const handleHourHeaderMouseDown = (hour: string) => {
    if (shiftHeld && lastClickedHour) {
      // Preview the range
      const startIdx = Math.min(
        hours.indexOf(lastClickedHour),
        hours.indexOf(hour),
      );
      const endIdx = Math.max(
        hours.indexOf(lastClickedHour),
        hours.indexOf(hour),
      );
      const range = new Set<string>();
      for (let h = startIdx; h <= endIdx; h++) {
        days.forEach((day) => range.add(`${day}-${hours[h]}`));
      }
      setShiftPreview(range);
    } else {
      setActiveHour(hour);
      setHeaderDragAnchor({ type: "hour", value: hour });
      setIsHeaderDragging(true);
      const hourCells = days.map((day) => `${day}-${hour}`);
      setHeaderDragPreview(new Set(hourCells));
    }
  };

  const handleHourHeaderMouseUp = (hour: string) => {
    setActiveHour(null);
    if (shiftHeld && lastClickedHour) {
      // Confirm the range selection (toggle all in range)
      const startIdx = Math.min(
        hours.indexOf(lastClickedHour),
        hours.indexOf(hour),
      );
      const endIdx = Math.max(
        hours.indexOf(lastClickedHour),
        hours.indexOf(hour),
      );
      const range = new Set<string>();
      for (let h = startIdx; h <= endIdx; h++) {
        days.forEach((day) => range.add(`${day}-${hours[h]}`));
      }
      setSelectedCells((prev) => {
        const next = new Set(prev);
        let allSelected = true;
        range.forEach((cellId) => {
          if (!next.has(cellId)) allSelected = false;
        });
        range.forEach((cellId) => {
          if (allSelected) {
            next.delete(cellId);
          } else {
            next.add(cellId);
          }
        });
        return next;
      });
      setShiftPreview(new Set());
      setLastClickedHour(hour);
      return;
    }
    // Normal header logic
    if (
      isHeaderDragging &&
      headerDragAnchor &&
      headerDragAnchor.type === "hour"
    ) {
      if (headerDragAnchor.value === hour) {
        const hourCells = days.map((day) => `${day}-${hour}`);
        const allSelected = hourCells.every((cellId) =>
          selectedCells.has(cellId),
        );
        setSelectedCells((prev) => {
          const next = new Set(prev);
          if (allSelected) {
            hourCells.forEach((cellId) => next.delete(cellId));
          } else {
            hourCells.forEach((cellId) => next.add(cellId));
          }
          return next;
        });
      } else {
        const startIdx = Math.min(
          hours.indexOf(headerDragAnchor.value),
          hours.indexOf(hour),
        );
        const endIdx = Math.max(
          hours.indexOf(headerDragAnchor.value),
          hours.indexOf(hour),
        );
        const range = new Set<string>();
        for (let h = startIdx; h <= endIdx; h++) {
          days.forEach((day) => range.add(`${day}-${hours[h]}`));
        }
        setSelectedCells((prev) => {
          const next = new Set(prev);
          range.forEach((cellId) => next.add(cellId));
          return next;
        });
      }
      setHeaderDragAnchor(null);
      setHeaderDragPreview(new Set());
      setIsHeaderDragging(false);
      setLastClickedHour(hour);
    } else {
      // Single header click
      setLastClickedHour(hour);
    }
  };

  // Global mouse up handler to cancel drag if mouse up happens outside cells
  React.useEffect(() => {
    if (!isDragging && !isHeaderDragging) return;

    const handleGlobalMouseUp = () => {
      setDragAnchor(null);
      setDragPreview(new Set());
      setIsDragging(false);
      setHeaderDragAnchor(null);
      setHeaderDragPreview(new Set());
      setIsHeaderDragging(false);
    };

    window.addEventListener("mouseup", handleGlobalMouseUp);
    return () => window.removeEventListener("mouseup", handleGlobalMouseUp);
  }, [isDragging, isHeaderDragging]);

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Shift") setShiftHeld(true);
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === "Shift") {
        setShiftHeld(false);
        setShiftPreview(new Set());
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  // Clear handler
  const handleClear = () => setSelectedCells(new Set());

  return (
    <div className={cn("flex-1 overflow-auto", className)}>
      {/* Tabs and Clear button row */}
      <div className="mb-4 flex items-center justify-between">
        <Tabs value={tab} onValueChange={setTab} className="">
          <TabsList>
            <TabsTrigger value="1week">1 week</TabsTrigger>
            <TabsTrigger value="2week">2 weeks</TabsTrigger>
            <TabsTrigger value="norepeat">No repeat</TabsTrigger>
          </TabsList>
        </Tabs>
        <Button variant="medium" size="default" onClick={handleClear}>
          Clear
        </Button>
      </div>
      {/* No repeat dropdown */}
      {tab === "norepeat" && (
        <div className="mb-2 flex justify-end">
          <DropdownMenu.DropdownMenu>
            <DropdownMenu.DropdownMenuTrigger asChild>
              <Button
                variant="default"
                size="sm"
                className="w-full min-w-[250px] justify-between pr-3 text-left"
              >
                <span>{noRepeatWeek}</span>
                <ChevronDown className="text-muted-foreground ml-2 h-4 w-4" />
              </Button>
            </DropdownMenu.DropdownMenuTrigger>
            <DropdownMenu.DropdownMenuContent
              align="end"
              className="w-full min-w-[250px]"
            >
              {weekOptions.map((option) => (
                <DropdownMenu.DropdownMenuItem
                  key={option}
                  onSelect={() => setNoRepeatWeek(option)}
                >
                  {option}
                </DropdownMenu.DropdownMenuItem>
              ))}
            </DropdownMenu.DropdownMenuContent>
          </DropdownMenu.DropdownMenu>
        </div>
      )}
      {/* Picker grid */}
      <div className="min-w-full">
        {/* Header Row */}
        <div
          className={"mb-2 grid gap-1"}
          style={{ gridTemplateColumns: `3.5rem repeat(${days.length}, 1fr)` }}
        >
          <div style={{ width: "3.5rem" }}></div>
          {days.map((day, i) => {
            // For 2 weeks, show just the day label (MO, TU, ...)
            const label = tab === "2week" ? day.split("-")[0] : day;
            // Unique hover/active logic per column
            const isHovered = hoveredDay === day;
            const isActive = activeDay === day;
            return (
              <div
                key={day}
                className={cn(
                  `cursor-pointer rounded-sm py-1 text-center text-xs font-medium text-neutral-600 transition-colors select-none ${cellWidth}`,
                  "hover:bg-neutral-200",
                  isActive && "bg-neutral-100",
                  isHovered && "opacity-40",
                )}
                onMouseEnter={() => handleDayHeaderMouseEnter(day)}
                onMouseLeave={handleDayHeaderMouseLeave}
                onMouseDown={() => handleDayHeaderMouseDown(day)}
                onMouseUp={(e) => handleDayHeaderMouseUp(day)}
              >
                {label}
              </div>
            );
          })}
        </div>
        {/* Time Rows */}
        <div className="space-y-1">
          {hours.map((hour) => (
            <div
              key={hour}
              className={"grid gap-1"}
              style={{
                gridTemplateColumns: `3.5rem repeat(${days.length}, 1fr)`,
              }}
            >
              <div
                style={{ width: "3.5rem" }}
                className={cn(
                  `cursor-pointer rounded-sm py-1 pt-0 pr-2 pb-0 text-right text-xs text-neutral-600 transition-colors select-none ${cellWidth}`,
                  "hover:bg-neutral-200",
                  activeHour === hour && "bg-neutral-100",
                )}
                onMouseEnter={() => handleHourHeaderMouseEnter(hour)}
                onMouseLeave={handleHourHeaderMouseLeave}
                onMouseDown={() => handleHourHeaderMouseDown(hour)}
                onMouseUp={(e) => handleHourHeaderMouseUp(hour)}
              >
                {hour}
              </div>
              {days.map((day) => {
                // Unique hover/active logic per cell
                const cellId = `${day}-${hour}`;
                const isHovered = hoveredDay === day || hoveredHour === hour;
                const isActive = activeDay === day || activeHour === hour;
                const isSelected = selectedCells.has(cellId);
                const isInDragPreview = dragPreview.has(cellId);
                const isInHeaderDragPreview = headerDragPreview.has(cellId);
                const isInShiftPreview = shiftPreview.has(cellId);
                return (
                  <DaypartPickerCell
                    key={cellId}
                    day={day}
                    hour={hour}
                    variant={isSelected ? "selected" : "default"}
                    className={cn(
                      cellWidth,
                      (hoveredDay === day || hoveredHour === hour) &&
                        "opacity-40",
                      (activeDay === day || activeHour === hour) &&
                        "opacity-20",
                      isInDragPreview && !isSelected && "opacity-60",
                      isInHeaderDragPreview && !isSelected && "opacity-60",
                      isInShiftPreview && !isSelected && "opacity-60",
                    )}
                    onMouseDown={() => handleCellMouseDown(day, hour)}
                    onMouseEnter={() => handleCellMouseEnter(day, hour)}
                    onMouseUp={() => handleCellMouseUp(day, hour)}
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

export { daypartPickerCellVariants };

/*

intensity: {
        0: "bg-yellow-200",
        1: "bg-yellow-200 border-2 border-primary-600",
        2: "bg-yellow-400",
        3: "bg-yellow-600",
      },



 variants: {
      mode: {
        default: "",
        intensity: "",
      },
      
      selected: {
        true: "bg-primary-800",
        false: "bg-primary-300",
      },
      hovered: {
        true: "opacity-80",
        false: "",
      },
      active: {
        true: "opacity-60",
        false: "",
      },
    },
    compoundVariants: [
      // When in intensity mode, ignore selected state
      {
        mode: "intensity",
        selected: true,
        className: "",
      },
      {
        mode: "intensity",
        selected: false,
        className: "",
      },
    ],
    defaultVariants: {
      mode: "default",
      selected: false,
      hovered: false,
      active: false,
    },     
      */
