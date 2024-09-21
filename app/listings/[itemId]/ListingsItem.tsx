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
import { getListing, createBooking, getListings } from "@/services/general.api";
import { useAppContext } from "@/context/AppContext";
import VerificationModal from "@/components/Modals/VerificationModal";
import Backbtn from "@/components/Backbtn";
import { toCurrency, calculateDaysInRange } from "@/utils";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer";
import DrawerUp from "@/components/vectors/DrawerUp";
import DrawerDown from "@/components/vectors/DrawerDown";

export default function ListingsItem({ itemId }: { itemId: string }) {
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
  const mdateRange = item?.multiple_date_ranges
    ? item?.multiple_date_ranges.split(",")
    : null;
  const startDate =
    mdateRange?.[0] ?? item?.start_date ?? item?.recurring_start_date;
  const endDate =
    mdateRange?.[1] ?? item?.start_date ?? item?.recurring_end_date;

  useEffect(() => {
    setPrice(Number(item?.price_per_day));
    setDateRange({
      from: new Date(startDate),
      to: new Date(endDate),
    });
  }, [item, endDate, startDate]);

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
        quantity,
        no_of_days: String(calculateDaysInRange(dateRange)),
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
      <div className="flex flex-col lg:px-[93px] gap-y-10 relative">
        <div className="flex flex-col md:flex-row md:items-stretch justify-between max-md:gap-y-10 sm:gap-x-20 sm:mb-10">
          <div className="flex flex-col max-w-[632px] md:basis-[60%] w-full">
            <div className="mb-[30px]">
              <Backbtn />
            </div>
            <CarouselCard images={item?.item_images} />
            <div className="mt-[15px] mb-0.5">
              <p className="text-slate-900 text-xs sm:text-sm max-sm:mb-2.5">
                {item?.product_name} Listed by{" "}
                <span className="text-orange-500 font-medium">
                  {item?.full_name}
                </span>
              </p>
              <p className="text-slate-900 text-sm hidden sm:block">
                Lagos 1.5 km away
              </p>
              <p className="text-slate-900 text-sm max-sm:hidden">
                {item?.quantity_available}/{item?.quantity_available} Available
                for rent
              </p>
              <p className="text-xs text-slate-300 sm:hidden">
                Quantity Available: {item?.quantity_available}/
                {item?.quantity_available}
              </p>
              <p className="text-slate-900 text-sm sm:hidden">
                NGN 50,000{" "}
                <span className="text-xs text-slate-300">per/day</span>
              </p>
            </div>
            <div className="flex flex-col sm:mt-[30px] max-sm:py-2.5">
              <p className="text-xl text-slate-900 mb-2.5 hidden sm:block">
                Description
              </p>
              <p className="text-slate-400 text-xs sm:text-sm">
                {item?.description}{" "}
                {item?.description?.length > 215 && (
                  <span className="text-orange-600">Read More</span>
                )}
              </p>
            </div>
          </div>

          <div className="hidden border border-slate-100 rounded-[14px] py-4.5 px-6 sm:flex flex-col gap-y-[15px] w-full md:basis-[40%]">
            <div className="flex flex-col">
              <p className="text-sm text-slate-900">{item?.product_name}</p>
              <p className="text-green-500 font-medium mb-4">
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
                  disabled={[
                    { before: new Date(startDate) },
                    { after: new Date(endDate) },
                  ]}
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
                  className="rounded-[14px] border-slate-100 pl-6 p-4 text-slate-400 text-sm bg-transparent outline-none ring-0 ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                  placeholder="Send any other details about your request"
                />
              </div>
              <div className="flex w-full">
                <Button
                  onClick={handleBookingRequest}
                  disabled={mutation.isPending}
                  className="rounded-[38px] w-full py-3 px-4 bg-green-500 font-medium text-white border-none h-auto"
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

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 md:gap-[70px] mb-[124px] sm:mb-0">
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
        <div className="sm:hidden fixed w-full bottom-0 left-0 bg-white rounded-t-[25px] px-[25px] py-[31px]">
          <Drawer>
            <DrawerTrigger asChild>
              <div className="relative">
                <div className="absolute h-[70px] w-[70px] left-10 bg-white rounded-full -top-1/2 -translate-y-1/2 flex justify-center items-center">
                  <DrawerUp />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex flex-col gap-y-[2.5px] flex-1 z-10">
                    <p className="text-slate-900 font-medium">
                      {toCurrency(Number(item?.price_per_day))}{" "}
                      <span className="text-sm text-slate-400 font-normal">
                        per/day
                      </span>
                    </p>
                    <p className="text-slate-900 text-xs font-medium">
                      Nov 01 - Nov 15, 2020
                    </p>
                  </div>
                  <Button className="rounded-[38px] w-full py-3 px-4 bg-green-500 font-medium text-white border-none flex-1 h-auto">
                    Request to book
                  </Button>
                </div>
              </div>
            </DrawerTrigger>
            <DrawerContent className="rounded-t-[25px] border-none">
              <div className="relative">
                <DrawerClose className="absolute z-10 h-[70px] w-[70px] left-10 bg-white rounded-full -top-8 flex justify-center items-center">
                  <DrawerDown />
                </DrawerClose>
                <div className="py-[31px] px-[25px] relative">
                  <div className="flex flex-col">
                    <p className="text-green-500 font-medium mb-4">
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
                          <p className="text-sm text-slate-400 mb-[7px]">
                            END DATE
                          </p>
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
                        disabled={[
                          { before: new Date(startDate) },
                          { after: new Date(endDate) },
                        ]}
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
                          setPrice(
                            (prev) => prev - Number(item?.price_per_day)
                          );
                        }}
                        className="h-7 w-7 rounded-full flex items-center justify-center bg-slate-50 text-slate-400"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      {quantity}
                      <button
                        onClick={() => {
                          if (quantity === Number(item?.quantity_listed))
                            return;
                          setQuantity((prev) => prev + 1);
                          setPrice(
                            (prev) => prev + Number(item?.price_per_day)
                          );
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
                    <div className="flex w-full my-8">
                      <Button
                        onClick={handleBookingRequest}
                        disabled={mutation.isPending}
                        className="rounded-[38px] w-full py-3 px-4 bg-green-500 font-medium text-white border-none h-auto"
                      >
                        Request to book
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </DrawerContent>
          </Drawer>
        </div>
      </div>
      <VerificationModal
        openModal={openVerifModal}
        handleOpenModal={setOpenVerifModal}
      />
    </DashboardLayout2>
  );
}
