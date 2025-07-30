"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
  FilterFn,
} from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown, MoreHorizontal, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

// Import campaigns data from campaigns.json
import campaignsData from "../../../campaigns.json";

// Transform the campaigns data to match our Campaign type
const data: Campaign[] = campaignsData.map((campaign, index) => ({
  id: (index + 1).toString(),
  campaignName: campaign.campaignName,
  campaignId: campaign.campaignId,
  startDate: campaign.startDate,
  endDate: campaign.endDate,
  typeOfCampaign: campaign.typeOfCampaign,
  advertiser: campaign.advertiser,
  brand: campaign.brand,
  productCategory: campaign.productCategory,
  agency: campaign.agency,
  userOfLastStatusUpdate: campaign.userOfLastStatusUpdate,
  dateTimeOfLastStatusUpdate: campaign.dateTimeOfLastStatusUpdate,
  createdBy: campaign.createdBy,
  creationDate: campaign.creationDate,
  dropDate: campaign.dropDate,
  adminPerson: campaign.adminPerson,
  salesPerson: campaign.salesPerson,
  totalRevenue: campaign.totalRevenue,
  fillRate: campaign.fillRate,
  cpm: campaign.cpm,
  status: campaign.status, // Use the status from the generated data
}));

export type Campaign = {
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
  userOfLastStatusUpdate: string;
  dateTimeOfLastStatusUpdate: string;
  createdBy: string;
  creationDate: string;
  dropDate: string;
  adminPerson: string;
  salesPerson: string;
  totalRevenue: number;
  fillRate: number | null;
  cpm: number | null;
  status: string;
};

// Status Badge Component using Badge variants
function StatusBadge({ status }: { status: string }) {
  const statusVariantMap = {
    Draft: "yellow",
    Pending: "orange",
    Booked: "blue",
    Live: "green",
    Ended: "neutral",
    Cancelled: "pinkred",
  };

  const variant =
    statusVariantMap[status as keyof typeof statusVariantMap] || "neutral";

  return (
    <Badge variant={variant as any} inverted className="text-xs">
      {status}
    </Badge>
  );
}

