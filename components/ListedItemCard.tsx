"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { ItemProps, ItemImagesProps } from "@/types";

import Chip from "./Chip";

export default function ListedItemCard({ item }: { item: ItemProps }) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <div className="flex flex-col gap-y-[15px]">
      <Carousel setApi={setApi} className="w-full max-w-xs">
        <CarouselContent>
          {item.item_images.map((imageItem: ItemImagesProps) => (
            <CarouselItem
              key={imageItem.image_id}
              className="relative basis-[100%] pl-1"
            >
              <div className="max-w-[195px] w-full h-[195px] p-1 rounded-lg">
                <Image
                  src={imageItem.image_url}
                  fill
                  className="object-cover rounded-lg border border-gray-2"
                  alt="card"
                />
              </div>
              <CarouselPrevious className="left-8" />
              <CarouselNext className="right-4.5" />
              <div className="text-center flex items-center gap-x-3 absolute bottom-[22px] left-1/2 -translate-x-1/2">
                {item.item_images.map(
                  (imageItem: ItemImagesProps, index: number) => (
                    <span
                      key={imageItem.image_id}
                      className={`block h-2 w-2 rounded-full ${
                        current === index + 1 ? "bg-green-500" : "bg-slate-100"
                      } `}
                    />
                  )
                )}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <div className="flex flex-col">
        <Chip
          className="bg-green-50 text-green-500 mb-[3px] sm:mb-[15px]"
          text={item.status}
        />
        <p className="text-slate-900 text-xs sm:text-sm">
          {item.product_name || "Nikon SB-6A"}
        </p>
        <p className="text-slate-900 text-sm sm:text-base font-medium">
          NGN {item.price_per_day || "40,000"}{" "}
          <span className="text-xs sm:text-sm text-slate-400 font-normal">
            per/day
          </span>
        </p>
        <p className="text-slate-300 text-xs sm:text-sm">
          Quantity Available: {item.quantity_available}/
          {item.quantity_available}
        </p>
      </div>
    </div>
  );
}

export function ListedItemCard2({
  item,
  link,
}: {
  item: ItemProps;
  link: string;
}) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <div className="flex flex-col gap-y-[15px]">
      <Carousel setApi={setApi} className="w-full max-w-[195px]">
        <CarouselContent className="h-[195px]">
          {item.item_images.map((imageItem: ItemImagesProps) => (
            <CarouselItem
              key={imageItem.image_id}
              className="relative basis-full pl-1"
            >
              <Link href={link}>
                <div className="w-full h-full p-1 rounded-lg">
                  <Image
                    src={imageItem.image_url}
                    fill
                    className="object-cover rounded-lg border border-gray-2"
                    alt="card"
                    layout="fill"
                  />
                </div>
              </Link>
              <CarouselPrevious className="left-8" />
              <CarouselNext className="right-4.5" />
              <div className="text-center flex items-center gap-x-3 absolute bottom-[22px] left-1/2 -translate-x-1/2">
                {item.item_images.map(
                  (imageItem: ItemImagesProps, index: number) => (
                    <span
                      key={imageItem.image_id}
                      className={`block h-2 w-2 rounded-full ${
                        current === index + 1 ? "bg-green-500" : "bg-slate-100"
                      } `}
                    />
                  )
                )}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <div className="flex flex-col">
        <p className="text-slate-900 text-sm mb-0.5 font-medium">
          {item.product_name}
        </p>
        <p className="text-slate-300 text-sm">Listed by {item.full_name}</p>
        <p className="text-orange-600 text-sm">Lagos 1.5 km away</p>
        <p className="text-slate-900 font-medium">
          NGN {item.price_per_day}{" "}
          <span className="text-sm text-slate-400 font-normal">per/day</span>
        </p>
        <p className="text-slate-400 text-sm">2/2 Available for rent</p>
      </div>
    </div>
  );
}

const images = [
  {
    src: "/images/nikon-camera-2.png",
  },
  {
    src: "/images/nikon-side.png",
  },
  {
    src: "/images/polaroid-card.png",
  },
  {
    src: "/images/speaker.png",
  },
];

export function CarouselCard({ images }: { images: ItemImagesProps[] }) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);
  return (
    <Carousel setApi={setApi} className="w-full max-w-[510px]">
      <CarouselContent className="max-h-[310px] h-full">
        {images?.map((image) => (
          <CarouselItem
            key={image.image_id}
            className="relative basis-full p-1 aspect-square"
          >
            <Image
              src={image.image_url}
              fill
              className="object-cover rounded-lg border border-gray-2"
              alt="card"
            />
            <CarouselPrevious className="left-8" />
            <CarouselNext className="right-4.5" />
            <div className="text-center flex items-center gap-x-3 absolute bottom-[22px] left-1/2 -translate-x-1/2">
              {images.map((_, index) => (
                <span
                  key={index}
                  className={`block h-2 w-2 rounded-full ${
                    current === index + 1 ? "bg-green-500" : "bg-slate-100"
                  } `}
                />
              ))}
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
