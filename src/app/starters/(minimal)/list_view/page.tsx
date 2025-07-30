import { DealStrip } from "@/components/ui/deal-strip";
import { GlobalNav } from "@/components/ui/global-nav";
import { L1Header } from "@/components/ui/l1-header";
import { HeaderPlanner } from "@/components/ui/planner-header";

export default async function MapView() {
  return (
    <div className="flex h-screen w-screen flex-row bg-primary-900 p-2">
      <GlobalNav className="h-full" selectedPage="campaigns" />
      <main className="h-full w-full rounded-md bg-neutral-100 p-2">
        <L1Header h1="Campaign Management" />
      </main>
    </div>
  );
}
