import * as React from "react";
import { ActionPanel, ActionPanelProps } from "./action-panel";
import { DaypartPicker } from "./daypart-picker";

export interface DaypartActionPanelProps extends ActionPanelProps {
  // Add any daypart-specific props here
}

export function DaypartActionPanel(props: DaypartActionPanelProps) {
  return (
    <ActionPanel
      title="Daypart Selection"
      {...props}
    >
      <DaypartPicker />
    </ActionPanel>
  );
} 