"use client";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import DashboardLayout2 from "@/components/Layouts/DashboardLayout2";
import { CarouselCard } from "@/components/ListedItemCard";
import { ItemProps } from "@/types";
import Review from "@/components/Review";

const items: ItemProps[] = [
  {
    id: 1,
    name: "Canon SB-6A",
    price: 50000,
    location: "Lagos 16 km away",
    lat: 6.5244,
    lng: 3.3792,
    itemId: "1a2b3c",
    img: "/images/speaker.png",
  },
  {
    id: 2,
    name: "Nikon SB-4A",
    price: 30000,
    location: "Lagos 1.5 km away",
    lat: 6.465422,
    lng: 3.406448,
    itemId: "4d5e6f",
    img: "/images/speaker.png",
  },
  {
    id: 3,
    name: "Nikon SB-4A",
    price: 30000,
    location: "Lagos 1.5 km away",
    lat: 6.785422,
    lng: 5.406448,
    itemId: "7g8h9i",
    img: "/images/speaker.png",
  },
  {
    id: 4,
    name: "Sikon SB-4A",
    price: 30000,
    location: "Lagos 1.5 km away",
    lat: 16.465422,
    lng: 11.406448,
    itemId: "10j11k12l",
    img: "/images/speaker.png",
  },
  // Add more items here
];

export default function ListedItem() {
  const router = useRouter();
  const params = useParams();
  const { itemId } = params;
  const route = useRouter();
  return (
    <DashboardLayout2>
      <div className="flex flex-col lg:px-[155px]">
        <div className="flex items-stretch justify-between sm:gap-x-20 mb-10">
          <div className="flex flex-col max-w-[632px]">
            <CarouselCard />
            <div className="mt-5 mb-4.5">
              <p className="mb-[5px] text-slate-400">
                Listed by{" "}
                <span className="text-orange-500 font-medium">
                  Femi . Lawal
                </span>
              </p>
              <p className="text-slate-500">Lagos 1.5 km away</p>
            </div>
            <div className="flex flex-col">
              <p className="text-xl text-slate-900 mb-2.5">Description</p>
              <p className="text-slate-400">
                EOS R5 is a powerhouse mirrorless camera, boasting
                groundbreaking features like 8K video recording and a
                high-resolution sensor for exceptional image quality. With
                advanced autofocus and in-body image stabilization...{" "}
                <span className="text-orange-600">Read More</span>
              </p>
            </div>
          </div>
          <div className="border border-slate-100 rounded-[14px] py-4.5 px-6 flex flex-col gap-y-[15px] w-full">
            <div className="flex flex-col">
              <p className="mb-[5px] text-slate-900">Canon SB-6A</p>
              <p className="text-lg text-green-500 font-medium">
                NGN 50,000{" "}
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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-[70px]">
          {items.map((item) => (
            <Link href={`/listings/${item.itemId}`} key={item.id}>
              <div className="flex flex-col gap-y-[15px]">
                <Image
                  src={item.img || "/images/speaker.png"}
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
