"use client";
import * as React from "react";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

export interface DaypartPickerProps {
  className?: string;
}

const daypartPickerCellVariants = cva(
  "w-full h-5 rounded-sm box-border border border-neutral-300 transition-all",
  {
    variants: {
      selected: {
        true: "bg-primary-800 outline-2 outline-primary-600 outline-offset-[-2px]",
        false: "bg-primary-200",
      },
      hovered: {
        true: "opacity-60",
        false: "",
      },
      active: {
        true: "bg-primary-400",
        false: "",
      },
    },
    defaultVariants: {
      selected: false,
      hovered: false,
      active: false,
    },
  }
);

interface DaypartPickerCellProps extends VariantProps<typeof daypartPickerCellVariants> {
  onMouseEnter: (e: React.MouseEvent) => void;
  onMouseDown: (e: React.MouseEvent) => void;
  onMouseUp: (e: React.MouseEvent) => void;
}

function DaypartPickerCell({ selected, hovered, active, onMouseEnter, onMouseDown, onMouseUp }: DaypartPickerCellProps) {
  return (
    <button
      type="button"
      className={cn(
        daypartPickerCellVariants({ selected, hovered, active }),
        "hover:bg-primary-300 active:bg-primary-400"
      )}
      onMouseEnter={onMouseEnter}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      tabIndex={0}
    />
  );
}

function getCellRange(
  anchor: { day: string; hour: string },
  target: { day: string; hour: string },
  days: string[],
  hours: string[]
): Set<string> {
  const startDayIdx = days.indexOf(anchor.day);
  const endDayIdx = days.indexOf(target.day);
  const startHourIdx = hours.indexOf(anchor.hour);
  const endHourIdx = hours.indexOf(target.hour);
  const range = new Set<string>();
  for (let d = Math.min(startDayIdx, endDayIdx); d <= Math.max(startDayIdx, endDayIdx); d++) {
    for (let h = Math.min(startHourIdx, endHourIdx); h <= Math.max(startHourIdx, endHourIdx); h++) {
      range.add(`${days[d]}-${hours[h]}`);
    }
  }
  return range;
}

