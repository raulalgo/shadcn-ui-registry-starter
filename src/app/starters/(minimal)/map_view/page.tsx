import { GlobalNav } from "@/components/ui/global-nav";
import { DealStrip } from "@/components/ui/deal-strip";

export default async function MapView() {

  return (
    <div className="flex min-h-screen flex-row bg-primary-900 w-screen">
      <GlobalNav className="h-full" />
      <main className="p-2 w-full">
        <div className="flex flex-row rounded-md shadow-md overflow-hidden w-full gap-0 h-full">
            <DealStrip />
            <div className="flex-1 w-full h-full bg-neutral-100 ">
            </div>
        </div>
      </main>
    </div>
  );
}
