import { Badge } from "@/components/ui/badge";
import { DealCard } from "@/components/ui/deal-card";
import { MapPin, Proportions } from "lucide-react";

export const dealCard = {
  name: "deal-card",
  components: {
    Location: <DealCard icon={<MapPin className="size-5" />} title="Location">
            <Badge />  
            {/* <Badge variant="include" label="Ciudad">Lisboa</Badge>
            <Badge variant="exclude" >Porto</Badge>
            <Badge variant="include" >Cascais</Badge>
            <Badge variant="include" >Braga</Badge>
            <Badge variant="include" >Aveiro</Badge>
            <Badge variant="include" >Faro</Badge>
            <Badge variant="include" >Carcabelos</Badge> */}
        </DealCard>,
    Format: <DealCard icon={<Proportions className="size-5" />} title="Format">
            <Badge />
            {/* <Badge variant="include" >16:9</Badge>
            <Badge variant="include" >Billboards</Badge>
            <Badge variant="include" >Bus shelter</Badge>
            <Badge variant="include" >Kiosk</Badge>
            <Badge variant="exclude" >MUPI</Badge> */}
        </DealCard>,
  },
};