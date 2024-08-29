"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";

import { PaymentDetailsProps, PaymentDetailsPropsMobile } from "@/types";
import { DataTable } from "../components/data-table";
import DownloadButton from "@/components/DownloadButton";
import LeftArrow from "@/components/vectors/LeftArrow";

export default function Payouts({ clearTab }: { clearTab?: () => void }) {
  return (
    <>
      <div className="sm:hidden flex items-center gap-x-4.5" onClick={clearTab}>
        <LeftArrow />
        <span className="text-slate-900 text-sm font-bold">Payouts</span>
      </div>
      <div className="flex flex-col py-[30px]">
        <div className="border-b pb-[15px] flex items-center justify-between">
          <p className="text-slate-900 font-medium hidden sm:block">
            Latest Payouts
          </p>
          <div className="flex items-center gap-x-1">
            <p className="text-slate-300 hidden sm:block">Sort by: </p>
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
        <DataTable
          columns={columns}
          data={paymentDetails}
          className="hidden sm:block"
        />
        <DataTable
          columns={mobileColumn}
          data={paymentDetailsMobile}
          className="sm:hidden"
        />
      </div>
    </>
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

const paymentDetailsMobile: PaymentDetailsPropsMobile[] = Array(50)
  .fill("")
  .map((_, i) => ({
    "product-datetime": {
      product: "Cannon BX GR",
      datetime: "Jan 1, 08:00 AM",
    },
    "price-id": {
      price: "NGN 45,000",
      id: "#02856",
    },
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

export const mobileColumn: ColumnDef<PaymentDetailsPropsMobile>[] = [
  {
    accessorKey: "product-datetime",
    header: "Product/Renter",
    cell: ({ row }) => {
      const productRenter = row.original["product-datetime"];
      return (
        <div className="flex flex-col gap-1">
          <p className="text-sm text-slate-900 font-medium">
            {productRenter.product}
          </p>
          <p className="text-sm text-slate-400">{productRenter.datetime}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "price-id",
    header: "Price/ID",
    cell: ({ row }) => {
      const priceId = row.original["price-id"];
      return (
        <div className="flex flex-col gap-1">
          <p className="text-sm text-slate-900 font-medium">{priceId.price}</p>
          <p className="text-sm text-slate-400">{priceId.id}</p>
        </div>
      );
    },
  },
];
