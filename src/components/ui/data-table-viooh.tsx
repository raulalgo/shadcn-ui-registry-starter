"use client";

import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import type * as React from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Status Badge Component
interface StatusBadgeProps {
  status: "live" | "terminated" | "ended" | "draft" | "active";
  children: React.ReactNode;
}

function StatusBadge({ status, children }: StatusBadgeProps) {
  const statusStyles = {
    live: "bg-green-100 text-green-700 border-green-200",
    active: "bg-green-100 text-green-700 border-green-200",
    terminated: "bg-red-100 text-red-700 border-red-200",
    ended: "bg-gray-100 text-gray-700 border-gray-200",
    draft: "bg-yellow-100 text-yellow-700 border-yellow-200",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium",
        statusStyles[status] || statusStyles.draft,
      )}
    >
      {children}
    </span>
  );
}

// Pagination Component
interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  return (
    <div className="flex items-center justify-between px-2 py-4">
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
        >
          <ChevronsLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <span className="text-sm text-gray-600">
          Page {currentPage} of {totalPages}
        </span>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
        >
          <ChevronsRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

// Data Table Component
interface DataTableProps {
  data: Array<{
    id: string;
    campaignName: string;
    campaignId: string;
    startDate: string;
    endDate: string;
    typeOfCampaign: string;
    advertiser: string;
    brand: string;
    productCategory: string;
    agency: string;
    totalRevenue: number;
    fillRate: number | null;
    cpm: number | null;
    status?: string;
  }>;
  itemsPerPage: number;
  onItemsPerPageChange: (items: number) => void;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export function DataTable({
  data,
  itemsPerPage,
  onItemsPerPageChange,
  currentPage,
  onPageChange,
}: DataTableProps) {
  const totalPages = Math.ceil(data.length / itemsPerPage);

  return (
    <div className="w-full">
      {/* Top Controls */}
      <div className="mb-4 flex items-center gap-2">
        <span className="text-sm font-medium text-gray-700">Display</span>
        <div className="flex items-center gap-1">
          {[10, 20, 35, 50].map((items) => (
            <Button
              key={items}
              variant={itemsPerPage === items ? "default" : "ghost"}
              size="sm"
              onClick={() => onItemsPerPageChange(items)}
              className={cn(
                "h-8 px-3 text-sm",
                itemsPerPage === items
                  ? "bg-primary-600 text-white"
                  : "text-gray-600 hover:bg-gray-100",
              )}
            >
              {items}
            </Button>
          ))}
        </div>
        <span className="text-sm text-gray-600">campaigns per page</span>
      </div>

      {/* Table */}
      <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="px-4 py-3 text-left text-xs font-medium tracking-wider text-gray-700 uppercase">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium tracking-wider text-gray-700 uppercase">
                  Campaign Name / ID
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium tracking-wider text-gray-700 uppercase">
                  Type
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium tracking-wider text-gray-700 uppercase">
                  From
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium tracking-wider text-gray-700 uppercase">
                  To
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium tracking-wider text-gray-700 uppercase">
                  Advertiser
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium tracking-wider text-gray-700 uppercase">
                  Brand
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium tracking-wider text-gray-700 uppercase">
                  Revenue
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium tracking-wider text-gray-700 uppercase">
                  Fill Rate
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium tracking-wider text-gray-700 uppercase">
                  CPM
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {data.map((row) => (
                <tr key={row.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <StatusBadge status={(row.status as any) || "active"}>
                      {row.status || "Active"}
                    </StatusBadge>
                  </td>
                  <td className="px-4 py-3">
                    <div>
                      <div className="font-medium text-gray-900">
                        {row.campaignName}
                      </div>
                      <div className="text-sm text-gray-500">
                        {row.campaignId}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">
                    {row.typeOfCampaign}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">
                    {new Date(row.startDate).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">
                    {new Date(row.endDate).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">
                    {row.advertiser}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">
                    {row.brand}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">
                    ${row.totalRevenue.toLocaleString()}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">
                    {row.fillRate ? `${row.fillRate}%` : "--"}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">
                    {row.cpm ? `$${row.cpm}` : "--"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      </div>
    </div>
  );
}
