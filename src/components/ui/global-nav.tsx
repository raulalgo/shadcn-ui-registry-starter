"use client";

import * as React from "react";
import { Home, Search, Settings, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { NavigationItem } from "./navigation-item";

interface GlobalNavProps {
  selectedPage?: "home" | "search" | "settings" | "profile";
  className?: string;
  onPageChange?: (page: "home" | "search" | "settings" | "profile") => void;
}

function GlobalNav({ selectedPage = "home", className, onPageChange }: GlobalNavProps) {
  const navItems = [
    { id: "home", icon: Home, label: "Home" },
    { id: "search", icon: Search, label: "Search" },
    { id: "settings", icon: Settings, label: "Settings" },
    { id: "profile", icon: User, label: "Profile" },
  ];

  return (
    <div className={cn("h-full w-16 bg-primary-900 flex flex-col items-center py-4", className)}>
      {/* Navigation Icons */}
      <div className="flex flex-col items-center gap-6">
        {navItems.map((item) => (
          <NavigationItem
            key={item.id}
            icon={item.icon}
            label={item.label}
            isSelected={selectedPage === item.id}
            onClick={() => onPageChange?.(item.id as "home" | "search" | "settings" | "profile")}
          />
        ))}
      </div>
    </div>
  );
}

export { GlobalNav }; 