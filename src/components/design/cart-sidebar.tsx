"use client";

import React, { useState } from "react";
import { useCart } from "@/components/design/add-to-cursor";
import { Button } from "@/components/ui/button";
import { X, Trash2, ShoppingCart, ExternalLink } from "lucide-react";
import { useState as useClientState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";

// Helper to fetch and parse registry.json
async function fetchRegistry() {
  const res = await fetch("/registry.json");
  if (!res.ok) throw new Error("Failed to fetch registry.json");
  return res.json();
}

// Recursively resolve all dependencies for a set of item names
type RegistryItem = {
  name: string;
  registryDependencies?: string[];
  [key: string]: any;
};
type Registry = { items: RegistryItem[] };
function resolveDependencies(items: string[], registry: Registry): RegistryItem[] {
  const all = new Map<string, RegistryItem>();
  const urlToName: Record<string, string> = {};
  for (const entry of registry.items) {
    urlToName[`https://shadcn-ui-registry-starter-git-main-raulalgos-projects.vercel.app/r/${entry.name}.json`] = entry.name;
    urlToName[entry.name] = entry.name;
  }
  function add(name: string) {
    if (all.has(name)) return;
    const entry = registry.items.find((i) => i.name === name);
    if (!entry) return;
    all.set(name, entry);
    if (entry.registryDependencies) {
      for (const dep of entry.registryDependencies) {
        const depName = urlToName[dep] || dep;
        add(depName);
      }
    }
  }
  for (const name of items) add(name);
  return Array.from(all.values());
}

export function CartSidebar() {
  const { items, removeItem, clearCart } = useCart();
  const [open, setOpen] = useClientState(false);
  const [loading, setLoading] = useClientState(false);
  const [error, setError] = useClientState("");
  const [showModal, setShowModal] = useClientState(false);
  const [cartV0Url, setCartV0Url] = useClientState("");
  const [singleV0Url, setSingleV0Url] = useClientState("");

  const grouped = items.reduce<{ [type: string]: typeof items }>((acc, item) => {
    acc[item.type] = acc[item.type] || [];
    acc[item.type].push(item);
    return acc;
  }, {});

  // Real Open in V0 logic
  const handleOpenInV0 = async () => {
    setLoading(true);
    setError("");
    try {
      const registry = await fetchRegistry();
      const itemNames = items.map(i => i.name);
      const allItems = resolveDependencies(itemNames, registry);
      if (allItems.length === 0) throw new Error("No registry items found");
      const url = new URL("https://v0.dev/chat/api/open");
      url.searchParams.append("url", window.location.origin + "/r/registry.json");
      url.searchParams.append("names", allItems.map(i => i.name).join(","));
      setCartV0Url(url.toString());
      // Single item V0 URL (first item in cart)
      if (items.length > 0) {
        const singleUrl = new URL("https://v0.dev/chat/api/open");
        singleUrl.searchParams.append("url", window.location.origin + "/r/registry.json");
        singleUrl.searchParams.append("names", items[0].name);
        setSingleV0Url(singleUrl.toString());
      } else {
        setSingleV0Url("");
      }
      setShowModal(true);
      // Only open V0 if not on localhost
      if (typeof window !== "undefined" && !window.location.hostname.includes("localhost")) {
        window.open(url.toString(), "_blank", "noopener,noreferrer");
      }
    } catch (e: any) {
      setError(e.message || "Failed to open in V0");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button
        variant="default"
        size="icon"
        className="fixed bottom-6 right-6 z-40 shadow-lg"
        onClick={() => setOpen(true)}
        aria-label="Open cart"
      >
        <ShoppingCart />
        {items.length > 0 && (
          <span className="ml-1 text-xs font-bold">{items.length}</span>
        )}
      </Button>
      {open && (
        <div className="fixed inset-0 z-50 flex">
          <div className="flex-1" onClick={() => setOpen(false)} />
          <aside className="relative w-[350px] max-w-full bg-white dark:bg-neutral-900 shadow-xl border-l flex flex-col h-full">
            <div className="flex items-center justify-between p-4 border-b">
              <span className="font-bold text-lg flex items-center gap-2">
                <ShoppingCart className="w-5 h-5" /> Cart
              </span>
              <Button variant="ghost" size="icon" onClick={() => setOpen(false)}>
                <X />
              </Button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-6">
              {items.length === 0 ? (
                <div className="text-center text-muted-foreground mt-8">Your cart is empty.</div>
              ) : (
                Object.entries(grouped).map(([type, group]) => (
                  <div key={type}>
                    <div className="font-semibold mb-2 capitalize">{type}s</div>
                    <ul className="space-y-2">
                      {group.map((item) => (
                        <li key={item.name} className="flex items-center justify-between bg-muted rounded px-2 py-1">
                          <span>{item.name}</span>
                          <Button
                            size="icon"
                            variant="ghost"
                            aria-label={`Remove ${item.name}`}
                            onClick={() => removeItem(item.name, item.type)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))
              )}
              {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
            </div>
            <div className="p-4 border-t flex flex-col gap-2">
              <Button
                variant="destructive"
                onClick={clearCart}
                disabled={items.length === 0}
              >
                Clear Cart
              </Button>
              <Button
                variant="primary"
                className="flex items-center gap-2"
                onClick={handleOpenInV0}
                disabled={items.length === 0 || loading}
              >
                <ExternalLink className="w-4 h-4" />
                {loading ? "Loading..." : "Open in V0"}
              </Button>
            </div>
          </aside>
        </div>
      )}
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>V0 Export Comparison</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="font-semibold mb-1">Cart Export URL</div>
              <pre className="bg-muted p-2 rounded text-xs break-all whitespace-pre-wrap">{cartV0Url}</pre>
            </div>
            <div className="flex-1">
              <div className="font-semibold mb-1">Single Item Export URL</div>
              <pre className="bg-muted p-2 rounded text-xs break-all whitespace-pre-wrap">{singleV0Url}</pre>
            </div>
          </div>
          <DialogClose asChild>
            <Button className="mt-4 w-full">Close</Button>
          </DialogClose>
        </DialogContent>
      </Dialog>
    </>
  );
} 