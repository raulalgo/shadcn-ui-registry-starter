import React from "react";

import { cn } from "@/lib/utils";


function DealCard({ className, title="Location", icon, children, ...props }: React.ComponentProps<"div"> & { title: string; icon?: React.ReactNode }) {
  return (
    <>Deal Card</>
  );
}

export { DealCard };