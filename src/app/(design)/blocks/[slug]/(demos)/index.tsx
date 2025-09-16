import type { ReactElement, ReactNode } from "react";
import { actionPanelBlock } from "./action-panel";
import { daypartActionPanelBlock } from "./daypart-action-panel";
import { daypartPanelDeprecated } from "./daypart-panel-deprecated";
import { daypartPickerBlock } from "./daypart-picker";
import { dealStrip } from "./deal-strip";
import { globalNav } from "./global-nav";
import { l1Header } from "./l1-header";
import { campaignInfoPanel } from "./campaign-info-panel";

interface Block {
  name: string; // this must match the `registry.json` name
  components?: {
    [name: string]: ReactNode | ReactElement;
  };
}

export const demos: { [name: string]: Block } = {
  "deal-strip": dealStrip,
  "global-nav": globalNav,
  "daypart-panel-deprecated": daypartPanelDeprecated,
  "action-panel": actionPanelBlock,
  "daypart-action-panel": daypartActionPanelBlock,
  "daypart-picker": daypartPickerBlock,
  "l1-header": l1Header,
  "campaign-info-panel": campaignInfoPanel,
};
