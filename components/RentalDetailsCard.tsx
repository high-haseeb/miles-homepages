"use client";
import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import PaystackPop from "@paystack/inline-js";
import { format } from "date-fns";
import { useToast } from "@/components/ui/use-toast";
import { useQueryClient, useMutation } from "@tanstack/react-query";

import { BookingDetails } from "@/types";
import { statusColor } from "@/constants";
import {
  cancelBooking,
  acceptBooking,
  declineBooking,
} from "@/services/general.api";
import { formattedStatus, toCurrency } from "@/utils";

interface ChatProps {
  details: BookingDetails;
  status: string;
}
export default function RentalDetailsCard({ status, details }: ChatProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: () => cancelBooking(details.listing_id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["listing", details.listing_id],
      });
    },
  });
  const listerCancel = useMutation({
    mutationFn: () => cancelBooking(details.booking_id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["listing", details.listing_id],
      });
    },
  });
  const acceptMutation = useMutation({
    mutationFn: () => acceptBooking(details.booking_id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["listing", details.booking_id],
      });
    },
  });
  const declineMutation = useMutation({
    mutationFn: () => declineBooking(details.booking_id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["listing", details.booking_id],
      });
    },
  });

  const calculatedPrice =
    Number(details?.price_per_day) *
    Number(details?.no_of_days) *
    details?.quantity;

  const totalPrice =
    calculatedPrice + Number(details?.service_charge) + Number(details?.vat);
  const priceBreakdown = [
    {
      title: `${toCurrency(Number(details?.price_per_day))} * ${
        details?.no_of_days
      } Day(s) * ${details?.quantity} items`,
      value: toCurrency(calculatedPrice),
    },
    {
      title: "Service Charge",
      value: toCurrency(Number(details?.service_charge)),
    },
    {
      title: "VAT",
      value: toCurrency(Number(details?.vat)),
    },
  ];
  const startDate = format(details?.start_date, "dd/MM/yyyy");
  const endDate = format(details?.end_date, "dd/MM/yyyy");

  const handleCancelBooking = async () => {
    try {
      await mutation.mutateAsync();
      toast({
        variant: "success",
        title: "Success",
        description: "Booking cancelled successfully",
      });
    } catch (err: any) {
      const errorMsg = mutation?.error?.message || err?.response?.data?.message;
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: errorMsg,
      });
    }
  };
  const handleListerCancel = async () => {
    try {
      await listerCancel.mutateAsync();
      toast({
        variant: "success",
        title: "Success",
        description: "Booking cancelled successfully",
      });
    } catch (err: any) {
      const errorMsg = mutation?.error?.message || err?.response?.data?.message;
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: errorMsg,
      });
    }
  };
  const handleAcceptBooking = async () => {
    try {
      await acceptMutation.mutateAsync();
      toast({
        variant: "success",
        title: "Success",
        description: "Booking accepted successfully",
      });
    } catch (err: any) {
      const errorMsg = mutation?.error?.message || err?.response?.data?.message;
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: errorMsg,
      });
    }
  };
  const handleDeclineBooking = async () => {
    try {
      await declineMutation.mutateAsync();
      toast({
        variant: "success",
        title: "Success",
        description: "Booking declined successfully",
      });
    } catch (err: any) {
      const errorMsg = mutation?.error?.message || err?.response?.data?.message;
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: errorMsg,
      });
    }
  };

  const formatStatus = formattedStatus(
    details?.listing_status ?? details?.rental_status
  );
  const statusTextStyles = statusColor[formatStatus].text;
  const statusBgStyles = statusColor[formatStatus].bg;

  // console.log(details);

  return (
    <div className="rounded-xl sm:border border-gray-4/35 sm:bg-white sm:p-5 flex flex-col">
      <div className="flex flex-col sm:flex-row sm:items-end gap-x-5 mb-[31px]">
        <Image
          src={details?.item_images[0].image_url || "/images/polaroid-card.png"}
          width={195}
          height={195}
          alt="polaroid"
          className="rounded-[10px] object-cover sm:w-[195px] hidden sm:block w-full sm:h-[195px] h-[300px]"
        />
        <div className="flex flex-col gap-y-5 flex-grow">
          <div className="flex sm:flex-col flex-row-reverse max-sm:justify-end max-sm:gap-x-3.5">
            <Badge
              className={`rounded-[15px] py-[3px] px-[15px] text-xs w-fit mb-2.5`}
              style={{
                color: statusTextStyles,
                backgroundColor: statusBgStyles,
              }}
            >
              {status === "renter"
                ? details?.listing_status
                : details?.rental_status}
            </Badge>
            <p className="text-sm text-slate-900 mb-0.5 max-sm:hidden">
              {details?.product_name}
            </p>
            <p className="text-green-500 font-medium">
              {toCurrency(Number(details?.price_per_day))}{" "}
              <span className="text-sm text-slate-500 font-normal">
                per/day
              </span>
            </p>
          </div>
          <div className="flex border border-gray-4/50 bg-white rounded-[15px] divide-x w-full">
            <div className="py-[9px] px-2 flex-1 xl:pl-[25px]">
              <p className="text-sm text-slate-400 mb-[7px]">START DATE</p>
              <p className="text-slate-800 font-medium text-sm">{startDate}</p>
            </div>
            <div className="py-[9px] px-2 flex-1 xl:pl-[25px]">
              <p className="text-sm text-slate-400 mb-[7px]">END DATE</p>
              <p className="text-slate-800 font-medium text-sm">{endDate}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between mb-[15px]">
        <p className="text-sm text-green-500">QUANTITY</p>
        <div className="flex items-center gap-x-5">{details?.quantity}</div>
      </div>
      <div className="flex flex-col gap-y-2.5">
        <p className="text-sm text-green-500">PRICE BREAKDOWN</p>
        <div className="flex flex-col border-b pb-[31px] mb-[15px] gap-y-[5px]">
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
        <div className="flex items-center justify-between mb-10">
          <p className="text-green-500 font-medium">Total</p>
          <p className="text-green-500 font-medium">{toCurrency(totalPrice)}</p>
        </div>
        <div
          className={`${
            status === "lister" &&
            details?.rental_status?.toLowerCase() === "awaiting approval"
              ? "flex justify-between"
              : "hidden"
          } items-center`}
        >
          <Button
            onClick={handleDeclineBooking}
            disabled={declineMutation.isPending}
            className="rounded-[38px] py-3 px-4 bg-transparent border-none font-medium text-slate-400"
          >
            Decline request
          </Button>
          <Button
            onClick={handleAcceptBooking}
            disabled={acceptMutation.isPending}
            className="rounded-[38px] py-3 px-4 bg-green-500 font-medium text-white border-none"
          >
            Accept request
          </Button>
        </div>
        <div
          className={`${
            status === "lister" &&
            details?.rental_status?.toLowerCase() === "awaiting payment"
              ? "flex justify-between"
              : "hidden"
          } items-center`}
        >
          <Button
            onClick={handleListerCancel}
            disabled={listerCancel.isPending}
            variant="ghost"
            className="rounded-[38px] py-3 px-4 bg-transparent hover:bg-red-600 border-none font-medium text-slate-400"
          >
            Cancel booking
          </Button>
          <Button
            onClick={handleAcceptBooking}
            disabled={
              acceptMutation.isPending ||
              details?.listing_status?.toLowerCase() === "awaiting payment"
            }
            className="rounded-[38px] py-3 px-4 bg-green-500 font-medium text-white border-none"
          >
            Request accepted
          </Button>
        </div>
        <div
          className={`${
            status === "renter" ? "flex" : "hidden"
          } justify-center w-full`}
        >
          {details?.listing_status.toLowerCase() === "pending request" && (
            <Button
              onClick={handleCancelBooking}
              disabled={mutation.isPending}
              className="rounded-[38px] py-3 px-4 bg-transparent hover:bg-red-600 border-none font-medium text-slate-400 w-full"
            >
              Cancel booking
            </Button>
          )}
          {details?.listing_status.toLowerCase() === "awaiting payment" && (
            <Button className="rounded-[38px] py-3 px-4 bg-green-500 font-medium text-white border-none w-full">
              Pay now
            </Button>
          )}
        </div>
      </div>
    </div>
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
