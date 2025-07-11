import { DealCard } from "@/components/ui/deal-card";
import { Badge } from "@/components/ui/badge";
import { Target, TrendingUp, BarChart3, DollarSign, Users, Globe, Scissors } from "lucide-react";

export const dealCard = {
  name: "deal-card",
  components: {
    Default: (
      <DealCard title="Location" />
    ),
    "With Icon": (
      <DealCard 
        title="Marketing Campaign"
        icon={<TrendingUp className="h-4 w-4" />}
      >
        <Badge variant="include">Budget: $10K</Badge>
        <Badge variant="exclude">Spent: $7.5K</Badge>
        <Badge variant="include">ROI: 120%</Badge>
      </DealCard>
    ),
    "Multiple Objectives": (
      <DealCard title="Quarterly Objectives" icon={<BarChart3 className="h-4 w-4" />}>
        <Badge variant="include">Revenue Growth</Badge>
        <Badge variant="exclude">Customer Acquisition</Badge>
        <Badge variant="include">Market Expansion</Badge>
        <Badge variant="exclude">Cost Reduction</Badge>
      </DealCard>
    ),
  },
}; 