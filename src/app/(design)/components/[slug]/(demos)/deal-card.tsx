import { Chip } from "@/components/ui/chip";
import { DealCard } from "@/components/ui/deal-card";
import { MapPin } from "lucide-react";

export const dealCard = {
  name: "deal-card",
  components: {
    Default: <DealCard icon={<MapPin className="size-5" />} title="Location">
            <Chip variant="include" label="Ciudad">Lisboa</Chip>
            <Chip variant="exclude" >Porto</Chip>
            <Chip variant="include" >Cascais</Chip>
            <Chip variant="include" >Braga</Chip>
            <Chip variant="include" >Aveiro</Chip>
            <Chip variant="include" >Faro</Chip>
            <Chip variant="include" >Carcabelos</Chip>
        </DealCard>,
  },
};