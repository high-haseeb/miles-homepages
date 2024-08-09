"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";

import { PaymentDetailsProps } from "@/types";
import { DataTable } from "../components/data-table";
import DownloadButton from "@/components/DownloadButton";

export default function Payouts() {
  return (
    <div className="flex flex-col py-[30px]">
      <div className="border-b pb-[15px] flex items-center justify-between">
        <p className="text-slate-900 font-medium">Latest Payouts</p>
        <div className="flex items-center gap-x-1">
          <p className="text-slate-300">Sort by: </p>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="text-sm text-slate-900 font-medium flex items-center gap-x-1">
                Recent <ChevronDown width={24} height={24} />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[156px]">
              <DropdownMenuItem className="hover:!bg-orange-50 hover:!text-orange-500">
                Most recent
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:!bg-orange-50 hover:!text-orange-500">
                Date
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:!bg-orange-50 hover:!text-orange-500">
                Amount
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <DataTable columns={columns} data={paymentDetails} />
    </div>
  );
}

const paymentDetails: PaymentDetailsProps[] = Array(50)
  .fill("")
  .map((_, i) => ({
    "product-renter": {
      product: "Cannon BX GR",
      renter: "Lolu B.",
    },
    id: "#02856",
    "date-time": {
      date: "Jan 1, 2020",
      time: "08:00 AM",
    },
    price: "NGN 45,000",
    receipt: "Receipt",
    arrId: `id-${1 + i}`,
  }));

export const columns: ColumnDef<PaymentDetailsProps>[] = [
  {
    accessorKey: "product-renter",
    header: "Product/Renter",
    cell: ({ row }) => {
      const productRenter = row.original["product-renter"];
      return (
        <div className="flex flex-col gap-1">
          <p className="text-sm text-slate-900 font-medium">
            {productRenter.product}
          </p>
          <p className="text-sm text-slate-400">{productRenter.renter}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "date-time",
    header: "Date",
    cell: ({ row }) => {
      const dateTime = row.original["date-time"];
      return (
        <div className="flex flex-col gap-1">
          <p className="text-sm text-slate-900 font-medium">{dateTime.date}</p>
          <p className="text-sm text-slate-400">{dateTime.time}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "receipt",
    header: "Receipt",
    cell: ({ row }) => {
      const receipt = row.original.receipt;
      return (
        <DownloadButton fileContent="" fileName={receipt} fileType="PDF" />
      );
    },
  },
];
