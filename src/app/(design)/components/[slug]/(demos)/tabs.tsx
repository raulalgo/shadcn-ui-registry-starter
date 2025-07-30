import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Calendar,
  ChartColumnIncreasing,
  Grid2x2Plus,
  Map,
} from "lucide-react";

export const tabs = {
  name: "tabs",
  components: {
    Default: (
      <Tabs>
        <TabsList>
          <TabsTrigger value="tab1">
            {" "}
            <Map />
            Map
          </TabsTrigger>
          <TabsTrigger value="tab2">
            {" "}
            <Grid2x2Plus />
            Overview
          </TabsTrigger>
          <TabsTrigger value="tab3">
            {" "}
            <ChartColumnIncreasing />
            Review
          </TabsTrigger>
        </TabsList>
      </Tabs>
    ),
  },
};
