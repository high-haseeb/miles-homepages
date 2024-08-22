"use client";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableHead,
  TableHeader,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import Chip from "@/components/Chip";
import { getRenterBookings } from "@/services/general.api";
import { DetailListType, DetailsType } from "@/types";
import { formattedDate } from "@/utils";

export default function Pending() {
  const router = useRouter();
  const { data: pendingBookings, isPending } = useQuery({
    queryKey: ["bookings", "renter", "pending"],
    queryFn: () =>
      getRenterBookings({
        rental_status: "AWAITING APPROVAL",
        page: 1,
        limit: 10,
      }),
  });
  console.log(pendingBookings);
  const detailsList = pendingBookings?.data?.rows;

  const details = detailsList?.map((detail: DetailListType) => ({
    avatar: "",
    customer: detail?.lister_name,
    item: detail?.product_name,
    duration: `${formattedDate(detail?.start_date)} - ${formattedDate(
      detail?.end_date
    )}`,
    status: detail?.rental_status,
    itemId: detail?.booking_id,
  }));
  return (
    <Table className="py-[27px] px-[30px] rounded-[25px] mt-[25px] sm:mt-0">
      <TableHeader className="max-sm:hidden">
        <TableRow className="border-none">
          <TableHead className="text-slate-400 text-sm">RENTER/ITEM</TableHead>
          <TableHead className="text-slate-400 text-sm">DATE</TableHead>
          <TableHead className="text-slate-400 text-sm">STATUS</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {details?.length > 0 ? (
          details?.map((detail: DetailsType, index: number) => (
            <TableRow
              key={detail.itemId}
              className={`border-none py-[25px] px-[22px] cursor-pointer ${
                (index + 1) % 2 === 0 ? "bg-transparent" : "bg-white"
              }`}
              onClick={() => router.push(`/renting/${detail.itemId}`)}
            >
              <TableCell className="flex items-center gap-x-4.5">
                <Avatar className="w-[50px] h-[50px]">
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="flex flex-col gap-0.5">
                  <p className="text-slate-400 text-xs sm:text-base">
                    {detail.customer}
                  </p>
                  <p className="text-slate-800 text-xs sm:text-lg font-medium">
                    {detail.item}
                  </p>
                </div>
              </TableCell>
              <TableCell className="text-slate-800 text-lg font-medium max-sm:hidden">
                {detail.duration}
              </TableCell>
              <TableCell className="text-slate-600">
                <div className="max-sm:flex max-sm:flex-col max-sm:justify-end max-sm:gap-y-[3px] max-sm:text-right">
                  <Chip
                    text={detail.status}
                    className="bg-[#FFEDEC] self-end text-[#D33030] sm:text-sm text-[10px] capitalize"
                  />
                  <p className="text-xs text-slate-900 sm:hidden">
                    {detail.duration}
                  </p>
                </div>
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow className="border-none py-[27px] px-[22px] bg-white h-auto">
            <TableCell
              colSpan={3}
              className="text-center text-slate-300 py-9 text-lg"
            >
              No pending booking
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
