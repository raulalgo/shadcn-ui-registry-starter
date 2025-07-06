import type * as React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardAction } from "@/components/ui/card";
import { MapPin, EllipsisVertical } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "./button";
import { Chip } from "./chip";

function DealRow({className, children, ...props}: React.ComponentProps<"div">) {
    return (
        <div className={cn("w-full flex flex-row-reverse justify-between items-center gap-2 hover:[&>button]:block hover:bg-primary-50 min-h-8 rounded-sm", className)} {...props}>
            {children}
            <Button className="hidden" variant="ghost" size="sm">Add Objective</Button>
        </div>
    );
}

function DealCard({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <Card className="w-96 p-2 gap-0">
        <CardHeader className="p-0 flex items-center gap-2">
            <MapPin className="size-5" />
            <CardTitle className="p-0 grow">Deal Card</CardTitle>
            <Button variant="ghost" size="icon" className="p-0">
                <EllipsisVertical className="size-5" />
            </Button>
        </CardHeader>
        <CardContent className="py-0 px-4">
            <DealRow><Chip variant="include" label="Ciudad">Lisboa</Chip></DealRow>
            <DealRow><Chip variant="exclude" >Porto</Chip></DealRow>
            <DealRow><Chip variant="include" >Cascais</Chip></DealRow>
            <DealRow><Chip variant="include" >Braga</Chip></DealRow>
        </CardContent>
    </Card>
  );
}

export { DealCard };