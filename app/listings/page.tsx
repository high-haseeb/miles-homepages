"use client";
import React, { useState } from "react";
import Link from "next/link";
import { APIProvider, Map, InfoWindow } from "@vis.gl/react-google-maps";
import DashboardLayout2 from "@/components/Layouts/DashboardLayout2";
import { ListedItemCard2 } from "@/components/ListedItemCard";
import { GOOGLE_PLACES_API_KEY } from "@/constants";
import CustomMarker from "@/components/CustomMarker";
import { ItemProps } from "@/types";

const items: ItemProps[] = [
  {
    id: 1,
    name: "Canon SB-6A",
    price: 50000,
    location: "Lagos 16 km away",
    lat: 6.5244,
    lng: 3.3792,
    itemId: "1a2b3c",
  },
  {
    id: 2,
    name: "Nikon SB-4A",
    price: 30000,
    location: "Lagos 1.5 km away",
    lat: 6.465422,
    lng: 3.406448,
    itemId: "4d5e6f",
  },
  {
    id: 3,
    name: "Nikon SB-4A",
    price: 30000,
    location: "Lagos 1.5 km away",
    lat: 6.785422,
    lng: 5.406448,
    itemId: "7g8h9i",
  },
  {
    id: 4,
    name: "Sikon SB-4A",
    price: 30000,
    location: "Lagos 1.5 km away",
    lat: 16.465422,
    lng: 11.406448,
    itemId: "10j11k12l",
  },
  {
    id: 5,
    name: "Dikon SB-4A",
    price: 30000,
    location: "Lagos 1.5 km away",
    lat: 8.465422,
    lng: 12.406448,
    itemId: "13m14n15o",
  },
  {
    id: 6,
    name: "Zikon SB-4A",
    price: 30000,
    location: "Lagos 1.5 km away",
    lat: 2.465422,
    lng: 5.406448,
    itemId: "16p17q18r",
  },
  // Add more items here
];

export default function Listings() {
  const [selectedItem, setSelectedItem] = useState<ItemProps | null>(null);

  const containerStyle = {
    width: "100%",
    height: "100%",
  };

  const defaultCenter = {
    lat: 6.5244,
    lng: 3.3792,
  };

  return (
    <DashboardLayout2 noPaddingY>
      <div className="flex flex-col md:flex-row gap-[30px] h-full max-h-screen overflow-hidden md:-mx-[30px]">
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-[30px] overflow-y-auto md:pl-[30px] md:py-[25px]">
          {items.map((item) => (
            <Link href={`/listings/${item.itemId}`} key={item.id}>
              <ListedItemCard2 />
            </Link>
          ))}
        </div>
        <div className="flex-1">
          <APIProvider apiKey={GOOGLE_PLACES_API_KEY}>
            <Map
              style={{ width: "100%", height: "100%" }}
              defaultCenter={defaultCenter}
              defaultZoom={12}
              gestureHandling="greedy"
              disableDefaultUI
            >
              {items.map((item) => (
                <CustomMarker
                  key={item.id}
                  lat={item.lat}
                  lng={item.lng}
                  price={item.price}
                  onClick={() => setSelectedItem(item)}
                />
              ))}
              {selectedItem && (
                <InfoWindow
                  position={{ lat: selectedItem.lat, lng: selectedItem.lng }}
                  onCloseClick={() => setSelectedItem(null)}
                >
                  <div>
                    <h4>{selectedItem.name}</h4>
                    <p>NGN {selectedItem.price} per day</p>
                    <p>{selectedItem.location}</p>
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
