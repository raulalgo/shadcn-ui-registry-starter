import { DealCard } from "@/components/ui/deal-card";
import { FileText } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const dealCard = {
  name: "deal-card",
  components: {
    Default: <DealCard />,
    Formats: <DealCard title="Formats" icon={<FileText className="h-4 w-4" />}>
        <Badge label="Format">2m2</Badge>
        <Badge>Billboard</Badge>
        <Badge>16:9</Badge>
        <Badge>Bus shelter</Badge>
      </DealCard>,
  },
}; 