import type { ReactElement, ReactNode } from "react";
import { dealStrip } from "./deal-strip";
import { globalNav } from "./global-nav";
import { daypartPanel } from "./daypart-panel";


interface Block {
  name: string; // this must match the `registry.json` name
  components?: {
    [name: string]: ReactNode | ReactElement;
  };
}

export const demos: { [name: string]: Block } = {
  "deal-strip": dealStrip,
  "global-nav": globalNav, 
  "daypart-panel": daypartPanel,
};