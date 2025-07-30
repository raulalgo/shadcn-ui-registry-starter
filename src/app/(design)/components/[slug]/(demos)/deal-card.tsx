import { Badge } from "@/components/ui/badge";
import { DealCard } from "@/components/ui/deal-card";
import { Calendar, LaptopMinimal } from "lucide-react";

export const dealCard = {
  name: "deal-card",
  components: {
    Default: <DealCard />,
    Formats: (
      <DealCard title="Formats" icon={<LaptopMinimal className="h-4 w-4" />}>
        <Badge label="Format">2m2</Badge>
        <Badge>Billboard</Badge>
        <Badge>16:9</Badge>
        <Badge>Bus shelter</Badge>
      </DealCard>
    ),
    Placeholder: <DealCard variant="default" title="Tags" />,
    Required: (
      <DealCard
        variant="required"
        title="Schedule"
        icon={<Calendar className="h-4 w-4" />}
      />
    ),
  },
};
