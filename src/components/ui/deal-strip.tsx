import type * as React from "react";
import { DealCard } from "./deal-card";
import { Badge } from "./badge";
import { Calendar, LaptopMinimal } from "lucide-react";

function DealStrip() {
  return (
    <div className="p-4 bg-neutral-200 gap-2 flex flex-col w-fit border-r border-neutral-900/10">
      <DealCard title="Schedule" icon={<Calendar className="h-4 w-4" />}>
        <Badge>15-08-2025 - 15-09-2025</Badge>
      </DealCard>
      <DealCard />
      <DealCard title="Formats" icon={<LaptopMinimal className="h-4 w-4" />}>
        <Badge label="Format">2m2</Badge>
        <Badge>Billboard</Badge>
        <Badge>16:9</Badge>
        <Badge>Bus shelter</Badge>
      </DealCard>
    </div>
  );
}

export { DealStrip }; 