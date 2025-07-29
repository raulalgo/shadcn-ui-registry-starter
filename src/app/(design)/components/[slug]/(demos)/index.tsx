import type { ReactElement, ReactNode } from "react";

import { globalNav } from "@/app/(design)/blocks/[slug]/(demos)/global-nav";
import { badge } from "@/app/(design)/components/[slug]/(demos)/badge";
import { button } from "@/app/(design)/components/[slug]/(demos)/button";
import { dealCard } from "@/app/(design)/components/[slug]/(demos)/deal-card";
import { dropdownMenu } from "@/app/(design)/components/[slug]/(demos)/dropdown-menu";
import { map } from "@/app/(design)/components/[slug]/(demos)/map";
import { navigationItem } from "@/app/(design)/components/[slug]/(demos)/navigation-item";
import { headerPlanner } from "@/app/(design)/components/[slug]/(demos)/planner-header";
import { tabs } from "@/app/(design)/components/[slug]/(demos)/tabs";

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
  "global-nav": globalNav,
  map,
  "header-planner": headerPlanner,
  tabs: tabs,
  "dropdown-menu": dropdownMenu,
};
