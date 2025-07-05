import type * as React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardAction } from "@/components/ui/card";

import { cn } from "@/lib/utils";

function DealCard({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <Card className={cn("flex flex-col gap-6 rounded-xl border border-card-border bg-card py-6 text-card-foreground shadow-sm", className)} {...props} />
  );
}

export { DealCard };