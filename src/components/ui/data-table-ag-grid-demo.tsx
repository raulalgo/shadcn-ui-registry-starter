"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import {
  ColDef,
  GridApi,
  GridReadyEvent,
  ModuleRegistry,
  AllCommunityModule,
} from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

// Custom styles to match the screenshot design
const customGridStyles = `
  .ag-theme-alpine {
    --ag-header-height: 48px;
    --ag-row-height: 70px;
    --ag-header-background-color: #f8f9fa;
    --ag-header-foreground-color: #374151;
    --ag-header-cell-hover-background-color: #e5e7eb;
    --ag-odd-row-background-color: #ffffff;
    --ag-even-row-background-color: #f9fafb;
    --ag-row-hover-color: #f3f4f6;
    --ag-border-color: #e5e7eb;
    --ag-cell-horizontal-border: 1px solid #e5e7eb;
    --ag-row-border-color: #e5e7eb;
    --ag-font-size: 14px;
    --ag-font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    overflow: hidden;
  }

  .ag-theme-alpine .ag-header {
    background-color: #f8f9fa;
    border-bottom: 1px solid #e5e7eb;
  }

  .ag-theme-alpine .ag-header-cell {
    background-color: #f8f9fa;
    color: #374151;
    font-weight: 500;
    font-size: 14px;
    padding: 4px 8px;
    border-right: none;
  }

  .ag-theme-alpine .ag-header-cell:hover {
    background-color: #e5e7eb;
  }

  .ag-theme-alpine .ag-row {
    border-bottom: 1px solid #e5e7eb;
  }

  .ag-theme-alpine .ag-row:hover {
    background-color: #f3f4f6 !important;
  }

  .ag-theme-alpine .ag-cell {
    padding: 8px 12px;
    font-size: 14px;
    color: #374151;
    border-right: none;
    display: flex;
    align-items: center;
  }

  .ag-theme-alpine .ag-cell.campaign-name-cell {
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    line-height: 1.2;
  }

  .ag-theme-alpine .ag-cell .campaign-name {
    font-weight: 500;
    color: #374151;
    margin-bottom: 1px;
    cursor: pointer;
    transition: all 0.2s ease;
    padding: 6px 8px;
    border-radius: 4px;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: fit-content;
    max-width: 100%;
  }

  .ag-theme-alpine .ag-cell .campaign-name:hover {
    background-color: #dbeafe;
    color: #1e40af;
  }

  .ag-theme-alpine .ag-cell .campaign-name .copy-icon {
    opacity: 0;
    transition: opacity 0.2s ease;
    margin-left: 8px;
    color: #6b7280;
  }

  .ag-theme-alpine .ag-cell .campaign-name:hover .copy-icon {
    opacity: 1;
    color: #1e40af;
  }

  .ag-theme-alpine .ag-cell .campaign-id {
    font-size: 12px;
    color: #6b7280;
    font-weight: 400;
    cursor: pointer;
    transition: all 0.2s ease;
    padding: 6px 8px;
    border-radius: 4px;
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: space-between;
    width: fit-content;
    max-width: 100%;
  }

  .ag-theme-alpine .ag-cell .campaign-id:hover {
    background-color: #dbeafe;
    color: #1e40af;
  }

  .ag-theme-alpine .ag-cell .campaign-id .copy-icon {
    opacity: 0;
    transition: opacity 0.2s ease;
    margin-left: 8px;
    color: #6b7280;
  }

  .ag-theme-alpine .ag-cell .campaign-id:hover .copy-icon {
    opacity: 1;
    color: #1e40af;
  }

  .ag-theme-alpine .ag-row-odd {
    background-color: #ffffff;
  }

  .ag-theme-alpine .ag-row-even {
    background-color: #f9fafb;
  }

  .ag-theme-alpine .ag-checkbox-input-wrapper {
    margin-right: 8px;
  }

  .ag-theme-alpine .ag-header-checkbox {
    margin-right: 8px;
  }
`;
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MoreHorizontal, Copy, X } from "lucide-react";
import { toast } from "sonner";

// Register AG Grid modules
ModuleRegistry.registerModules([AllCommunityModule]);

// Import campaigns data from campaigns.json
import campaignsData from "../../campaigns.json";

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
  status: campaign.status,
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

