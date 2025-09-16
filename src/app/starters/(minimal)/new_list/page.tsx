import { GlobalNav } from "@/components/ui/global-nav";
import { L1Header } from "@/components/ui/l1-header";
import { Button } from "@/components/ui/button";
import { DataTableAGGridDemo } from "@/components/ui/data-table-ag-grid-demo";
import { Toaster } from "@/components/ui/sonner";

export default async function NewListView() {
  return (
    <div className="bg-primary-900 flex h-screen w-screen flex-row py-2 pr-2">
      <GlobalNav className="h-full" selectedPage="campaigns" />
      <main className="flex h-full w-full flex-col overflow-y-scroll rounded-md bg-neutral-100">
        <L1Header h1="Campaign Management" />
        <div className="flex-1 px-4">
          <DataTableAGGridDemo />
        </div>
      </main>
      <Toaster />
    </div>
  );
}
