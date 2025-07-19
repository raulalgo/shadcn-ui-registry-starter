"use client";
import * as React from "react";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

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
      }
    }
  }
);

interface DaypartPickerCellProps extends VariantProps<typeof daypartPickerCellVariants> {
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
  onMouseUp 
}: DaypartPickerCellProps) {
  return (
    <button
      type="button"
      className={cn(
        daypartPickerCellVariants({variant, className})
      )}
      onMouseEnter={onMouseEnter}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      tabIndex={0}
    />
  );
}

export function DaypartPicker({ className }: DaypartPickerProps) {
  const days = ["MO", "TU", "WE", "TH", "FR", "SA", "SU"];
  const hours = Array.from({ length: 24 }, (_, i) => `${i.toString().padStart(2, "0")}:00`);

  // State for header hover effects
  const [hoveredDay, setHoveredDay] = React.useState<string | null>(null);
  const [hoveredHour, setHoveredHour] = React.useState<string | null>(null);
  
  // State for header active effects
  const [activeDay, setActiveDay] = React.useState<string | null>(null);
  const [activeHour, setActiveHour] = React.useState<string | null>(null);

  // State for cell selection
  const [selectedCells, setSelectedCells] = React.useState<Set<string>>(new Set());

  // State for mouse drag range selection
  const [dragAnchor, setDragAnchor] = React.useState<{ day: string; hour: string } | null>(null);
  const [dragPreview, setDragPreview] = React.useState<Set<string>>(new Set());
  const [isDragging, setIsDragging] = React.useState(false);

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

  const getCellRange = (start: { day: string; hour: string }, end: { day: string; hour: string }) => {
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

  const handleCellMouseDown = (day: string, hour: string) => {
    setDragAnchor({ day, hour });
    setIsDragging(true);
    setDragPreview(new Set([`${day}-${hour}`]));
  };

  const handleCellMouseEnter = (day: string, hour: string) => {
    if (isDragging && dragAnchor) {
      const range = getCellRange(dragAnchor, { day, hour });
      setDragPreview(range);
    }
  };

  const handleCellMouseUp = (day: string, hour: string) => {
    if (isDragging && dragAnchor) {
      // Check if this is a single cell selection (same cell)
      if (dragAnchor.day === day && dragAnchor.hour === hour) {
        // Single cell toggle
        const cellId = `${day}-${hour}`;
        setSelectedCells(prev => {
          const next = new Set(prev);
          if (next.has(cellId)) {
            next.delete(cellId);
          } else {
            next.add(cellId);
          }
          return next;
        });
      } else {
        // Range selection
        const range = getCellRange(dragAnchor, { day, hour });
        setSelectedCells(prev => {
          const next = new Set(prev);
          range.forEach(cellId => next.add(cellId));
          return next;
        });
      }
      
      // Clear drag state
      setDragAnchor(null);
      setDragPreview(new Set());
      setIsDragging(false);
    } else {
      // Individual cell toggle (existing logic)
      const cellId = `${day}-${hour}`;
      setSelectedCells(prev => {
        const next = new Set(prev);
        if (next.has(cellId)) {
          next.delete(cellId);
        } else {
          next.add(cellId);
        }
        return next;
      });
    }
  };

  const handleDayHeaderMouseEnter = (day: string) => {
    setHoveredDay(day);
  };

  const handleDayHeaderMouseLeave = () => {
    setHoveredDay(null);
  };

  const handleHourHeaderMouseEnter = (hour: string) => {
    setHoveredHour(hour);
  };

  const handleHourHeaderMouseLeave = () => {
    setHoveredHour(null);
  };

  const handleDayHeaderMouseDown = (day: string) => {
    setActiveDay(day);
  };

  const handleDayHeaderMouseUp = (day: string) => {
    setActiveDay(null);
    
    // Toggle selection for all cells in this row
    const dayCells = hours.map(hour => `${day}-${hour}`);
    const allSelected = dayCells.every(cellId => selectedCells.has(cellId));
    
    setSelectedCells(prev => {
      const next = new Set(prev);
      if (allSelected) {
        // If all cells are selected, deselect all
        dayCells.forEach(cellId => next.delete(cellId));
      } else {
        // If not all cells are selected, select all
        dayCells.forEach(cellId => next.add(cellId));
      }
      return next;
    });
  };

  const handleHourHeaderMouseDown = (hour: string) => {
    setActiveHour(hour);
  };

  const handleHourHeaderMouseUp = (hour: string) => {
    setActiveHour(null);
    
    // Toggle selection for all cells in this column
    const hourCells = days.map(day => `${day}-${hour}`);
    const allSelected = hourCells.every(cellId => selectedCells.has(cellId));
    
    setSelectedCells(prev => {
      const next = new Set(prev);
      if (allSelected) {
        // If all cells are selected, deselect all
        hourCells.forEach(cellId => next.delete(cellId));
      } else {
        // If not all cells are selected, select all
        hourCells.forEach(cellId => next.add(cellId));
      }
      return next;
    });
  };

  // Global mouse up handler to cancel drag if mouse up happens outside cells
  React.useEffect(() => {
    if (!isDragging) return;
    
    const handleGlobalMouseUp = () => {
      setDragAnchor(null);
      setDragPreview(new Set());
      setIsDragging(false);
    };
    
    window.addEventListener('mouseup', handleGlobalMouseUp);
    return () => window.removeEventListener('mouseup', handleGlobalMouseUp);
  }, [isDragging]);

  return (
    <div className={cn("flex-1 overflow-auto", className)}>
      <div className="min-w-full">
        {/* Header Row */}
        <div className="grid grid-cols-8 gap-1 mb-2">
          <div className="w-12"></div>
          {days.map((day) => (
            <div
              key={day}
              className={cn(
                "text-center font-medium text-xs py-1 text-neutral-600 rounded-sm transition-colors cursor-pointer",
                "hover:bg-neutral-200",
                activeDay === day && "bg-neutral-100"
              )}
              onMouseEnter={() => handleDayHeaderMouseEnter(day)}
              onMouseLeave={handleDayHeaderMouseLeave}
              onMouseDown={() => handleDayHeaderMouseDown(day)}
              onMouseUp={(e) => handleDayHeaderMouseUp(day)}
            >
              {day}
            </div>
          ))}
        </div>
        {/* Time Rows */}
        <div className="space-y-1">
          {hours.map((hour) => (
            <div key={hour} className="grid grid-cols-8 gap-1">
              <div 
                className={cn(
                  "w-12 text-xs text-neutral-600 py-1 text-right pr-2 pt-0 pb-0 rounded-sm transition-colors cursor-pointer",
                  "hover:bg-neutral-200",
                  activeHour === hour && "bg-neutral-100"
                )}
                onMouseEnter={() => handleHourHeaderMouseEnter(hour)}
                onMouseLeave={handleHourHeaderMouseLeave}
                onMouseDown={() => handleHourHeaderMouseDown(hour)}
                onMouseUp={(e) => handleHourHeaderMouseUp(hour)}
              >
                {hour}
              </div>
              {days.map((day) => {
                const cellId = `${day}-${hour}`;
                const isHovered = hoveredDay === day || hoveredHour === hour;
                const isActive = activeDay === day || activeHour === hour;
                const isSelected = selectedCells.has(cellId);
                const isInDragPreview = dragPreview.has(cellId);
                return (
                  <DaypartPickerCell
                    key={cellId}
                    day={day}
                    hour={hour}
                    variant={isSelected ? "selected" : "default"}
                    className={cn(
                      isHovered && "opacity-40",
                      isActive && "opacity-20",
                      isInDragPreview && !isSelected && "opacity-60"
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