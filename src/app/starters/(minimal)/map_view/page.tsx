import { GlobalNav } from "@/components/ui/global-nav";
import { DealStrip } from "@/components/ui/deal-strip";

export default async function MapView() {
  return (
    <div className="flex flex-row h-screen w-screen bg-primary-900">
      <GlobalNav className="h-full" />
      <main className="p-2 w-full h-full">
        <div className="flex flex-row rounded-md shadow-md overflow-hidden w-full h-full">
          <DealStrip className="w-96 h-full overflow-y-auto" />
          <div className="flex-1 h-full w-full bg-neutral-100">
            {/* Content here */}
          </div>
        </div>
      </main>
    </div>
  );
}
