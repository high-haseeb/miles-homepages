"use client";
import { useQuery } from "@tanstack/react-query";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import Backbtn from "@/components/Backbtn";
import DashboardLayout2 from "@/components/Layouts/DashboardLayout2";
import Chat from "@/components/Chat";
import RentalDetailsCard from "@/components/RentalDetailsCard";
import { getSingleBooking } from "@/services/general.api";

export default function Item({ params }: { params: { itemId: string } }) {
  const { itemId } = params;
  const { data: upcomingBooking, isPending } = useQuery({
    queryKey: ["bookings", "rental", itemId],
    queryFn: () => getSingleBooking(itemId),
  });
  const booking = upcomingBooking?.data;
  if (isPending) {
    return <p>Loading...</p>;
  }
  return (
    <DashboardLayout2>
      <>
        <div className="flex flex-col md:flex-row gap-x-[163px] px-[72px]">
          <div className="md:w-1/2 w-full flex flex-col">
            <Backbtn />
            <div className="flex items-center gap-x-5 max-w-[382px] mt-[30px] mb-[50px]">
              <Avatar className="w-[60px] h-[60px]">
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <p className="font-medium text-lg text-slate-900">
                You have initiated a booking request to {booking?.renter_name}.
              </p>
            </div>
            <div className="flex flex-col gap-y-2.5">
              <div className="w-full">
                <Chat status="renter" details={booking} />
              </div>
            </div>
          </div>
          <div className="md:w-1/2 w-full">
            <RentalDetailsCard status="renter" details={booking} />
          </div>
        </div>
      </>
    </DashboardLayout2>
  );
}
