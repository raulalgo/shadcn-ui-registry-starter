import ProductGrid from "@/components/product-grid";
import { GlobalNav } from "@/components/ui/global-nav";

export default async function Basic() {
  return (
    <div className="flex min-h-screen flex-row bg-primary-900">
      <GlobalNav className="h-full" />
      <main className="flex-1 p-2">
        <div className="h-full w-full rounded-md bg-neutral-100 shadow-md" />
      </main>
    </div>
  );
}
