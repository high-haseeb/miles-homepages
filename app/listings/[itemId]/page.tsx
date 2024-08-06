"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useQuery } from "@tanstack/react-query";

import DashboardLayout2 from "@/components/Layouts/DashboardLayout2";
import { CarouselCard } from "@/components/ListedItemCard";
import { ItemProps } from "@/types";
import Review from "@/components/Review";
import {
  getListing,
  searchListings,
  getListings,
} from "@/services/general.api";

export default function ListedItem({ params }: { params: { itemId: string } }) {
  const router = useRouter();
  const { itemId } = params;
  const route = useRouter();

  const { data: listing, isPending } = useQuery({
    queryKey: ["listing"],
    queryFn: () => getListing(itemId),
  });
  const { data: listings, isPending: isListingsPending } = useQuery({
    queryKey: ["listings"],
    queryFn: () =>
      getListings({
        category: 1,
        location: "lagos",
      }),
  });
  const item = listing?.data;
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
                <p className="text-slate-800 font-medium">01/11/2020</p>
              </div>
              <div className="py-2 px-6 flex-1">
                <p className="text-sm text-slate-400 mb-[7px]">END DATE</p>
                <p className="text-slate-800 font-medium">01/11/2020</p>
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
                  className="rounded-[14px] border-slate-100 pl-6 p-4 text-slate-200 text-sm bg-transparent"
                  placeholder="Send any other details about your request"
                />
              </div>
              <div className="flex w-full">
                <Button
                  onClick={() => route.push(`/renting/${itemId}`)}
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
            {listings?.data?.map((item: ItemProps) => (
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
    </DashboardLayout2>
  );
}

const priceBreakdown = [
  {
    title: "NGN 50,000 X 2 Days",
    value: "NGN 100,000",
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
