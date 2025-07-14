import ProductGrid from "@/components/product-grid";
import { getCategories, getProducts } from "@/lib/products";
import { GlobalNav } from "@/components/ui/global-nav";

export default async function Basic() {
  const products = await getProducts();
  const categories = await getCategories();

  return (
    <div className="flex min-h-screen flex-row bg-primary-900">
      <GlobalNav className="h-full" />
      <main className="flex-1 p-2">
        <div className="w-full h-full bg-neutral-100 rounded-md shadow-md"></div>
      </main>
    </div>
  );
}
