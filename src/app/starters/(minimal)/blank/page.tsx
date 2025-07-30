import { GlobalNav } from "@/components/ui/global-nav";

export default function Page() {
  return (
    <div className="bg-primary-900 flex min-h-full flex-row">
      <GlobalNav />
      <div className="h-screen w-full bg-neutral-50" />
    </div>
  );
}
