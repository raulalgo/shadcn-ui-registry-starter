import { Chip } from "@/components/ui/chip";
import { DealCard } from "@/components/ui/deal-card";
import { MapPin, Proportions } from "lucide-react";

export const dealCard = {
  name: "deal-card",
  components: {
    Location: <DealCard icon={<MapPin className="size-5" />} title="Location">
            <Chip variant="include" label="Ciudad">Lisboa</Chip>
            <Chip variant="exclude" >Porto</Chip>
            <Chip variant="include" >Cascais</Chip>
            <Chip variant="include" >Braga</Chip>
            <Chip variant="include" >Aveiro</Chip>
            <Chip variant="include" >Faro</Chip>
            <Chip variant="include" >Carcabelos</Chip>
        </DealCard>,
    Format: <DealCard icon={<Proportions className="size-5" />} title="Format">
            <Chip variant="include" >16:9</Chip>
            <Chip variant="include" >Billboards</Chip>
            <Chip variant="include" >Bus shelter</Chip>
            <Chip variant="include" >Kiosk</Chip>
            <Chip variant="exclude" >MUPI</Chip>
        </DealCard>,
  },
};