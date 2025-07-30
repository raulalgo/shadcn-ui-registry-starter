import React from "react";
import { Tabs, TabsList, TabsTrigger } from "./tabs";
import { Button } from "./button";

const HeaderPlanner = () => {
  return (
    <div className="flex w-full items-center gap-2 border-b border-neutral-200 py-2">
      <div className="w-96 border-r border-neutral-300 px-2">Campaign name</div>
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
