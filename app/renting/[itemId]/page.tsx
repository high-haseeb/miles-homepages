"use client";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import Backbtn from "@/components/Backbtn";
import DashboardLayout2 from "@/components/Layouts/DashboardLayout2";
import Chat from "@/components/Chat";
import RentalDetailsCard from "@/components/RentalDetailsCard";
import { getSingleBooking } from "@/services/general.api";

export default function Item({ params }: { params: { itemId: string } }) {
  const { itemId } = params;
  const { data: singleBooking, isPending } = useQuery({
    queryKey: ["bookings", "rental", itemId],
    queryFn: () => getSingleBooking(itemId),
  });
  const booking = singleBooking?.data;
  if (isPending) {
    return <p>Loading...</p>;
  }
  return (
    <DashboardLayout2>
      <>
        <div className="flex flex-col sm:flex-row sm:gap-x-10 xl:gap-x-[163px] xl:px-[72px]">
          <div className="w-full flex flex-col basis-1/2">
            <Backbtn />
            <div className="flex items-center gap-x-[15px] sm:gap-x-5 max-w-[382px] mt-[30px] mb-[25px] sm:mb-[50px]">
              <Avatar className="sm:w-[60px] w-[45px] sm:h-[60px] h-[45px]">
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <p className="font-medium sm:text-lg text-slate-900">
                You have initiated a booking request to {booking?.renter_name}.
              </p>
            </div>
            <Image
              src={
                booking?.item_images[0].image_url || "/images/polaroid-card.png"
              }
              width={195}
              height={195}
              alt="polaroid"
              className="rounded-[10px] object-cover sm:hidden w-full h-[300px] mb-[25px]"
            />
            <div className="sm:hidden">
              <Tabs defaultValue="details" className="w-full">
                <TabsList className="grid w-full grid-cols-2 bg-slate-50 rounded-[30px] p-[5px] h-auto">
                  <TabsTrigger
                    value="details"
                    className="rounded-[25px] h-auto py-2 px-[30px] font-medium text-sm data-[state=active]:text-green-500 text-slate-400"
                  >
                    Details
                  </TabsTrigger>
                  <TabsTrigger
                    value="activity"
                    className="rounded-[25px] h-auto py-2 px-[30px] font-medium text-sm data-[state=active]:text-green-500 text-slate-400"
                  >
                    Activity
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="details" className="mt-[25px]">
                  <Chat status="renter" details={booking} />
                </TabsContent>
                <TabsContent value="activity" className="mt-[25px]">
                  <RentalDetailsCard status="renter" details={booking} />
                </TabsContent>
              </Tabs>
            </div>
            <div className="flex flex-col gap-y-2.5 max-sm:hidden">
              <div className="w-full">
                <Chat status="renter" details={booking} />
              </div>
            </div>
          </div>
          <div className="w-full max-sm:hidden basis-1/2">
            <RentalDetailsCard status="renter" details={booking} />
          </div>
        </div>
      </>
    </DashboardLayout2>
  );
}
