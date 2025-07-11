import type { ReactElement, ReactNode } from "react";
import { dealStrip } from "./deal-strip";


interface Block {
  name: string; // this must match the `registry.json` name
  components?: {
    [name: string]: ReactNode | ReactElement;
  };
}

export const demos: { [name: string]: Block } = {
  "deal-strip": dealStrip,
};