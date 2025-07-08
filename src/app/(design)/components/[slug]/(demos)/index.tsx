import type { ReactElement, ReactNode } from "react";

import { button } from "@/app/(design)/components/[slug]/(demos)/button";
import { badge } from "@/app/(design)/components/[slug]/(demos)/badge";
import { dealCard } from "@/app/(design)/components/[slug]/(demos)/deal-card";

interface Demo {
  name: string; // this must match the `registry.json` name
  components?: {
    [name: string]: ReactNode | ReactElement;
  };
}

export const demos: { [name: string]: Demo } = {
  button,
  badge,
  "deal-card": dealCard,
};
