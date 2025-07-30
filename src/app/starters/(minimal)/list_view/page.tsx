import { GlobalNav } from "@/components/ui/global-nav";
import { Input } from "@/components/ui/input";
import { L1Header } from "@/components/ui/l1-header";
import { Button } from "@/components/ui/button";
import { FilterIcon, PlusIcon, SearchIcon } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DataTableDemo } from "@/components/ui/data-table";

export default async function MapView() {
  return (
    <div className="bg-primary-900 flex h-screen w-screen flex-row py-2 pr-2">
      <GlobalNav className="h-full" selectedPage="campaigns" />
      <main className="h-full w-full overflow-y-scroll rounded-md bg-neutral-100">
        <L1Header h1="Campaign Management" />
        <div className="p-4">
          <DataTableDemo />
        </div>
      </main>
    </div>
  );
}
