import type * as React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardAction } from "@/components/ui/card";
import { MapPin, EllipsisVertical } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "./button";
import { Chip } from "./chip";

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
        <CardContent className="p-0">
            <Chip variant="include">Lisboa</Chip>
        </CardContent>
    </Card>
  );
}

export { DealCard };