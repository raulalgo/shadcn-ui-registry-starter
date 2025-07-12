import * as React from "react";
import { Home, Search, Settings, User } from "lucide-react";
import { cn } from "@/lib/utils";

interface GlobalNavProps {
  selectedPage?: "home" | "search" | "settings" | "profile";
  className?: string;
}

function GlobalNav({ selectedPage = "home", className }: GlobalNavProps) {
  const navItems = [
    { id: "home", icon: Home, label: "Home" },
    { id: "search", icon: Search, label: "Search" },
    { id: "settings", icon: Settings, label: "Settings" },
    { id: "profile", icon: User, label: "Profile" },
  ];

  return (
    <div className={cn("fixed left-0 top-0 h-full w-16 bg-primary-900 flex flex-col items-center py-4", className)}>
      {/* Navigation Icons */}
      <div className="flex flex-col items-center gap-6">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isSelected = selectedPage === item.id;
          
          return (
            <div key={item.id} className="relative group">
              <button
                className={cn(
                  "p-3 rounded-lg transition-colors",
                  isSelected 
                    ? "text-primary-50 bg-primary-800" 
                    : "text-primary-300 hover:text-primary-50 hover:bg-primary-800"
                )}
                title={item.label}
              >
                <Icon className="h-5 w-5" />
              </button>
              
              {/* Selection indicator - half yellow dot on right edge */}
              {isSelected && (
                <div className="absolute -right-1 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-yellow-400 rounded-full" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export { GlobalNav }; 