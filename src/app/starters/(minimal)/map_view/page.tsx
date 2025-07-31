"use client";

import { DealStrip } from "@/components/ui/deal-strip";
import { GlobalNav } from "@/components/ui/global-nav";
import { HeaderPlanner } from "@/components/ui/planner-header";
import { CampaignInfoPanel } from "@/components/ui/campaign-info-panel";
import { useState } from "react";

export default function MapView() {
  const [isPanelOpen, setIsPanelOpen] = useState(true);

  const togglePanel = () => {
    setIsPanelOpen(!isPanelOpen);
  };
  return (
    <div className="bg-primary-900 flex h-screen w-screen flex-row p-2">
      <GlobalNav className="h-full" />
      <main className="flex h-full w-full flex-row overflow-hidden rounded-md">
        {isPanelOpen && <CampaignInfoPanel onToggle={togglePanel} />}
        <div className="flex h-full w-full flex-col bg-neutral-50">
          <HeaderPlanner isPanelOpen={isPanelOpen} onToggle={togglePanel} />
          <div className="flex h-full w-full flex-row overflow-hidden rounded-md shadow-md">
            <DealStrip className="h-full w-96 overflow-y-auto" />
            <div className="h-full w-full flex-1 bg-neutral-100">
              {/* Content here */}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
