import React from "react";
import { Tabs, TabsList, TabsTrigger } from "./tabs";
import { Button } from "./button";
import { Sidebar } from "lucide-react";

interface HeaderPlannerProps {
  isPanelOpen?: boolean;
  onToggle?: () => void;
}

const HeaderPlanner = ({
  isPanelOpen = false,
  onToggle,
}: HeaderPlannerProps) => {
  return (
    <div className="flex w-full items-center gap-2 border-b border-neutral-200 py-2">
      {!isPanelOpen && (
        <div
          id="campaign-name"
          className="flex w-96 items-center justify-between border-r border-neutral-300"
        >
          <div className="px-2">Campaign name</div>
          <Button size="icon" variant="ghost" onClick={onToggle}>
            <Sidebar className="h-4 w-4" />
          </Button>
        </div>
      )}

      <div className="flex flex-1 items-center gap-2">
        <Tabs>
          <TabsList>
            <TabsTrigger value="dealline1">Deal Line 1</TabsTrigger>
            <TabsTrigger value="dealline2">Deal Line 2</TabsTrigger>
          </TabsList>
        </Tabs>
        <Button variant="ghost" size="xs">
          + Add Deal Line
        </Button>
      </div>
      <div className="px-2">
        <Tabs>
          <TabsList>
            <TabsTrigger value="tab1">Map</TabsTrigger>
            <TabsTrigger value="tab2">Overview</TabsTrigger>
            <TabsTrigger value="tab3">Review</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </div>
  );
};

export { HeaderPlanner };
