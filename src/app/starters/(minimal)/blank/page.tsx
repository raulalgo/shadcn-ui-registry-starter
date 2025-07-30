import { GlobalNav } from "@/components/ui/global-nav";

export default function Page() {
  return (
    <div className="flex min-h-full flex-row bg-primary-900">
      <GlobalNav />
      <div className="h-screen w-full bg-neutral-50" />
    </div>
  );
}
