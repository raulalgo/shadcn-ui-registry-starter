import { DealStrip } from "@/components/ui/deal-strip";
import { GlobalNav } from "@/components/ui/global-nav";
import { HeaderPlanner } from "@/components/ui/planner-header";

export default async function MapView() {
  return (
    <div className="flex h-screen w-screen flex-row bg-primary-900">
      <GlobalNav className="h-full" />
      <main className="h-full w-full p-2">
        <div className="flex h-full w-full flex-col overflow-hidden rounded-md bg-neutral-50">
          <HeaderPlanner />
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
