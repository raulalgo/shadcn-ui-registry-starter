"use client";

import * as React from "react";
import {
  BarChart3,
  Megaphone,
  Paintbrush,
  ClipboardList,
  Settings,
  User,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { NavigationItem } from "./navigation-item";

interface GlobalNavProps {
  selectedPage?:
    | "insights"
    | "campaigns"
    | "creative"
    | "administration"
    | "inventory"
    | "users";
  className?: string;
  onPageChange?: (
    page:
      | "insights"
      | "campaigns"
      | "creative"
      | "administration"
      | "inventory"
      | "users",
  ) => void;
  onLogout?: () => void;
}

function GlobalNav({
  selectedPage = "insights",
  className,
  onPageChange,
  onLogout,
}: GlobalNavProps) {
  const navItems = React.useMemo(
    () => [
      { id: "insights", icon: BarChart3, label: "Insights" },
      { id: "campaigns", icon: Megaphone, label: "Campaigns" },
      { id: "creative", icon: Paintbrush, label: "Creative Management" },
      { id: "administration", icon: ClipboardList, label: "Administration" },
      { id: "inventory", icon: Settings, label: "Inventory Management" },
      { id: "users", icon: User, label: "Users" },
    ],
    [],
  );

  return (
    <div
      className={cn(
        "bg-primary-900 flex h-screen w-16 flex-col items-center overflow-hidden",
        className,
      )}
    >
      {/* Company Logo */}
      <div className="flex w-full justify-center border-b border-neutral-100/20 py-6">
        <svg
          width="26"
          height="32"
          viewBox="0 0 26 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15.0736 7.29944L13.0163 10.1813L10.9164 7.30114C4.82607 8.27492 0.683594 13.475 0.683594 19.5671C0.683594 26.3328 5.78929 32 12.9996 32C20.2099 32 25.3163 26.3358 25.3163 19.5688C25.3163 13.4716 21.1697 8.26879 15.0736 7.29944ZM13.0013 27.0558C8.482 27.0558 5.79099 23.5865 5.79099 19.5684C5.79099 15.5503 8.48268 12.0811 13.0013 12.0811C17.5199 12.0811 20.2113 15.5493 20.2113 19.5684C20.2113 23.5876 17.5206 27.0558 13.0013 27.0558Z"
            fill="white"
          />
          <path
            d="M12.9829 0L15.6405 3.35541L13.017 7.03519L10.3594 3.38948L12.9829 0Z"
            fill="white"
          />
        </svg>
      </div>

      {/* Navigation Icons */}
      <div className="flex h-full flex-1 flex-col items-center gap-3 py-6">
        {navItems.map((item) => (
          <NavigationItem
            key={item.id}
            icon={item.icon}
            label={item.label}
            isSelected={selectedPage === item.id}
            onClick={() =>
              onPageChange?.(
                item.id as
                  | "insights"
                  | "campaigns"
                  | "creative"
                  | "administration"
                  | "inventory"
                  | "users",
              )
            }
          />
        ))}
      </div>

      {/* Logout at bottom */}
      <div className="flex w-full justify-center border-t border-neutral-100/20 py-6">
        <NavigationItem icon={LogOut} label="Logout" onClick={onLogout} />
      </div>
    </div>
  );
}

export { GlobalNav };
