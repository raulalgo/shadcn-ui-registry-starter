import { GlobalNav } from "@/components/ui/global-nav";
import { Input } from "@/components/ui/input";
import { L1Header } from "@/components/ui/l1-header";
import { Button } from "@/components/ui/button";

export default async function MapView() {
  return (
    <div className="bg-primary-900 flex h-screen w-screen flex-row p-2">
      <GlobalNav className="h-full" selectedPage="campaigns" />
      <main className="h-full w-full rounded-md bg-neutral-100">
        <L1Header h1="Campaign Management" />
        <div className="flex w-full flex-row gap-2 p-2">
          <Input placeholder="Search" fit="sm" />
        </div>
      </main>
    </div>
  );
}
