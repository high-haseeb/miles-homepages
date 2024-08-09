"use client";
import { useRouter } from "next/navigation";
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

export default function Progress() {
  const router = useRouter();
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
        {details.map((detail, index) => (
          <TableRow
            key={detail.customer}
            className={`border-none py-[25px] px-[22px] cursor-pointer ${
              (index + 1) % 2 === 0 ? "bg-transparent" : "bg-white"
            }`}
            onClick={() => router.push(`/bookings/${detail.itemId}`)}
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
                  className="bg-green-500 self-end text-white sm:text-sm text-[10px]"
                />
                <p className="text-xs text-slate-900 sm:hidden">
                  {detail.duration}
                </p>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

const details = [
  {
    avatar: "",
    customer: "Lolu B.",
    item: "Polaroid SB-6A",
    duration: "Jan 1, 2020 - Mar 15, 2020",
    status: "Currently Rented",
    itemId: "1a2b3c",
  },
  {
    avatar: "",
    customer: "Abolaji B.",
    item: "Cannon XB-FG",
    duration: "Feb 5, 2020 ",
    status: "Currently Rented",
    itemId: "4d5e6f",
  },
  {
    avatar: "",
    customer: "Gifty Ogechukwu",
    item: "HoverAir X1",
    duration: "Nov 18, 2020",
    status: "Currently Rented",
    itemId: "7g8h9i",
  },
];
