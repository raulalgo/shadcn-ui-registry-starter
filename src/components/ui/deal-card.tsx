import React from "react";
import { EllipsisVertical } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "./button";

function DealRow({className, children, ...props}: React.ComponentProps<"div">) {
    return (
        <div className={cn("w-full flex flex-row-reverse justify-between items-center gap-2 hover:[&>button]:block hover:bg-primary-50 min-h-8 rounded-sm", className)} {...props}>
            {children}
            <Button className="hidden" variant="ghost" size="sm">Add Objective</Button>
        </div>
    );
}

function DealCard({ className, title, icon, children, ...props }: React.ComponentProps<"div"> & { title: string; icon?: React.ReactNode }) {
  return (
    <div className="flex flex-col rounded-xl border border-card-border bg-card text-card-foreground shadow-sm w-96 p-2 gap-2">
        <div className="flex flex-row gap-2 items-center">
            {icon}
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