export const columns: ColumnDef<Campaign>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <StatusBadge status={row.getValue("status")} />,
    filterFn: "equals",
  },
  {
    accessorKey: "campaignName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Campaign Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div>
        <div className="font-medium">{row.getValue("campaignName")}</div>
        <div className="text-sm text-gray-500">{row.original.campaignId}</div>
      </div>
    ),
  },
  {
    accessorKey: "typeOfCampaign",
    header: "Type",
    cell: ({ row }) => <div>{row.getValue("typeOfCampaign")}</div>,
    filterFn: "equals",
  },
  {
    accessorKey: "startDate",
    header: "Start Date",
    cell: ({ row }) => {
      const date = new Date(row.getValue("startDate"));
      return <div>{date.toLocaleDateString()}</div>;
    },
  },
  {
    accessorKey: "endDate",
    header: "End Date",
    cell: ({ row }) => {
      const date = new Date(row.getValue("endDate"));
      return <div>{date.toLocaleDateString()}</div>;
    },
  },
  {
    accessorKey: "advertiser",
    header: "Advertiser",
    cell: ({ row }) => <div>{row.getValue("advertiser")}</div>,
  },
  {
    accessorKey: "brand",
    header: "Brand",
    cell: ({ row }) => <div>{row.getValue("brand")}</div>,
  },
  {
    accessorKey: "totalRevenue",
    header: () => <div className="text-right">Revenue</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("totalRevenue"));

      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "fillRate",
    header: () => <div className="text-right">Fill Rate</div>,
    cell: ({ row }) => {
      const fillRate = row.getValue("fillRate");
      return (
        <div className="text-right">{fillRate ? `${fillRate}%` : "--"}</div>
      );
    },
  },
  {
    accessorKey: "cpm",
    header: () => <div className="text-right">CPM</div>,
    cell: ({ row }) => {
      const cpm = row.getValue("cpm");
      return <div className="text-right">{cpm ? `$${cpm}` : "--"}</div>;
    },
  },
  {
    accessorKey: "userOfLastStatusUpdate",
    header: "Last Updated By",
    cell: ({ row }) => <div>{row.getValue("userOfLastStatusUpdate")}</div>,
  },
  {
    accessorKey: "dateTimeOfLastStatusUpdate",
    header: "Last Updated",
    cell: ({ row }) => {
      const dateTime = row.getValue("dateTimeOfLastStatusUpdate") as string;
      return <div className="text-sm text-gray-500">{dateTime}</div>;
    },
  },
  {
    accessorKey: "createdBy",
    header: "Created By",
    cell: ({ row }) => <div>{row.getValue("createdBy")}</div>,
  },
  {
    accessorKey: "creationDate",
    header: "Creation Date",
    cell: ({ row }) => {
      const date = new Date(row.getValue("creationDate"));
      return <div>{date.toLocaleDateString()}</div>;
    },
  },
  {
    accessorKey: "dropDate",
    header: "Drop Date",
    cell: ({ row }) => {
      const date = new Date(row.getValue("dropDate"));
      return <div>{date.toLocaleDateString()}</div>;
    },
  },
  {
    accessorKey: "adminPerson",
    header: "Admin",
    cell: ({ row }) => <div>{row.getValue("adminPerson")}</div>,
  },
  {
    accessorKey: "salesPerson",
    header: "Sales Person",
    cell: ({ row }) => <div>{row.getValue("salesPerson")}</div>,
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const campaign = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(campaign.campaignId)}
            >
              Copy campaign ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View campaign details</DropdownMenuItem>
            <DropdownMenuItem>Edit campaign</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export function DataTableDemo() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [columnsDropdownOpen, setColumnsDropdownOpen] = React.useState(false);
  const [filterDropdownOpen, setFilterDropdownOpen] = React.useState(false);

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,

    initialState: {
      pagination: {
        pageSize: 50,
      },
    },
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full">
      <div className="flex items-center gap-2 pb-4">
        <Input
          placeholder="Filter campaigns..."
          value={
            (table.getColumn("campaignName")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn("campaignName")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
          fit="sm"
        />
        <Select
          value={(table.getColumn("status")?.getFilterValue() as string) ?? ""}
          onValueChange={(value) => {
            table
              .getColumn("status")
              ?.setFilterValue(value === "all" ? "" : value);
          }}
        >
          <SelectTrigger className="w-[180px]" fit="sm">
            <SelectValue placeholder="Select Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="Draft">Draft</SelectItem>
            <SelectItem value="Pending">Pending</SelectItem>
            <SelectItem value="Booked">Booked</SelectItem>
            <SelectItem value="Live">Live</SelectItem>
            <SelectItem value="Ended">Ended</SelectItem>
            <SelectItem value="Cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
        <Select
          value={
            (table.getColumn("typeOfCampaign")?.getFilterValue() as string) ??
            ""
          }
          onValueChange={(value) => {
            table
              .getColumn("typeOfCampaign")
              ?.setFilterValue(value === "all" ? "" : value);
          }}
        >
          <SelectTrigger className="w-[180px]" fit="sm">
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="Direct">Direct</SelectItem>
            <SelectItem value="Guaranteed">Guaranteed</SelectItem>
            <SelectItem value="Non-Guaranteed">Non-Guaranteed</SelectItem>
          </SelectContent>
        </Select>
        <DropdownMenu
          open={filterDropdownOpen}
          onOpenChange={setFilterDropdownOpen}
        >
          <DropdownMenuTrigger asChild>
            <Button variant="default" size="sm">
              <Plus /> Filter
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Add Filter</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Advertiser</DropdownMenuItem>
            <DropdownMenuItem>Brand</DropdownMenuItem>
            <DropdownMenuItem>Product Category</DropdownMenuItem>
            <DropdownMenuItem>Agency</DropdownMenuItem>
            <DropdownMenuItem>Revenue Range</DropdownMenuItem>
            <DropdownMenuItem>Start Date Range</DropdownMenuItem>
            <DropdownMenuItem>End Date Range</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu
          open={columnsDropdownOpen}
          onOpenChange={setColumnsDropdownOpen}
        >
          <DropdownMenuTrigger asChild>
            <Button variant="default" className="ml-auto" size="sm">
              Columns <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) => {
                      column.toggleVisibility(!!value);
                      // Keep dropdown open after checkbox interaction
                      setColumnsDropdownOpen(true);
                    }}
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="overflow-hidden rounded-md border bg-neutral-50 text-neutral-700">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="text-muted-foreground flex-1 text-sm">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="default"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="default"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}

export default DataTableDemo;
