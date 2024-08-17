"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import { Minus, Plus } from "lucide-react";

import DashboardLayout2 from "@/components/Layouts/DashboardLayout2";
import { CarouselCard } from "@/components/ListedItemCard";
import { ItemProps } from "@/types";
import Review from "@/components/Review";
import { getListing, createBooking } from "@/services/general.api";
import { useAppContext } from "@/context/AppContext";
import VerificationModal from "@/components/Modals/VerificationModal";
import Backbtn from "@/components/Backbtn";

export default function ListedItem({ params }: { params: { itemId: string } }) {
  const { itemId } = params;
  const router = useRouter();
  const { isLoggedIn, isVerified } = useAppContext();
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [desc, setDesc] = useState<string>();
  const [quantity, setQuantity] = useState(1);
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

  console.log(listing);
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
    if (!isVerified) {
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
      const errorMsg = mutation?.error?.message || err?.response?.data?.message;
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
      <div className="flex flex-col lg:px-[93px] gap-y-10">
        <div className="flex flex-col md:flex-row md:items-stretch justify-between max-md:gap-y-10 sm:gap-x-20 mb-10">
          <div className="flex flex-col max-w-[632px] md:basis-[60%] w-full">
            <div className="mb-[30px]">
              <Backbtn />
            </div>
            <CarouselCard images={item?.item_images} />
            <div className="mt-[15px] mb-0.5">
              <p className="text-slate-900 text-sm">
                Listed by{" "}
                <span className="text-orange-500 font-medium">
                  {item?.full_name}
                </span>
              </p>
              <p className="text-slate-900 text-sm">Lagos 1.5 km away</p>
              <p className="text-slate-900 text-sm">
                {item?.quantity_available}/{item?.quantity_available} Available
                for rent
              </p>
            </div>
            <div className="flex flex-col mt-[30px]">
              <p className="text-xl text-slate-900 mb-2.5">Description</p>
              <p className="text-slate-400 text-sm">
                {item?.description}{" "}
                {item?.description?.length > 215 && (
                  <span className="text-orange-600">Read More</span>
                )}
              </p>
            </div>
          </div>
          <div className="border border-slate-100 rounded-[14px] py-4.5 px-6 flex flex-col gap-y-[15px] w-full md:basis-[40%]">
            <div className="flex flex-col">
              <p className="text-sm text-slate-900">{item?.product_name}</p>
              <p className="text-green-500 font-medium">
                NGN {item?.price_per_day}{" "}
                <span className="text-sm text-slate-500">per/day</span>
              </p>
            </div>
            <div className="flex border border-gray-4/50 rounded-[15px] divide-x w-full">
              <div className="py-2 px-6 flex-1">
                <p className="text-sm text-slate-400 mb-[7px]">START DATE</p>
                <p className="text-slate-800 font-medium text-sm">
                  {dateRange?.[0] ?? item?.start_date}
                </p>
              </div>
              <div className="py-2 px-6 flex-1">
                <p className="text-sm text-slate-400 mb-[7px]">END DATE</p>
                <p className="text-slate-800 font-medium text-sm">
                  {dateRange?.[1] ?? item?.end_date}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-x-10 my-[21px]">
              <p className="text-sm text-green-500">QUANTITY</p>
              <div className="flex items-center gap-x-5">
                <button
                  onClick={() => {
                    if (quantity === 1) return;
                    else setQuantity((prev) => prev - 1);
                  }}
                  className="h-7 w-7 rounded-full flex items-center justify-center bg-slate-50 text-slate-400"
                >
                  <Minus className="w-3 h-3" />
                </button>
                {quantity}
                <button
                  onClick={() => {
                    setQuantity((prev) => prev + 1);
                  }}
                  className="h-7 w-7 rounded-full flex items-center justify-center bg-slate-50 text-slate-400"
                >
                  <Plus className="w-3 h-3" />
                </button>
              </div>
            </div>
            <div className="flex flex-col gap-y-2.5">
              <p className="text-sm text-green-500">PRICE BREAKDOWN</p>
              <div className="flex flex-col border-b pb-[15px] gap-y-[5px]">
                {priceBreakdown.map((item, index) => (
                  <div
                    key={`itemId-${index + 1}`}
                    className="flex items-center justify-between"
                  >
                    <p className="text-slate-900 text-sm">{item.title}</p>
                    <p className="text-slate-900 text-sm">{item.value}</p>
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
                  className="rounded-[14px] border-slate-100 pl-6 p-4 text-slate-200 text-sm bg-transparent outline-none ring-0 ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0"
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
          <p className="text-slate-900 font-medium text-xl">Reviews</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
            <Review />
            <Review />
            <Review />
          </div>
        </div>
        <div className="flex flex-col gap-y-5">
          <p className="text-slate-900 font-medium text-xl">
            People also viewed
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 md:gap-[70px]">
            {peopleAlsoViewed?.map((item: ItemProps) => (
              <Link href={`/listings/${item.listing_id}`} key={item.listing_id}>
                <div className="flex flex-col gap-y-[15px]">
                  <Image
                    src={
                      item?.item_images?.[0]?.image_url || "/images/speaker.png"
                    }
                    alt="item"
                    height={195}
                    width={195}
                    className="object-cover rounded-lg"
                  />
                  <div className="flex flex-col text-sm">
                    <p className="text-slate-900 mb-0.5">
                      {item?.product_name}
                    </p>
                    <p className="text-slate-300">
                      Listed by {item?.full_name}
                    </p>
                    <p className="text-orange-600 font-medium">
                      Lagos 1.5 km away
                    </p>
                    <p className="text-slate-900 font-medium">
                      NGN {item?.price_per_day}{" "}
                      <span className="text-sm text-slate-400 font-normal">
                        per/day
                      </span>
                    </p>
                    <p className="text-slate-400">
                      {item?.quantity_available}/{item?.quantity_available}{" "}
                      Available for rent
                    </p>
                  </div>
                </div>
              </Link>
            ))}
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
