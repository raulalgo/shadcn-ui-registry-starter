import React from "react";
import { EllipsisVertical, MapPin } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "./button";
import { Badge } from "./badge";

function DealRow({className, children, ...props}: React.ComponentProps<"div">) {
    return (
        <div className={cn("w-full flex flex-row-reverse justify-between items-center gap-2 hover:[&>button]:block hover:bg-primary-50 min-h-8 rounded-sm", className)} {...props}>
            {children}
            <Button className="hidden" variant="ghost" size="sm">Add Objective</Button>
        </div>
    );
}

const defaultChildren = [
    <Badge label="City" variant="include">Lisboa</Badge>,
    <Badge variant="exclude">Porto</Badge>,
    <Badge variant="include">Aveiro</Badge>,
    <Badge variant="include">Coimbra</Badge>,
    <Badge variant="include">Braga</Badge>,
    <Badge variant="include">Faro</Badge>
]

function DealCard({ className, title = "Location", icon, children = defaultChildren, ...props }: React.ComponentProps<"div"> & { title: string; icon?: React.ReactNode }) {
  return (
    <div className="flex flex-col rounded-xl border border-card-border bg-card text-card-foreground shadow-sm w-96 p-2 gap-2">
        <div className="flex flex-row gap-2 items-center">
            {icon || <MapPin className="h-4 w-4" />}
            <div className="font-semibold leading-none p-0 grow">{title}</div>
            <Button variant="ghost" size="icon" className="p-0">
                <EllipsisVertical className="size-5" />
            </Button>
        </div>
        <div className="py-0 px-4">
            {React.Children.map(children, (child) => (
                <DealRow>{child}</DealRow>
            ))}
        </div>
    </div>
  );
}

export { DealCard };