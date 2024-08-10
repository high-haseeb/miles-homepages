// "use client"
// import { useQuery } from "@tanstack/react-query";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import Backbtn from "@/components/Backbtn";
import DashboardLayout from "@/components/Layouts/DashboardLayout";
import Chat from "@/components/Chat";
import RentalDetailsCard from "@/components/RentalDetailsCard";
// import { getSingleBooking } from "@/services/general.api";

export function generateStaticParams() {
  return [{ itemId: "1a2b3c" }, { itemId: "4d5e6f" }, { itemId: "7g8h9i" }];
}

export default function Item({ params }: { params: { itemId: string } }) {
  //   const { data: upcomingBookings, isPending } = useQuery({
  //     queryKey: ["bookings", "lister", params.itemId],
  //     queryFn: () =>
  //       getSingleBooking(params.itemId),
  //   });
  return (
    <DashboardLayout>
      <>
        <div className="flex flex-col md:flex-row gap-[30px]">
          <div className="md:w-1/2 w-full flex flex-col">
            <Backbtn />
            <div className="flex items-center gap-x-5 max-w-[382px] mt-[30px] mb-[25px]">
              <Avatar className="w-[60px] h-[60px]">
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <p className="font-bold text-slate-900">
                You received a booking request from Lolu.B
              </p>
            </div>
            <div className="flex flex-col gap-y-2.5">
              <p className="text-slate-900">Activity</p>
              <div className="w-full">
                <Chat />
              </div>
            </div>
          </div>
          <div className="md:w-1/2 w-full">
            <RentalDetailsCard />
          </div>
        </div>
      </>
    </DashboardLayout>
  );
}
