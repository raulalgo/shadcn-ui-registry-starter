"use client";

import {
  Blocks,
  ChevronDown,
  Home,
  Menu,
  Search,
  ToyBrick,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { RegistryLogo } from "@/components/design/registry-logo";
import { ModeToggle } from "@/components/design/theme-toggle";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import type * as React from "react";

export const componentItems = [
  { name: "Button", path: "/components/button" },
  { name: "Badge", path: "/components/badge" },
  { name: "Deal Card", path: "/components/deal-card" },
  { name: "Navigation Item", path: "/components/navigation-item" },
  { name: "Map", path: "/components/map" },
  { name: "Header Planner", path: "/components/header-planner" },
  { name: "Tabs", path: "/components/tabs" },
  { name: "Dropdown Menu", path: "/components/dropdown-menu" },
];

export const blockItems = [
  { name: "Deal Strip", path: "/blocks/deal-strip" },
  { name: "Global Navigation", path: "/blocks/global-nav" },
  {
    name: "Daypart Panel (Deprecated)",
    path: "/blocks/daypart-panel-deprecated",
  },
  { name: "Action Panel", path: "/blocks/action-panel" },
  { name: "Daypart Action Panel", path: "/blocks/daypart-action-panel" },
  { name: "Daypart Picker", path: "/blocks/daypart-picker" },
  { name: "L1 Header", path: "/blocks/l1-header" },
];

export const gettingStartedItems = [
  { name: "Home", path: "/" },
  { name: "Design Tokens", path: "/tokens" },
  { name: "Starters", path: "/starters" },
  { name: "Colors", path: "/colors" },
];

export function MobileSidebarTrigger() {
  const { setOpenMobile } = useSidebar();

  return (
    <div className="absolute top-8 right-4 md:hidden">
      <Button aria-label="Open menu" onClick={() => setOpenMobile(true)}>
        <Menu className="size-5" />
      </Button>
    </div>
  );
}

export function RegistrySidebar() {
  const pathname = usePathname();

  const { setOpenMobile } = useSidebar();

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredComponents, setFilteredComponents] = useState(componentItems);
  const [filteredBlocks, setFilteredBlocks] = useState(blockItems);

  useEffect(() => {
    if (searchTerm) {
      setFilteredComponents(
        componentItems.filter((item) =>
          item.name.toLowerCase().includes(searchTerm.toLowerCase()),
        ),
      );
      setFilteredBlocks(
        blockItems.filter((item) =>
          item.name.toLowerCase().includes(searchTerm.toLowerCase()),
        ),
      );
    } else {
      setFilteredComponents(componentItems);
      setFilteredBlocks(blockItems);
    }
  }, [searchTerm]);

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-b">
        <div className="flex items-center justify-between px-2 py-2">
          <Link href="/" className="flex min-w-0 items-center gap-2">
            <RegistryLogo />
          </Link>

          <Button
            variant="ghost"
            className="md:hidden"
            onClick={() => setOpenMobile(false)}
          >
            <X />
          </Button>
        </div>
        <div className="px-2 py-2 opacity-100 transition-all duration-200">
          <div className="relative">
            <Search className="text-muted-foreground absolute top-2.5 left-2.5 size-4" />
            <Input
              type="search"
              placeholder="Search..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <ScrollArea className="h-full w-full pr-2">
          <Collapsible defaultOpen={true} className="group/collapsible">
            <SidebarGroup>
              <CollapsibleTrigger className="w-full">
                <SidebarGroupLabel className="flex cursor-pointer items-center justify-between">
                  <div className="flex min-w-0 items-center">
                    <Home className="size-4 shrink-0" />
                    <span className="ml-2 opacity-100 transition-all duration-200">
                      Getting Started
                    </span>
                  </div>
                  <ChevronDown className="size-4 shrink-0 opacity-100 transition-all duration-200 group-data-[state=open]/collapsible:rotate-180" />
                </SidebarGroupLabel>
              </CollapsibleTrigger>

              <CollapsibleContent>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {gettingStartedItems.map((item) => (
                      <SidebarMenuItem key={item.path}>
                        <SidebarMenuButton
                          asChild
                          isActive={pathname === item.path}
                        >
                          <Link
                            onClick={() => setOpenMobile(false)}
                            href={item.path}
                          >
                            {item.name}
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </CollapsibleContent>
            </SidebarGroup>
          </Collapsible>

          <Collapsible defaultOpen={true} className="group/collapsible">
            <SidebarGroup>
              <CollapsibleTrigger className="w-full">
                <SidebarGroupLabel className="flex cursor-pointer items-center justify-between">
                  <div className="flex min-w-0 items-center">
                    <ToyBrick className="size-4 shrink-0" />
                    <span className="ml-2 transition-all duration-200">
                      Components
                    </span>
                  </div>
                  <ChevronDown className="size-4 shrink-0 transition-all duration-200 group-data-[state=open]/collapsible:rotate-180" />
                </SidebarGroupLabel>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {filteredComponents.map((item) => (
                      <SidebarMenuItem key={item.path}>
                        <SidebarMenuButton
                          asChild
                          isActive={pathname === item.path}
                        >
                          <Link
                            onClick={() => setOpenMobile(false)}
                            href={item.path}
                          >
                            {item.name}
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </CollapsibleContent>
            </SidebarGroup>
          </Collapsible>
          <Collapsible defaultOpen={true} className="group/collapsible">
            <SidebarGroup>
              <CollapsibleTrigger className="w-full">
                <SidebarGroupLabel className="flex cursor-pointer items-center justify-between">
                  <div className="flex min-w-0 items-center">
                    <Blocks className="size-4 shrink-0" />
                    <span className="ml-2 transition-all duration-200">
                      Blocks
                    </span>
                  </div>
                  <ChevronDown className="size-4 shrink-0 transition-all duration-200 group-data-[state=open]/collapsible:rotate-180" />
                </SidebarGroupLabel>
              </CollapsibleTrigger>

              <CollapsibleContent>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {filteredBlocks.map((item) => (
                      <SidebarMenuItem key={item.path}>
                        <SidebarMenuButton
                          asChild
                          isActive={pathname === item.path}
                        >
                          <Link
                            onClick={() => setOpenMobile(false)}
                            href={item.path}
                          >
                            {item.name}
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </CollapsibleContent>
            </SidebarGroup>
          </Collapsible>
        </ScrollArea>
      </SidebarContent>

      <SidebarFooter>
        <div className="flex justify-end">
          <ModeToggle />
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
