import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
import { formattedStatus } from "@/utils";

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
        queryKey: ["listing", details.listing_id, "cancel"],
      });
    },
  });
  const acceptMutation = useMutation({
    mutationFn: () => acceptBooking(details.booking_id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["listing", details.booking_id, "accept"],
      });
    },
  });
  const declineMutation = useMutation({
    mutationFn: () => declineBooking(details.booking_id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["listing", details.booking_id, "decline"],
      });
    },
  });
  const priceBreakdown = [
    {
      title: `NGN ${details?.price_per_day} * (x) Days`,
      value: `NGN ${details?.price_per_day}x`,
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
  const startDate = format(details?.start_date, "dd/MM/yyyy");
  const endDate = format(details?.end_date, "dd/MM/yyyy");
  // console.log(details);
  const handleCancelBooking = async () => {
    try {
      const res = await mutation.mutateAsync();
      console.log(res);
    } catch (err: any) {
      const errorMsg = err?.response?.data?.message || mutation.error;
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: errorMsg,
      });
    }
  };
  const handleAcceptBooking = async () => {
    try {
      const res = await acceptMutation.mutateAsync();
      console.log(res);
    } catch (err: any) {
      const errorMsg = err?.response?.data?.message || mutation.error;
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: errorMsg,
      });
    }
  };
  const handleDeclineBooking = async () => {
    try {
      const res = await declineMutation.mutateAsync();
      console.log(res);
    } catch (err: any) {
      const errorMsg = err?.response?.data?.message || mutation.error;
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

  return (
    <div className="rounded-xl border border-gray-4/35 bg-white p-5 flex flex-col overflow-x-hidden">
      <div className="flex items-end gap-x-[30px] mb-[22px]">
        <Image
          src={details?.item_images[0].image_url || "/images/polaroid-card.png"}
          width={200}
          height={200}
          alt="polaroid"
          className="rounded-[10px] object-contain"
        />
        <div className="flex flex-col gap-y-2.5 flex-grow">
          <div className="flex flex-col">
            <Badge
              className={`rounded-[15px] py-[3px] px-[15px] text-xs w-fit`}
              style={{
                color: statusTextStyles,
                backgroundColor: statusBgStyles,
              }}
            >
              {status === "renter"
                ? details?.listing_status
                : details?.rental_status}
            </Badge>
            <p className="mb-[5px] text-slate-900">{details?.product_name}</p>
            <p className="text-lg text-green-500 font-medium">
              NGN {details?.price_per_day}
            </p>
            <p className="text-sm text-slate-500 font-normal">per/day</p>
          </div>
          <div className="flex border border-gray-4/50 bg-white rounded-[15px] divide-x w-full">
            <div className="py-[15px] px-2 flex-1 pl-[25px]">
              <p className="text-sm text-slate-400 mb-[7px]">START DATE</p>
              <p className="text-slate-800 font-medium">{startDate}</p>
            </div>
            <div className="py-[15px] px-2 flex-1 pl-[25px]">
              <p className="text-sm text-slate-400 mb-[7px]">END DATE</p>
              <p className="text-slate-800 font-medium">{endDate}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-y-2.5">
        <p className="text-sm text-slate-400">PRICE BREAKDOWN</p>
        <div className="flex flex-col border-b pb-[31px] mb-[31px] gap-y-[5px]">
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
        <div className="flex items-center justify-between mb-[31px]">
          <p className="text-green-500 font-medium text-xl">Total</p>
          <p className="text-green-500 font-medium text-xl">
            NGN {details?.price}
          </p>
        </div>
        <div
          className={`${
            status === "renter" ? "hidden" : "flex justify-between"
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
            status === "renter" ? "flex" : "hidden"
          } justify-center w-full`}
        >
          {details?.listing_status.toLowerCase() === "pending request" && (
            <Button
              onClick={handleCancelBooking}
              disabled={mutation.isPending}
              className="rounded-[38px] py-3 px-4 bg-transparent border-none font-medium text-slate-400"
            >
              Cancel booking
            </Button>
          )}
          {details?.listing_status.toLowerCase() === "awaiting payment" && (
            <Button className="rounded-[38px] py-3 px-4 bg-green-500 font-medium text-white border-none">
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
