import React from "react";
import { Tabs, TabsList, TabsTrigger } from "./tabs";
import { ChartColumnIncreasing, Grid2x2Plus, Map, Plus } from "lucide-react";
import { Button } from "./button";

const HeaderPlanner = () => {
  return <div className="w-full flex items-center border-b border-neutral-200 gap-2 py-2">
          <div className="w-96 border-r-1 border-neutral-300 px-2">Campaign name</div>
          <div className="flex-1 flex items-center gap-2">
            <Tabs>  
                <TabsList>
                    <TabsTrigger value="dealline1">Deal Line 1</TabsTrigger>
                    <TabsTrigger value="dealline2">Deal Line 2</TabsTrigger>
                </TabsList>
            </Tabs>
            <Button variant="ghost" size="xs">
              <Plus /> Add Deal Line
            </Button>
          </div>
          <div className="px-2">
            <Tabs>  
                <TabsList>
                    <TabsTrigger value="tab1"> <Map />Map</TabsTrigger>
                    <TabsTrigger value="tab2"> <Grid2x2Plus />Overview</TabsTrigger>
                    <TabsTrigger value="tab3"> <ChartColumnIncreasing />Review</TabsTrigger>
                </TabsList>
            </Tabs>
          </div>
        </div>;
};

export { HeaderPlanner }; 