// Dynamic import of AgGridReact to ensure it only renders on client side
const AgGridReact = dynamic(
  () => import("ag-grid-react").then((mod) => mod.AgGridReact),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-32 items-center justify-center">
        <div className="text-gray-500">Loading AG Grid...</div>
      </div>
    ),
  },
);

const columnDefs: ColDef[] = [
  {
    field: "id",
    headerName: "",
    width: 50,
    checkboxSelection: true,
    headerCheckboxSelection: true,
    pinned: "left",
    sortable: false,
    filter: false,
  },
  {
    field: "status",
    headerName: "Status",
    width: 120,
    cellRenderer: (params: any) => <StatusBadge status={params.value} />,
  },
  {
    field: "campaignName",
    headerName: "Campaign name / ID",
    width: 360,
    minWidth: 250,
    cellClass: "campaign-name-cell",
    cellRenderer: (params: any) => {
      const handleCopy = async (text: string, type: string) => {
        try {
          await navigator.clipboard.writeText(text);
          toast.success(`${type} copied to clipboard`, {
            description:
              text.length > 50 ? `${text.substring(0, 50)}...` : text,
            duration: 2000,
          });
        } catch (err) {
          console.error("Failed to copy text: ", err);
          toast.error("Failed to copy to clipboard", {
            description: "Please try again or copy manually",
            duration: 3000,
          });
        }
      };

      return (
        <div>
          <div
            className="campaign-name"
            onClick={() =>
              handleCopy(params.data.campaignName, "Campaign Name")
            }
            title="Click to copy campaign name"
          >
            <span>{params.data.campaignName}</span>
            <Copy className="copy-icon" size={14} />
          </div>
          <div
            className="campaign-id"
            onClick={() => handleCopy(params.data.campaignId, "Campaign ID")}
            title="Click to copy campaign ID"
          >
            <span>{params.data.campaignId}</span>
            <Copy className="copy-icon" size={12} />
          </div>
        </div>
      );
    },
  },
  {
    field: "typeOfCampaign",
    headerName: "Type",
    width: 150,
  },
  {
    field: "startDate",
    headerName: "Start Date",
    width: 120,
    valueFormatter: (params) => {
      const date = new Date(params.value);
      return date.toLocaleDateString();
    },
  },
  {
    field: "endDate",
    headerName: "End Date",
    width: 120,
    valueFormatter: (params) => {
      const date = new Date(params.value);
      return date.toLocaleDateString();
    },
  },
  {
    field: "advertiser",
    headerName: "Advertiser",
    width: 150,
  },
  {
    field: "brand",
    headerName: "Brand",
    width: 150,
  },
  {
    field: "totalRevenue",
    headerName: "Revenue",
    width: 120,
    valueFormatter: (params) => {
      const amount = parseFloat(params.value);
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);
    },
    cellStyle: { textAlign: "right" },
  },
  {
    field: "fillRate",
    headerName: "Fill Rate",
    width: 100,
    valueFormatter: (params) => {
      const fillRate = params.value;
      return fillRate ? `${fillRate}%` : "--";
    },
    cellStyle: { textAlign: "right" },
  },
  {
    field: "cpm",
    headerName: "CPM",
    width: 100,
    valueFormatter: (params) => {
      const cpm = params.value;
      return cpm ? `$${cpm}` : "--";
    },
    cellStyle: { textAlign: "right" },
  },
  {
    field: "userOfLastStatusUpdate",
    headerName: "Last Updated By",
    width: 150,
  },
  {
    field: "dateTimeOfLastStatusUpdate",
    headerName: "Last Updated",
    width: 150,
    valueFormatter: (params) => {
      return params.value;
    },
  },
  {
    field: "createdBy",
    headerName: "Created By",
    width: 150,
  },
  {
    field: "creationDate",
    headerName: "Creation Date",
    width: 130,
    valueFormatter: (params) => {
      const date = new Date(params.value);
      return date.toLocaleDateString();
    },
  },
  {
    field: "dropDate",
    headerName: "Drop Date",
    width: 130,
    valueFormatter: (params) => {
      const date = new Date(params.value);
      return date.toLocaleDateString();
    },
  },
  {
    field: "adminPerson",
    headerName: "Admin",
    width: 120,
  },
  {
    field: "salesPerson",
    headerName: "Sales Person",
    width: 120,
  },
];

