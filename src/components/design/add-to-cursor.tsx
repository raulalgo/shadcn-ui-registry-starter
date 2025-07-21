"use client";

import Link from "next/link";
import React, { createContext, useContext, useState } from "react";

import { Button } from "@/components/ui/button";

export type CartItemType = "component" | "block" | "starter";
export interface CartItem {
  name: string;
  type: CartItemType;
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (name: string, type: CartItemType) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = (item: CartItem) => {
    setItems((prev) => {
      if (prev.some((i) => i.name === item.name && i.type === item.type)) return prev;
      return [...prev, item];
    });
  };

  const removeItem = (name: string, type: CartItemType) => {
    setItems((prev) => prev.filter((i) => !(i.name === name && i.type === type)));
  };

  const clearCart = () => setItems([]);

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
};

export function AddToCursor({
  mcp,
}: {
  mcp: { command: string; env: { [key: string]: string } };
}) {
  function generateCursorDeeplink() {
    const name = "shadcn";
    const config = btoa(JSON.stringify(mcp));

    return `cursor://anysphere.cursor-deeplink/mcp/install?name=${name}&config=${config}`;
  }

  return (
    <Button
      size="sm"
      className="bg-black text-white hover:bg-black hover:shadow-sm dark:bg-white dark:text-black dark:hover:bg-white"
      asChild
    >
      <Link href={generateCursorDeeplink()}>
        <img
          src="https://cursor.com/deeplink/mcp-install-light.svg"
          alt="Add shadcn/ui Registry MCP server to Cursor"
          height="80"
          className="hidden dark:block"
        />
        <img
          src="https://cursor.com/deeplink/mcp-install-dark.svg"
          alt="Add shadcn/ui Registry MCP server to Cursor"
          height="80"
          className="block dark:hidden"
        />
      </Link>
    </Button>
  );
}
