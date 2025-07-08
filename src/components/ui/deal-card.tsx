import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardAction } from "@/components/ui/card";
import { EllipsisVertical } from "lucide-react";

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

function DealCard({ className, title, icon, children, ...props }: React.ComponentProps<"div"> & { title: string; icon?: React.ReactNode }) {
  return (
    <Card className="w-96 p-2 gap-0">
        <CardHeader className="p-0 flex items-center gap-2">
            {icon}
            <CardTitle className="p-0 grow">{title}</CardTitle>
            <Button variant="ghost" size="icon" className="p-0">
                <EllipsisVertical className="size-5" />
            </Button>
        </CardHeader>
        <CardContent className="py-0 px-4">
            {React.Children.map(children, (child) => (
                <DealRow>{child}</DealRow>
            ))}
        </CardContent>
    </Card>
  );
}

export { DealCard };