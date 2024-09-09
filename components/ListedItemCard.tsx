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
import { toCurrency } from "@/utils";

export default function ListedItemCard({
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
      <Carousel setApi={setApi} className="w-full max-w-xs relative">
        <CarouselContent>
          {item?.item_images.map((imageItem: ItemImagesProps) => (
            <CarouselItem key={imageItem.image_id} className="relative">
              <Link href={link} className="block p-1">
                <div className="flex aspect-square h-full w-full rounded-lg">
                  <Image
                    src={imageItem.image_url}
                    width={195}
                    height={195}
                    className="object-cover rounded-lg border border-gray-2 w-full h-full"
                    alt="card"
                  />
                </div>
              </Link>

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
        <CarouselPrevious className="left-5" />
        <CarouselNext className="right-5" />
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
          {toCurrency(Number(item.price_per_day)) || "40,000"}{" "}
          <span className="text-xs sm:text-sm text-slate-400 font-normal">
            per/day
          </span>
        </p>
        <p className="text-slate-300 text-xs sm:text-sm">
          Quantity Available: {item.quantity_available}/{item.quantity_listed}
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
    <div className="flex flex-col gap-y-1.5 sm:gap-y-[15px]">
      <Carousel setApi={setApi} className="w-full max-w-xs relative">
        <CarouselContent>
          {item.item_images.map((imageItem: ItemImagesProps) => (
            <CarouselItem key={imageItem.image_id} className="relative">
              <Link href={link} className="block p-1">
                <div className="flex aspect-square h-full w-full rounded-lg">
                  <Image
                    src={imageItem.image_url}
                    width={195}
                    height={195}
                    className="object-cover rounded-lg border border-gray-2 w-full h-full"
                    alt="card"
                  />
                </div>
              </Link>
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
        <CarouselPrevious className="left-5 hidden sm:block" />
        <CarouselNext className="right-5 hidden sm:block" />
      </Carousel>

      <div className="flex flex-col">
        <p className="text-slate-900 text-xs sm:text-sm sm:mb-0.5 sm:font-medium">
          {item.product_name}
        </p>
        <p className="text-slate-300 text-xs sm:text-sm">
          Listed by {item.full_name}
        </p>
        <p className="text-orange-600 text-xs sm:text-sm">Lagos 1.5 km away</p>
        <p className="text-slate-900 text-sm sm:text-base font-medium">
          {toCurrency(Number(item.price_per_day))}{" "}
          <span className="text-xs sm:text-sm text-slate-400 font-normal">
            per/day
          </span>
        </p>
        <p className="text-slate-400 text-xs sm:text-sm">
          2/2 Available for rent
        </p>
      </div>
    </div>
  );
}

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
      <CarouselContent>
        {images?.map((image) => (
          <CarouselItem key={image.image_id} className="relative">
            <div className="flex h-auto w-full rounded-lg">
              <Image
                src={image.image_url}
                width={510}
                height={310}
                className="object-cover rounded-lg h-[310px] border border-gray-2"
                alt="card"
              />
            </div>

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
      <CarouselPrevious className="left-12" />
      <CarouselNext className="right-12" />
    </Carousel>
  );
}
