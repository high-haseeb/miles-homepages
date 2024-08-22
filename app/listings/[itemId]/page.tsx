"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import { Minus, Plus } from "lucide-react";
import { format } from "date-fns";
import { DateRange } from "react-day-picker";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { PopoverClose } from "@radix-ui/react-popover";

import DashboardLayout2 from "@/components/Layouts/DashboardLayout2";
import { CarouselCard } from "@/components/ListedItemCard";
import { ItemProps } from "@/types";
import Review from "@/components/Review";
import { getListing, createBooking } from "@/services/general.api";
import { useAppContext } from "@/context/AppContext";
import VerificationModal from "@/components/Modals/VerificationModal";
import Backbtn from "@/components/Backbtn";
import { toCurrency, calculateDaysInRange } from "@/utils";

export default function ListedItem({ params }: { params: { itemId: string } }) {
  const { itemId } = params;
  const router = useRouter();
  const { isLoggedIn, isVerified } = useAppContext();
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [desc, setDesc] = useState<string>();
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(0);
  const [openVerifModal, setOpenVerifModal] = useState(false);
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [openCalendar, setOpenCalendar] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [priceDays, setPriceDays] = useState(0);

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
  const peopleAlsoViewed = listing?.data?.peopleAlsoViewed;

  useEffect(() => {
    const mdateRange = item?.multiple_date_ranges
      ? item?.multiple_date_ranges.split(",")
      : null;
    const startDate =
      mdateRange?.[0] ?? item?.start_date ?? item?.recurring_start_date;
    const endDate =
      mdateRange?.[1] ?? item?.start_date ?? item?.recurring_end_date;

    setPrice(Number(item?.price_per_day));
    setDateRange({
      from: new Date(startDate),
      to: new Date(endDate),
    });
  }, [item]);

  useEffect(() => {
    if (dateRange) {
      const days = calculateDaysInRange(dateRange!);
      if (days !== null) {
        const totalP = price * days;
        setPriceDays(totalP);
        setTotalPrice(totalP + 500 + 125);
      }
    }
  }, [price, dateRange]);

  const priceBreakdown = [
    {
      title: `${toCurrency(price)} x ${calculateDaysInRange(dateRange)}`,
      value: toCurrency(priceDays),
    },
    {
      title: "Service Charge",
      value: toCurrency(500),
    },
    {
      title: "VAT",
      value: toCurrency(125),
    },
  ];

  const handleBookingRequest = async () => {
    if (!isLoggedIn) {
      router.push("/login");
      return;
    }
    if (!isVerified) {
      setOpenVerifModal(true);
      return;
    }
    try {
      const values = {
        listing_id: Number(itemId),
        price: item?.price_per_day,
        service_charge: "50",
        vat: "50",
        start_date: format(dateRange?.from as Date, "MM/dd/yyyy"),
        end_date: format(dateRange?.to as Date, "MM/dd/yyyy"),
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
                {toCurrency(price)}{" "}
                <span className="text-sm text-slate-500">per/day</span>
              </p>
            </div>
            <Popover onOpenChange={setOpenCalendar} open={openCalendar}>
              <PopoverTrigger asChild>
                <div className="flex border border-gray-4/50 rounded-[15px] divide-x w-full cursor-pointer">
                  <div className="py-2 px-6 flex-1">
                    <p className="text-sm text-slate-400 mb-[7px]">
                      START DATE
                    </p>
                    <p className="text-slate-800 font-medium text-sm">
                      {dateRange?.from instanceof Date &&
                      !isNaN(dateRange.from.getTime())
                        ? format(dateRange.from, "MM/dd/yyyy")
                        : item?.start_date}
                    </p>
                  </div>
                  <div className="py-2 px-6 flex-1">
                    <p className="text-sm text-slate-400 mb-[7px]">END DATE</p>
                    <p className="text-slate-800 font-medium text-sm">
                      {dateRange?.to instanceof Date &&
                      !isNaN(dateRange.to.getTime())
                        ? format(dateRange.to, "MM/dd/yyyy")
                        : item?.end_date}
                    </p>
                  </div>
                </div>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  initialFocus
                  mode="range"
                  defaultMonth={dateRange?.from}
                  selected={dateRange}
                  onSelect={setDateRange}
                  numberOfMonths={1}
                />
                <div className="flex items-center justify-end gap-x-2 mt-4 border border-t p-3">
                  <PopoverClose asChild>
                    <Button
                      className="text-sm text-black py-1 px-3 rounded-lg"
                      variant="ghost"
                    >
                      Cancel
                    </Button>
                  </PopoverClose>
                  <Button
                    onClick={() => {
                      setOpenCalendar(false);
                    }}
                    className="text-sm text-white bg-green-500 py-1 px-3 rounded-lg"
                  >
                    Save
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
            <div className="flex items-center gap-x-10 my-[21px]">
              <p className="text-sm text-green-500">QUANTITY</p>
              <div className="flex items-center gap-x-5">
                <button
                  onClick={() => {
                    if (quantity === 1) return;
                    setQuantity((prev) => prev - 1);
                    setPrice((prev) => prev - Number(item?.price_per_day));
                  }}
                  className="h-7 w-7 rounded-full flex items-center justify-center bg-slate-50 text-slate-400"
                >
                  <Minus className="w-3 h-3" />
                </button>
                {quantity}
                <button
                  onClick={() => {
                    if (quantity === Number(item?.quantity_available)) return;
                    setQuantity((prev) => prev + 1);
                    setPrice((prev) => prev + Number(item?.price_per_day));
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
                <p className="text-green-500 font-bold text-sm">
                  {toCurrency(totalPrice)}
                </p>
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
