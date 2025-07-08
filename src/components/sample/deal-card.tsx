import React from "react";
import { Badge } from "../ui/badge";
import { MapPin } from "lucide-react";
import { DealCard as DealCardComponent } from "../ui/deal-card";

export const DealCard = () => {
    return (
        <DealCardComponent icon={<MapPin className="size-5" />} title="Location">
            <Badge />
            {/* <Chip variant="include" label="Ciudad">Lisboa</Chip>
            <Chip variant="exclude" >Porto</Chip>
            <Chip variant="include" >Cascais</Chip>
            <Chip variant="include" >Braga</Chip>
            <Chip variant="include" >Aveiro</Chip>
            <Chip variant="include" >Faro</Chip>
            <Chip variant="include" >Carcabelos</Chip> */}
        </DealCardComponent>
    );
};