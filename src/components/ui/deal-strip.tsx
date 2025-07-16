import type * as React from "react";
import { DealCard } from "./deal-card";
import { Badge } from "./badge";
import { Building2, Calendar, Flag, LaptopMinimal, ListChecks, MapPin, Tag } from "lucide-react";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

function DealStrip() {
  return (
    <div className="p-2 bg-neutral-200 gap-2 flex flex-col w-sm border-r border-neutral-900/10">
      <Accordion type="multiple" defaultValue={["deal-line-info", "filters"]} className="w-full">
        <AccordionItem value="deal-line-info">
          <AccordionTrigger>Deal Line Info</AccordionTrigger>
          <AccordionContent className="flex flex-col gap-2">
            <DealCard title="Schedule" icon={<Calendar className="h-4 w-4" />}><Badge>15-08-2025 - 15-09-2025</Badge></DealCard>
            <DealCard title="Environment" icon={<Building2 className="h-4 w-4" />} variant="required" />
            <DealCard title="Location" icon={<MapPin className="h-4 w-4" />} variant="required" />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="filters">
          <AccordionTrigger>Filters</AccordionTrigger>
          <AccordionContent className="flex flex-col gap-2">
            <DealCard title="Format" icon={<LaptopMinimal className="h-4 w-4" />}>
              <Badge label="Format">2m2</Badge>
              <Badge>Billboard</Badge>
              <Badge>16:9</Badge>
              <Badge>Bus shelter</Badge>
            </DealCard>
            <DealCard />
            <DealCard title="Tags" variant="default" icon={<Tag className="h-4 w-4" />}  />
            <DealCard title="Frame List" variant="default" icon={<ListChecks className="h-4 w-4" />}  />
            <DealCard title="Venue Taxonomy" variant="default" icon={<Flag className="h-4 w-4" />}  />
            <DealCard title="Visual Units" variant="default" icon={<Flag className="h-4 w-4" />}  />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}

export { DealStrip }; 