export function DataTableAGGridDemo() {
  const [gridApi, setGridApi] = React.useState<GridApi | null>(null);
  const [selectedRows, setSelectedRows] = React.useState<string[]>([]);
  const [currentPage, setCurrentPage] = React.useState(0);
  const [totalPages, setTotalPages] = React.useState(0);
  const [searchValue, setSearchValue] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState("all");
  const [typeFilter, setTypeFilter] = React.useState("all");
  const [filteredData, setFilteredData] = React.useState<Campaign[]>(data);

  // Check if any filters are active
  const hasActiveFilters =
    searchValue !== "" || statusFilter !== "all" || typeFilter !== "all";

  // Clear all filters
  const clearAllFilters = () => {
    setSearchValue("");
    setStatusFilter("all");
    setTypeFilter("all");
  };

  const onGridReady = (params: GridReadyEvent) => {
    setGridApi(params.api);
    if (params.api) {
      setTotalPages(params.api.paginationGetTotalPages());
    }
  };

  const onSelectionChanged = () => {
    if (gridApi) {
      const selectedNodes = gridApi.getSelectedNodes();
      const selectedIds = selectedNodes.map((node) => node.data.id);
      setSelectedRows(selectedIds);
    }
  };

  const onFilterChanged = () => {
    if (gridApi) {
      const filteredRows = gridApi.getDisplayedRowCount();
      console.log(`Filtered rows: ${filteredRows}`);
    }
  };

  const goToPreviousPage = () => {
    if (gridApi && currentPage > 0) {
      gridApi.paginationGoToPreviousPage();
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (gridApi && currentPage < totalPages - 1) {
      gridApi.paginationGoToNextPage();
      setCurrentPage(currentPage + 1);
    }
  };

  // Apply all filters
  React.useEffect(() => {
    let filtered = [...data];

    // Apply search filter
    if (searchValue) {
      const searchLower = searchValue.toLowerCase();
      filtered = filtered.filter(
        (campaign) =>
          campaign.campaignName?.toLowerCase().includes(searchLower) ||
          campaign.campaignId?.toLowerCase().includes(searchLower),
      );
    }

    // Apply status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter(
        (campaign) => campaign.status === statusFilter,
      );
    }

    // Apply type filter
    if (typeFilter !== "all") {
      filtered = filtered.filter(
        (campaign) => campaign.typeOfCampaign === typeFilter,
      );
    }

    setFilteredData(filtered);
  }, [searchValue, statusFilter, typeFilter]);

  return (
    <div className="flex h-full w-full flex-col gap-1">
      <style dangerouslySetInnerHTML={{ __html: customGridStyles }} />
      <div className="flex items-center gap-2 py-4">
        <Input
          placeholder="Filter campaigns..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="max-w-sm"
        />
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
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
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="Direct">Direct</SelectItem>
            <SelectItem value="Guaranteed">Guaranteed</SelectItem>
            <SelectItem value="Non-Guaranteed">Non-Guaranteed</SelectItem>
          </SelectContent>
        </Select>
        {hasActiveFilters && (
          <Button
            variant="medium"
            size="sm"
            onClick={clearAllFilters}
            className="flex items-center gap-2"
          >
            <X className="h-4 w-4" />
            Clear All
          </Button>
        )}
      </div>

      <div className="ag-theme-alpine flex-1" style={{ width: "100%" }}>
        <AgGridReact
          rowData={filteredData}
          columnDefs={columnDefs}
          onGridReady={onGridReady}
          onSelectionChanged={onSelectionChanged}
          onFilterChanged={onFilterChanged}
          rowSelection="multiple"
          suppressRowClickSelection={true}
          pagination={true}
          paginationPageSize={50}
          suppressPaginationPanel={true}
          className="h-full w-full"
          theme="legacy"
          rowHeight={70}
          headerHeight={48}
          defaultColDef={{
            sortable: true,
            filter: false,
            resizable: true,
          }}
        />
      </div>

      <div className="flex justify-between py-2">
        <div className="text-muted-foreground text-sm">
          {selectedRows.length} of {filteredData.length} row(s) selected.
        </div>
        <div className="flex">
          <Button
            variant="default"
            size="sm"
            onClick={goToPreviousPage}
            disabled={currentPage === 0}
          >
            Previous
          </Button>
          <span className="flex items-center px-3 py-1 text-sm text-gray-600">
            Page {currentPage + 1} of {totalPages}
          </span>
          <Button
            variant="default"
            size="sm"
            onClick={goToNextPage}
            disabled={currentPage >= totalPages - 1}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}

export default DataTableAGGridDemo;
