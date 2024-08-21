"use client";
import React, { FormEvent, useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { APIProvider, Map, InfoWindow } from "@vis.gl/react-google-maps";
import { useQuery } from "@tanstack/react-query";
import { DateRange } from "react-day-picker";
import { addDays, format } from "date-fns";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import DashboardLayout2 from "@/components/Layouts/DashboardLayout2";
import { ListedItemCard2 } from "@/components/ListedItemCard";
import { GOOGLE_PLACES_API_KEY } from "@/constants";
import CustomMarker from "@/components/CustomMarker";
import { ItemProps, CategoryProps } from "@/types";
import {
  getListings,
  searchListings,
  getCategories,
} from "@/services/general.api";
import { Button } from "@/components/ui/button";

export default function Listings() {
  const router = useRouter();
  const [selectedItem, setSelectedItem] = useState<ItemProps | null>(null);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [currentListings, setCurrentListings] = useState([]);
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState<CategoryProps>();
  const [date, setDate] = React.useState<DateRange | undefined>();

  const updateSearchParams = (keyword: string) => {
    const searchParams = new URLSearchParams(window.location.search);

    if (keyword) {
      searchParams.set("search", keyword);
    } else {
      searchParams.delete("search");
    }
    const newPathname = `${
      window.location.pathname
    }?${searchParams.toString()}`;
    router.push(newPathname);
  };

  const handleSearchSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchKeyword === "") return;
    updateSearchParams(searchKeyword);
  };

  const { data: listings, isPending } = useQuery({
    queryKey: ["listings", category?.category_id],
    queryFn: () =>
      getListings({
        category: category?.category_id || "",
        location: "",
        startDate: "",
        endDate: "",
      }),
  });

  const { data: categories } = useQuery({
    queryKey: ["category"],
    queryFn: getCategories,
  });

  const { data: searchResult, isPending: isSearching } = useQuery({
    queryKey: ["listings", searchKeyword],
    queryFn: () => searchListings(searchKeyword),
  });

  useEffect(() => {
    if (searchKeyword) {
      setCurrentListings(searchResult?.data);
    } else {
      setCurrentListings(listings?.data);
    }
  }, [listings, searchKeyword, searchResult]);

  const defaultCenter = {
    lat: 6.5244,
    lng: 3.3792,
  };

  if (isPending) {
    return <p>Loading...</p>;
  }

  return (
    <DashboardLayout2
      noPaddingY
      searchValue={searchKeyword}
      handleSearchChange={(e) => setSearchKeyword(e.target.value)}
      handleSearchSubmit={handleSearchSubmit}
    >
      <div className="flex flex-col md:flex-row gap-[30px] h-full max-h-screen overflow-hidden md:-mx-[30px]">
        <div className="flex flex-col flex-1 pb-[25px]">
          <div className="px-[30px] py-[23px] flex items-center justify-between">
            <div className="flex items-center gap-x-2.5">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className="py-2 px-[15px] hover:bg-hover-color text-slate-900 active:text-white bg-transparent active:bg-green-500 border border-gray-4 active:border-none rounded-[22px]">
                    {category?.category_name || "Category"}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {categories?.data?.map((category: CategoryProps) => (
                    <DropdownMenuItem
                      onClick={() => setCategory(category)}
                      key={category?.category_id}
                    >
                      {category?.category_name}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              <Button className="py-2 px-[15px] hover:bg-hover-color text-slate-900 active:text-white bg-transparent active:bg-green-500 border border-gray-4 active:border-none rounded-[22px]">
                Location
              </Button>
              <Popover>
                <PopoverTrigger asChild>
                  <Button className="py-2 px-[15px] hover:bg-hover-color text-slate-900 active:text-white bg-transparent active:bg-green-500 border border-gray-4 active:border-none rounded-[22px]">
                    Dates
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    initialFocus
                    mode="range"
                    defaultMonth={date?.from}
                    selected={date}
                    onSelect={setDate}
                    numberOfMonths={1}
                  />
                </PopoverContent>
              </Popover>
            </div>
            <p className="text-sm text-black">
              {currentListings?.length} result(s)
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-[30px] gap-y-10 overflow-y-auto md:pl-[30px]">
            {currentListings?.map((item: ItemProps) => (
              <ListedItemCard2
                item={item}
                link={`/listings/${item.listing_id}`}
                key={item.listing_id}
              />
            ))}
          </div>
        </div>
        <div className="flex-1">
          <APIProvider apiKey={GOOGLE_PLACES_API_KEY!}>
            <Map
              style={{ width: "100%", height: "100%" }}
              defaultCenter={defaultCenter}
              defaultZoom={12}
              gestureHandling="greedy"
              disableDefaultUI
            >
              {listings?.data.map((item: ItemProps) => (
                <CustomMarker
                  key={item.listing_id}
                  lat={Number(item.latitude)}
                  lng={Number(item.longitude)}
                  price={item.price_per_day}
                  onClick={() => setSelectedItem(item)}
                />
              ))}
              {selectedItem && (
                <InfoWindow
                  position={{
                    lat: Number(selectedItem.latitude),
                    lng: Number(selectedItem.longitude),
                  }}
                  onCloseClick={() => setSelectedItem(null)}
                >
                  <div className="p-4 flex items-center gap-x-4">
                    <div>
                      <Image
                        src={selectedItem?.item_images?.[0]?.image_url}
                        alt="item"
                        width={100}
                        height={100}
                        className="object-cover rounded-full"
                      />
                    </div>
                    <div>
                      <h4 className="text-sm text-slate-800">
                        {selectedItem.product_name}
                      </h4>
                      <p>NGN {selectedItem.price_per_day} per day</p>
                      <p>{selectedItem.item_location}</p>
                    </div>
                  </div>
                </InfoWindow>
              )}
            </Map>
          </APIProvider>
        </div>
      </div>
    </DashboardLayout2>
  );
}
