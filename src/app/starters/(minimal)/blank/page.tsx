import { GlobalNav } from "@/components/ui/global-nav";

export default function Page() {
  return (
    <div className="flex flex-row bg-primary-900 min-h-full">
      <GlobalNav />
      <div className="w-full h-screen bg-neutral-50"></div>
    </div>
  );
}
