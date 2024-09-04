"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

import {
  myListing,
  updateListingAvailability,
  myListings,
} from "@/services/general.api";
import DashboardLayout2 from "@/components/Layouts/DashboardLayout2";
import Backbtn from "@/components/Backbtn";
import Review from "@/components/Review";
import { CarouselCard } from "@/components/ListedItemCard";
import { statusColor } from "@/constants";
import { formattedStatus } from "@/utils";
import { Button } from "@/components/ui/button";
import { GreenCalendarIcon } from "@/components/vectors/CalendarIcon";
import { ItemProps } from "@/types";
import EditAvailability from "./modals/EditAvailability";
import ConfirmDelete from "./modals/ConfirmDelete";
import { toCurrency } from "@/utils";

export default function MyListing({
  params: { itemId },
}: {
  params: { itemId: number };
}) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [availability, setAvailability] = useState(false);
  const [hasChanged, setHasChanged] = useState(false);
  const [openAvailability, setOpenEditAvailability] = useState(false);
  const [openConfirmDelete, setOpenConfirmDelete] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleReadMore = () => {
    setIsExpanded(!isExpanded);
  };

  const { data: listing, isPending } = useQuery({
    queryKey: ["listing"],
    queryFn: () => myListing(itemId),
  });

  const { data: allListings } = useQuery({
    queryKey: ["my-listings"],
    queryFn: () => myListings(),
  });
  const userListings = allListings?.data?.userListings;
  const filteredUserListings = userListings?.filter(
    (listing: ItemProps) => Number(listing?.listing_id) !== Number(itemId)
  );

  const mutationAvailability = useMutation({
    mutationFn: updateListingAvailability,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["listing", itemId] });
    },
  });

  // console.log(listing);
  const listedItem = listing?.data?.listing;
  const formatStatus = formattedStatus(listedItem?.status);
  const statusTextStyles = statusColor[formatStatus].text;
  const statusBgStyles = statusColor[formatStatus].bg;

  useEffect(() => {
    if (listedItem?.status === "Available for Booking") {
      setAvailability(true);
    } else setAvailability(false);
  }, [listedItem]);

  useEffect(() => {
    if (!hasChanged) return;
    const updateAvailability = async () => {
      const status = availability
        ? "Available for Booking"
        : "Unavailable for Booking";
      const payload = { status };
      const params = { id: itemId };

      try {
        await mutationAvailability.mutateAsync({ params, payload });
        toast({
          variant: "success",
          title: "Success",
          description: "Listing availability updated.",
        });
      } catch (err: any) {
        const errorMsg = err?.response?.data?.message || "An error occurred.";
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: errorMsg,
        });
      }
    };

    updateAvailability();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [availability, hasChanged]);

  const handleAvailabilityChange = (newValue: boolean) => {
    setAvailability(newValue);
    setHasChanged(true);
  };

  const truncatedDescription =
    listedItem?.description?.slice(0, 215) +
    (listedItem?.description?.length > 215 ? "..." : "");

  function handleEdit() {
    const formattedListedItem: any = {};

    for (const [key, value] of Object.entries(listedItem)) {
      if (value !== null && value !== undefined) {
        if (key === "category_id" || key === "sub_category_id") {
          formattedListedItem[key] = String(value);
        } else if (
          [
            "estimated_value",
            "price_per_day",
            "quantity_available",
            "latitude",
            "longitude",
          ].includes(key)
        ) {
          formattedListedItem[key] = Number(value);
        } else if (
          key === "multiple_date_ranges" &&
          typeof value === "string" &&
          value
        ) {
          const dates = value.split(", ");
          if (dates.length === 2) {
            formattedListedItem[key] = {
              from: new Date(dates[0]),
              to: new Date(dates[1]),
            };
          }
        } else if (
          key === "recurring_days_of_week" &&
          typeof value === "string" &&
          value
        ) {
          const days = value.split(", ");
          formattedListedItem[key] = days;
        } else {
          formattedListedItem[key] = value;
        }
      }
    }

    try {
      localStorage.setItem("listItemForm", JSON.stringify(formattedListedItem));

      if (listedItem?.listing_id) {
        router.push(
          `/manage-listings/list-item?edit=true&itemID=${listedItem.listing_id}`
        );
      } else {
        console.error("No listing ID found");
      }
    } catch (error) {
      console.error("Failed to save data or navigate:", error);
    }
  }

  return (
    <DashboardLayout2>
      <div className="flex flex-col lg:px-[93px] gap-y-10">
        <div className="flex flex-col md:flex-row items-stretch md:gap-x-[112px]">
          <div className="flex flex-col gap-y-[30px] w-full">
            <Backbtn />
            <div className="flex flex-col gap-y-[15px]">
              <CarouselCard images={listedItem?.item_images} />
              <div className="flex flex-col">
                <div className="flex items-center gap-x-[15px] mb-[5px]">
                  <p className="text-sm text-slate-900">
                    {listedItem?.product_name}
                  </p>
                  <Badge
                    className={`rounded-[15px] py-[3px] px-[15px] text-xs w-fit`}
                    style={{
                      color: statusTextStyles,
                      backgroundColor: statusBgStyles,
                    }}
                  >
                    {listedItem?.status}
                  </Badge>
                </div>
                <p className="text-slate-900 font-medium">
                  {toCurrency(Number(listedItem?.price_per_day))}{" "}
                  <span className="text-sm text-slate-400">per/day</span>
                </p>
                <p className="text-slate-400 text-sm">
                  {listedItem?.quantity_available}/
                  {listedItem?.quantity_available} Available for rent
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col w-full justify-between">
            <div>
              <p className="text-xl text-slate-900 mb-2.5">Description</p>
              <p className="text-slate-400 text-sm">
                {isExpanded ? listedItem?.description : truncatedDescription}{" "}
                {listedItem?.description?.length > 215 && (
                  <button className="text-orange-600" onClick={toggleReadMore}>
                    {isExpanded ? "Read Less" : "Read More"}
                  </button>
                )}
              </p>
            </div>
            <div className="flex items-center gap-x-3">
              <Label
                className="text-sm text-slate-900 font-medium"
                htmlFor="availability"
              >
                Set Availability On/Off
              </Label>
              <Switch
                id="availability"
                checked={availability}
                onCheckedChange={handleAvailabilityChange}
                className="data-[state=checked]:bg-green-500 h-6 w-11"
              />
            </div>
            <div>
              <button
                onClick={() => setOpenEditAvailability(true)}
                className="flex items-center gap-x-[7px] text-sm font-medium text-slate-900"
              >
                Edit Availability <GreenCalendarIcon />
              </button>
            </div>
            <div className="flex items-center gap-x-[50px]">
              <Button
                onClick={handleEdit}
                className="rounded-lg bg-green-500 py-5 px-10 h-auto text-white font-medium"
              >
                Edit Listing
              </Button>
              <Button
                onClick={() => setOpenConfirmDelete(true)}
                className="rounded-lg bg-transparent py-5 px-10 h-auto text-slate-400"
              >
                Delete listing
              </Button>
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
          <p className="text-slate-900 font-medium text-xl">More Listings</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 md:gap-[70px]">
            {filteredUserListings?.map((item: ItemProps) => {
              const formatStatus = formattedStatus(item?.status);
              const statusTextStyles = statusColor[formatStatus].text;
              const statusBgStyles = statusColor[formatStatus].bg;
              return (
                <Link
                  href={`/manage-listings/${item.listing_id}`}
                  key={item.listing_id}
                >
                  <div className="flex flex-col gap-y-[15px]">
                    <Image
                      src={
                        item?.item_images?.[0]?.image_url ||
                        "/images/speaker.png"
                      }
                      alt="item"
                      height={195}
                      width={195}
                      className="object-cover h-[195px] w-[195px] rounded-lg"
                    />
                    <Badge
                      className={`rounded-[15px] py-[3px] px-[15px] text-xs w-fit`}
                      style={{
                        color: statusTextStyles,
                        backgroundColor: statusBgStyles,
                      }}
                    >
                      {item?.status}
                    </Badge>
                    <div className="flex flex-col text-sm">
                      <p className="text-slate-900 mb-0.5">
                        {item?.product_name}
                      </p>
                      <p className="text-slate-900 font-medium">
                        {toCurrency(Number(item?.price_per_day))}{" "}
                        <span className="text-sm text-slate-400 font-normal">
                          per/day
                        </span>
                      </p>
                      <p className="text-slate-400">
                        {item?.quantity_available}/{item?.quantity_listed}{" "}
                        Available for rent
                      </p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
      <EditAvailability
        id={listedItem?.listing_id}
        openModal={openAvailability}
        handleOpenModal={setOpenEditAvailability}
      />
      <ConfirmDelete
        itemId={itemId}
        openModal={openConfirmDelete}
        handleOpenModal={setOpenConfirmDelete}
      />
    </DashboardLayout2>
  );
}