export function DaypartPicker({ className }: DaypartPickerProps) {
  const days = ["MO", "TU", "WE", "TH", "FR", "SA", "SU"];
  const hours = Array.from({ length: 24 }, (_, i) => `${i.toString().padStart(2, "0")}:00`);

  const [selectedCells, setSelectedCells] = React.useState<Set<string>>(new Set());
  const [hoveredDay, setHoveredDay] = React.useState<string | null>(null);
  const [hoveredHour, setHoveredHour] = React.useState<string | null>(null);
  const [shiftAnchor, setShiftAnchor] = React.useState<{ day: string; hour: string } | null>(null);
  const [previewRange, setPreviewRange] = React.useState<Set<string>>(new Set());
  const [shiftHeld, setShiftHeld] = React.useState(false);
  const [headerAnchor, setHeaderAnchor] = React.useState<{ type: 'day' | 'hour', value: string } | null>(null);
  const [headerPreviewRange, setHeaderPreviewRange] = React.useState<Set<string>>(new Set());
  const [mouseAnchor, setMouseAnchor] = React.useState<{ day: string; hour: string } | null>(null);
  const [mousePreviewRange, setMousePreviewRange] = React.useState<Set<string>>(new Set());
  const [isMouseSelecting, setIsMouseSelecting] = React.useState(false);
  const [lastMouseDownCell, setLastMouseDownCell] = React.useState<{ day: string; hour: string } | null>(null);

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Shift") setShiftHeld(true);
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === "Shift") {
        setShiftHeld(false);
        setPreviewRange(new Set());
        setShiftAnchor(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  const handleCellClick = (day: string, hour: string, e: React.MouseEvent) => {
    const cellId = `${day}-${hour}`;
    if (e.shiftKey) {
      if (!shiftAnchor) {
        // Start range selection
        setShiftAnchor({ day, hour });
        setSelectedCells(prev => {
          const next = new Set(prev);
          next.add(cellId);
          return next;
        });
      } else {
        // Confirm range selection
        const range = getCellRange(shiftAnchor, { day, hour }, days, hours);
        setSelectedCells(prev => {
          const next = new Set(prev);
          range.forEach(cell => next.add(cell));
          return next;
        });
        setPreviewRange(new Set());
        setShiftAnchor(null);
      }
    } else {
      // Normal toggle
      setSelectedCells(prev => {
        const next = new Set(prev);
        if (next.has(cellId)) {
          next.delete(cellId);
        } else {
          next.add(cellId);
        }
        return next;
      });
      setShiftAnchor(null);
      setPreviewRange(new Set());
    }
  };

  const handleCellMouseEnter = (day: string, hour: string, e: React.MouseEvent) => {
    // Show preview for shift+click range selection
    if (shiftHeld && shiftAnchor) {
      const range = getCellRange(shiftAnchor, { day, hour }, days, hours);
      setPreviewRange(range);
    } else {
      setPreviewRange(new Set());
    }
  };

  const handleDayHeaderClick = (day: string, e?: React.MouseEvent) => {
    if (e?.shiftKey) {
      if (!headerAnchor) {
        setHeaderAnchor({ type: 'day', value: day });
        // Select this row
        setSelectedCells(prev => {
          const next = new Set(prev);
          const dayCells = hours.map(hour => `${day}-${hour}`);
          dayCells.forEach(cellId => next.add(cellId));
          return next;
        });
      } else if (headerAnchor.type === 'day') {
        // Range select rows
        const startIdx = Math.min(days.indexOf(headerAnchor.value), days.indexOf(day));
        const endIdx = Math.max(days.indexOf(headerAnchor.value), days.indexOf(day));
        const range = new Set<string>();
        for (let d = startIdx; d <= endIdx; d++) {
          hours.forEach(hour => range.add(`${days[d]}-${hour}`));
        }
        setSelectedCells(prev => {
          const next = new Set(prev);
          range.forEach(cellId => next.add(cellId));
          return next;
        });
        setHeaderPreviewRange(new Set());
        setHeaderAnchor(null);
      }
    } else {
      setSelectedCells(prev => {
        const next = new Set(prev);
        const dayCells = hours.map(hour => `${day}-${hour}`);
        const allSelected = dayCells.every(cellId => next.has(cellId));
        if (allSelected) {
          dayCells.forEach(cellId => next.delete(cellId));
        } else {
          dayCells.forEach(cellId => next.add(cellId));
        }
        return next;
      });
      setShiftAnchor(null);
      setPreviewRange(new Set());
      setHeaderAnchor(null);
      setHeaderPreviewRange(new Set());
    }
  };

  const handleHourHeaderClick = (hour: string, e?: React.MouseEvent) => {
    if (e?.shiftKey) {
      if (!headerAnchor) {
        setHeaderAnchor({ type: 'hour', value: hour });
        // Select this column
        setSelectedCells(prev => {
          const next = new Set(prev);
          const hourCells = days.map(day => `${day}-${hour}`);
          hourCells.forEach(cellId => next.add(cellId));
          return next;
        });
      } else if (headerAnchor.type === 'hour') {
        // Range select columns
        const startIdx = Math.min(hours.indexOf(headerAnchor.value), hours.indexOf(hour));
        const endIdx = Math.max(hours.indexOf(headerAnchor.value), hours.indexOf(hour));
        const range = new Set<string>();
        for (let h = startIdx; h <= endIdx; h++) {
          days.forEach(day => range.add(`${day}-${hours[h]}`));
        }
        setSelectedCells(prev => {
          const next = new Set(prev);
          range.forEach(cellId => next.add(cellId));
          return next;
        });
        setHeaderPreviewRange(new Set());
        setHeaderAnchor(null);
      }
    } else {
      setSelectedCells(prev => {
        const next = new Set(prev);
        const hourCells = days.map(day => `${day}-${hour}`);
        const allSelected = hourCells.every(cellId => next.has(cellId));
        if (allSelected) {
          hourCells.forEach(cellId => next.delete(cellId));
        } else {
          hourCells.forEach(cellId => next.add(cellId));
        }
        return next;
      });
      setShiftAnchor(null);
      setPreviewRange(new Set());
      setHeaderAnchor(null);
      setHeaderPreviewRange(new Set());
    }
  };

  const handleDayHeaderMouseEnter = (day: string) => {
    setHoveredDay(day);
    if (shiftHeld && headerAnchor && headerAnchor.type === 'day') {
      const startIdx = Math.min(days.indexOf(headerAnchor.value), days.indexOf(day));
      const endIdx = Math.max(days.indexOf(headerAnchor.value), days.indexOf(day));
      const range = new Set<string>();
      for (let d = startIdx; d <= endIdx; d++) {
        hours.forEach(hour => range.add(`${days[d]}-${hour}`));
      }
      setHeaderPreviewRange(range);
    } else {
      setHeaderPreviewRange(new Set());
    }
  };

  const handleDayHeaderMouseLeave = () => {
    setHoveredDay(null);
    setHeaderPreviewRange(new Set());
  };

  const handleHourHeaderMouseEnter = (hour: string) => {
    setHoveredHour(hour);
    if (shiftHeld && headerAnchor && headerAnchor.type === 'hour') {
      const startIdx = Math.min(hours.indexOf(headerAnchor.value), hours.indexOf(hour));
      const endIdx = Math.max(hours.indexOf(headerAnchor.value), hours.indexOf(hour));
      const range = new Set<string>();
      for (let h = startIdx; h <= endIdx; h++) {
        days.forEach(day => range.add(`${day}-${hours[h]}`));
      }
      setHeaderPreviewRange(range);
    } else {
      setHeaderPreviewRange(new Set());
    }
  };

  const handleHourHeaderMouseLeave = () => {
    setHoveredHour(null);
    setHeaderPreviewRange(new Set());
  };

  React.useEffect(() => {
    if (!shiftHeld) {
      setHeaderAnchor(null);
      setHeaderPreviewRange(new Set());
    }
  }, [shiftHeld]);

  // Mouse drag selection handlers
  const handleCellMouseDown = (day: string, hour: string, e: React.MouseEvent) => {
    if (e.button !== 0) return; // Only left click
    setLastMouseDownCell({ day, hour });
    // Only handle drag selection here, not shift+click
    if (!e.shiftKey) {
      setMouseAnchor({ day, hour });
      setIsMouseSelecting(true);
      setMousePreviewRange(new Set([`${day}-${hour}`]));
    }
  };

  const handleCellMouseEnterDrag = (day: string, hour: string, e: React.MouseEvent) => {
    if (isMouseSelecting && mouseAnchor) {
      const range = getCellRange(mouseAnchor, { day, hour }, days, hours);
      setMousePreviewRange(range);
    }
  };

  const handleCellMouseUp = (day: string, hour: string, e: React.MouseEvent) => {
    const cellId = `${day}-${hour}`;
    
    // Handle shift+click as a full click interaction
    if (e.shiftKey) {
      if (!shiftAnchor) {
        // First shift+click: set anchor and show preview
        setShiftAnchor({ day, hour });
        setPreviewRange(new Set([`${day}-${hour}`]));
      } else {
        // Second shift+click: confirm range selection
        const range = getCellRange(shiftAnchor, { day, hour }, days, hours);
        setSelectedCells(prev => {
          const next = new Set(prev);
          range.forEach(cell => next.add(cell));
          return next;
        });
        setPreviewRange(new Set());
        setShiftAnchor(null);
      }
      return;
    }
    
    // Drag paradigm
    if (isMouseSelecting && mouseAnchor) {
      const startKey = `${mouseAnchor.day}-${mouseAnchor.hour}`;
      const endKey = `${day}-${hour}`;
      if (startKey === endKey) {
        // Single cell: toggle
        setSelectedCells(prev => {
          const next = new Set(prev);
          if (next.has(startKey)) {
            next.delete(startKey);
          } else {
            next.add(startKey);
          }
          return next;
        });
      } else {
        // Range: select all
        const range = getCellRange(mouseAnchor, { day, hour }, days, hours);
        setSelectedCells(prev => {
          const next = new Set(prev);
          range.forEach(cell => next.add(cell));
          return next;
        });
      }
      setMouseAnchor(null);
      setMousePreviewRange(new Set());
      setIsMouseSelecting(false);
      return;
    }
    
    // Single click (mouse down and up on same cell, no shift)
    if (lastMouseDownCell && lastMouseDownCell.day === day && lastMouseDownCell.hour === hour) {
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
    setLastMouseDownCell(null);
  };

  // Confirm selection if mouse up happens outside the grid
  React.useEffect(() => {
    if (!isMouseSelecting) return;
    const handleGlobalMouseUp = () => {
      if (mouseAnchor && mousePreviewRange.size > 0) {
        setSelectedCells(prev => {
          const next = new Set(prev);
          mousePreviewRange.forEach(cell => next.add(cell));
          return next;
        });
      }
      setMouseAnchor(null);
      setMousePreviewRange(new Set());
      setIsMouseSelecting(false);
    };
    window.addEventListener('mouseup', handleGlobalMouseUp);
    return () => window.removeEventListener('mouseup', handleGlobalMouseUp);
  }, [isMouseSelecting, mouseAnchor, mousePreviewRange]);

  return (
    <div className={cn("flex-1 overflow-auto", className)}>
      <div className="min-w-full">
        {/* Header Row */}
        <div className="grid grid-cols-8 gap-1 mb-2">
          <div className="w-12"></div>
          {days.map((day) => (
            <button
              key={day}
              type="button"
              className="text-center font-medium text-xs py-1 text-neutral-600 rounded-sm transition-colors hover:bg-neutral-100 focus:bg-neutral-100"
              onClick={e => handleDayHeaderClick(day, e)}
              onMouseEnter={() => handleDayHeaderMouseEnter(day)}
              onMouseLeave={handleDayHeaderMouseLeave}
              tabIndex={0}
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
                type="button"
                className="w-12 text-xs text-neutral-600 py-1 text-right pr-2 pt-0 pb-0 rounded-sm transition-colors hover:bg-neutral-100 focus:bg-neutral-100"
                onClick={e => handleHourHeaderClick(hour, e)}
                onMouseEnter={() => handleHourHeaderMouseEnter(hour)}
                onMouseLeave={handleHourHeaderMouseLeave}
                tabIndex={0}
              >
                {hour}
              </button>
              {days.map((day) => {
                const cellId = `${day}-${hour}`;
                const hovered = hoveredDay === day || hoveredHour === hour;
                const active = previewRange.has(cellId) || headerPreviewRange.has(cellId) || mousePreviewRange.has(cellId);
                return (
                  <DaypartPickerCell
                    key={cellId}
                    selected={selectedCells.has(cellId)}
                    hovered={hovered}
                    active={active}
                    onMouseEnter={e => { handleCellMouseEnter(day, hour, e); handleCellMouseEnterDrag(day, hour, e); }}
                    onMouseDown={e => handleCellMouseDown(day, hour, e)}
                    onMouseUp={e => handleCellMouseUp(day, hour, e)}
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