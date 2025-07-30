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

export default async function MapView() {
  return (
    <div className="bg-primary-900 flex h-screen w-screen flex-row p-2">
      <GlobalNav className="h-full" selectedPage="campaigns" />
      <main className="h-full w-full rounded-md bg-neutral-100">
        <L1Header h1="Campaign Management" />
        <div className="flex w-full flex-row gap-2 p-4">
          <Input
            placeholder="Search Deal ID / Name"
            fit="sm"
            className="w-56"
          />
          <Select>
            <SelectTrigger fit="sm" className="w-32">
              <SelectValue placeholder="Select Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="mixed">Mixed</SelectItem>
              <SelectItem value="proposal">Proposal</SelectItem>
              <SelectItem value="option">Option</SelectItem>
              <SelectItem value="confirmed">Confirmed</SelectItem>
              <SelectItem value="live">Live</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger fit="sm" className="w-32">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="guaranteed">Guaranteed</SelectItem>
              <SelectItem value="non-guaranteed">Non Guaranteed</SelectItem>
              <SelectItem value="direct">Direct</SelectItem>
            </SelectContent>
          </Select>
          <Button size="sm">
            <PlusIcon />
            Filter
          </Button>
        </div>
      </main>
    </div>
  );
}
