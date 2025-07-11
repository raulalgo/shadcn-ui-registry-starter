import type * as React from "react";

import { cn } from "@/lib/utils";
import { Button } from "./button";
import { EllipsisVertical, MapPin } from "lucide-react";
import { Badge } from "./badge";

function DealRow({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full flex flex-row-reverse justify-between items-center gap-2 hover:[&>button]:block hover:bg-primary-50 min-h-8 rounded-sm [&>.objective-button]:hidden hover:[&>.objective-button]:block">
      {children}
      <Button variant="medium" size="icon" className="objective-button" >Add Objective</Button>
    </div>
  );
}


function DealCard({ title, icon, children }: { title?: string, icon?: React.ReactNode, children?: React.ReactNode }) {
  return (
    <div className="flex flex-col rounded-xl border border-card-border bg-card text-card-foreground shadow-sm w-96 p-2 gap-2">
        <div className="flex flex-row gap-2 items-center">
            {icon || <MapPin className="h-4 w-4" />}
            <div className="font-semibold leading-none p-0 grow">{title || "Default Title"}</div>
            <Button variant="ghost" size="icon" className="p-0"><EllipsisVertical /></Button>
        </div>
        <div className="py-0 px-4">
          {children || (
            <>
              <DealRow><Badge /></DealRow>
              <DealRow><Badge /></DealRow>
              <DealRow><Badge /></DealRow>
            </>
          )}
        </div>
    </div>
  );
}

export { DealCard };