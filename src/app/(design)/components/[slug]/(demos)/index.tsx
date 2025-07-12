import type { ReactElement, ReactNode } from "react";

import { button } from "@/app/(design)/components/[slug]/(demos)/button";
import { badge } from "@/app/(design)/components/[slug]/(demos)/badge";
import { dealCard } from "@/app/(design)/components/[slug]/(demos)/deal-card";
import { navigationItem } from "@/app/(design)/components/[slug]/(demos)/navigation-item";

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
  "navigation-item": navigationItem,
};
