"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";

import DashboardLayout2 from "@/components/Layouts/DashboardLayout2";
import { CarouselCard } from "@/components/ListedItemCard";
import { ItemProps } from "@/types";
import Review from "@/components/Review";
import { getListing, createBooking } from "@/services/general.api";
import { useAppContext } from "@/context/AppContext";
import VerificationModal from "@/components/Modals/VerificationModal";

export default function ListedItem({ params }: { params: { itemId: string } }) {
  const { itemId } = params;
  const router = useRouter();
  const { isLoggedIn, userData } = useAppContext();
  const { is_email_verified, identity_verified, is_phone_number_verified } =
    userData;
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [desc, setDesc] = useState<string>();
  const [openVerifModal, setOpenVerifModal] = useState(false);

  const { data: listing, isPending } = useQuery({
    queryKey: ["listing", itemId],
    queryFn: () => getListing(itemId),
  });

  const mutation = useMutation({
    mutationFn: createBooking,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["listing", itemId] });
    },
  });

  // console.log(listing);
  const item = listing?.data?.listing;
  const dateRange = item?.multiple_date_ranges
    ? item?.multiple_date_ranges.split(",")
    : null;
  const startDate =
    dateRange?.[0] ?? item?.start_date ?? item?.recurring_start_date;
  const endDate =
    dateRange?.[1] ?? item?.start_date ?? item?.recurring_end_date;
  const peopleAlsoViewed = listing?.data?.peopleAlsoViewed;

  const priceBreakdown = [
    {
      title: `NGN ${item?.price_per_day} * (x) Days`,
      value: `NGN ${item?.price_per_day}x`,
    },
    {
      title: "Service Charge",
      value: "xxxx",
    },
    {
      title: "VAT",
      value: "xxxx",
    },
  ];

  const handleBookingRequest = async () => {
    if (!isLoggedIn) {
      router.push("/login");
    }
    if (!is_email_verified || !identity_verified || !is_phone_number_verified) {
      setOpenVerifModal(true);
    }
    try {
      const values = {
        listing_id: Number(itemId),
        price: item?.price_per_day,
        service_charge: "50",
        vat: "50",
        start_date: startDate,
        end_date: endDate,
        description: desc,
      };
      const res = await mutation.mutateAsync(values);

      toast({
        variant: "success",
        title: "Success",
        description: "You've successfully requsted to book this item.",
      });

      router.push(`/renting/${res?.data?.id}`);
    } catch (err: any) {
      console.log(err);
      const errorMsg = err?.response?.data?.message || mutation.error;
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: errorMsg,
      });
    }
  };
  if (isPending) {
    return <p>Pending..</p>;
  }
  return (
    <DashboardLayout2>
      <div className="flex flex-col lg:px-[155px]">
        <div className="flex items-stretch justify-between sm:gap-x-20 mb-10">
          <div className="flex flex-col max-w-[632px] md:basis-[60%] w-full">
            <CarouselCard images={item?.item_images} />
            <div className="mt-5 mb-4.5">
              <p className="mb-[5px] text-slate-400">
                Listed by{" "}
                <span className="text-orange-500 font-medium">
                  {item?.full_name}
                </span>
              </p>
              <p className="text-slate-500">Lagos 1.5 km away</p>
            </div>
            <div className="flex flex-col">
              <p className="text-xl text-slate-900 mb-2.5">Description</p>
              <p className="text-slate-400">
                {item?.description}{" "}
                {item?.description?.length > 215 && (
                  <span className="text-orange-600">Read More</span>
                )}
              </p>
            </div>
          </div>
          <div className="border border-slate-100 rounded-[14px] py-4.5 px-6 flex flex-col gap-y-[15px] w-full md:basis-[40%]">
            <div className="flex flex-col">
              <p className="mb-[5px] text-slate-900">{item?.product_name}</p>
              <p className="text-lg text-green-500 font-medium">
                NGN {item?.price_per_day}{" "}
                <span className="text-base text-slate-500">per/day</span>
              </p>
            </div>
            <div className="flex border border-gray-4/50 rounded-[15px] divide-x w-full">
              <div className="py-2 px-6 flex-1">
                <p className="text-sm text-slate-400 mb-[7px]">START DATE</p>
                <p className="text-slate-800 font-medium">
                  {dateRange?.[0] ?? item?.start_date}
                </p>
              </div>
              <div className="py-2 px-6 flex-1">
                <p className="text-sm text-slate-400 mb-[7px]">END DATE</p>
                <p className="text-slate-800 font-medium">
                  {dateRange?.[1] ?? item?.end_date}
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-y-2.5">
              <p className="text-sm text-slate-400">PRICE BREAKDOWN</p>
              <div className="flex flex-col border-b pb-[15px] gap-y-[5px]">
                {priceBreakdown.map((item, index) => (
                  <div
                    key={`itemId-${index + 1}`}
                    className="flex items-center justify-between"
                  >
                    <p className="text-slate-900">{item.title}</p>
                    <p className="text-slate-900">{item.value}</p>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-between mb-5">
                <p className="text-green-500 font-bold text-sm">Total</p>
                <p className="text-green-500 font-bold text-sm">NGN 150,000</p>
              </div>
              <div className="flex flex-col gap-y-2.5">
                <p className="text-slate-300 text-sm">
                  Is there something the listing owner should know
                </p>
                <Textarea
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                  className="rounded-[14px] border-slate-100 pl-6 p-4 text-slate-200 text-sm bg-transparent"
                  placeholder="Send any other details about your request"
                />
              </div>
              <div className="flex w-full">
                <Button
                  onClick={handleBookingRequest}
                  disabled={mutation.isPending}
                  className="rounded-[38px] w-full py-3 px-4 bg-green-500 font-medium text-white border-none"
                >
                  Request to book
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-y-5">
          <p className="text-slate-900 font-medium text-xl">
            People also viewed
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-[70px]">
            {peopleAlsoViewed?.map((item: ItemProps) => (
              <Link href={`/listings/${item.listing_id}`} key={item.listing_id}>
                <div className="flex flex-col gap-y-[15px]">
                  <Image
                    src={
                      item?.item_images?.[0]?.image_url || "/images/speaker.png"
                    }
                    alt="item"
                    height={230}
                    width={230}
                    className="object-cover rounded-lg"
                  />
                  <div className="flex flex-col gap-y-[5px]">
                    <p className="text-slate-900">Nikon SB-6A</p>
                    <p className="text-slate-300">Listed by Femi . Lawal</p>
                    <p className="text-orange-600 font-medium">
                      Lagos 1.5 km away
                    </p>
                    <p className="text-slate-900 text-xl font-medium">
                      NGN 40,000{" "}
                      <span className="text-lg text-slate-400 font-normal">
                        per/day
                      </span>
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-y-5 mt-[55px]">
          <p className="text-slate-900 font-medium text-xl">Reviews</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-9">
            <Review />
            <Review />
          </div>
        </div>
      </div>
      <VerificationModal
        openModal={openVerifModal}
        handleOpenModal={setOpenVerifModal}
      />
    </DashboardLayout2>
  );
}
