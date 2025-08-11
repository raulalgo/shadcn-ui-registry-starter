"use client";

import { cn } from "@/lib/utils";
import { SeamlessInput } from "./seamless-input";
import { Input } from "./input";
import { useState } from "react";
import { Button } from "./button";
import { Sidebar } from "lucide-react";

interface CampaignInfoPanelProps {
  className?: string;
  children?: React.ReactNode;
  onToggle?: () => void;
}

function PanelInput({ className, ...props }: React.ComponentProps<"input">) {
  return (
    <Input
      fit="sm"
      className={cn(
        "hover:bg-primary-300 w-48 border-none bg-neutral-200",
        className,
      )}
      {...props}
    />
  );
}

function AdvertiserInput() {
  const [isFocused, setIsFocused] = useState(false);
  const [value, setValue] = useState("");

  const advertisers = [
    "Qatar Airways",
    "Emirates",
    "British Airways",
    "Lufthansa",
    "Air France",
  ];

  const filteredAdvertisers = advertisers.filter((advertiser) =>
    advertiser.toLowerCase().includes(value.toLowerCase()),
  );

  return (
    <div className="relative">
      <PanelInput
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setTimeout(() => setIsFocused(false), 200)}
        placeholder="Select advertiser..."
      />
      {isFocused && filteredAdvertisers.length > 0 && (
        <div className="absolute top-full right-0 left-0 z-50 mt-1 max-h-48 overflow-y-auto rounded-md border border-neutral-200 bg-white shadow-lg">
          {filteredAdvertisers.map((advertiser, index) => (
            <div
              key={index}
              className="cursor-pointer px-3 py-2 text-sm hover:bg-neutral-100"
              onClick={() => {
                setValue(advertiser);
                setIsFocused(false);
              }}
            >
              {advertiser}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export function CampaignInfoPanel({
  className,
  children,
  onToggle,
}: CampaignInfoPanelProps) {
  return (
    <div className={cn("h-full w-md border-r bg-neutral-50 p-2", className)}>
      <div className="space-y-6">
        {/* New Campaign Header */}
        <div className="space-y-2">
          <div className="flex items-center justify-between gap-2">
            <SeamlessInput fit="large" placeholder="New Campaign" />
            <Button size="icon" variant="ghost" onClick={onToggle}>
              <Sidebar />
            </Button>
          </div>
          <div className="px-2 text-sm text-neutral-600">Campaign ID</div>
        </div>

        {/* Form Fields */}
        <div className="space-y-2 px-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-neutral-700">
              Advertiser <span className="">*</span>
            </label>
            <AdvertiserInput />
          </div>

          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-neutral-700">
              Brand <span className="">*</span>
            </label>
            <PanelInput className="w-48" />
          </div>

          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-neutral-700">
              Product category <span className="">*</span>
            </label>
            <PanelInput className="w-48" />
          </div>
        </div>
        <div className="space-y-2 px-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-neutral-700">
              Agency
            </label>
            <PanelInput className="w-48" />
          </div>

          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-neutral-700">
              Specialist
            </label>
            <PanelInput className="w-48" />
          </div>

          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-neutral-700">
              Sales person
            </label>
            <PanelInput className="w-48" />
          </div>

          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-neutral-700">
              Sales team
            </label>
            <PanelInput className="w-48" />
          </div>

          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-neutral-700">
              Admin person
            </label>
            <PanelInput className="w-48" />
          </div>
        </div>

        {children}
      </div>
    </div>
  );
}
