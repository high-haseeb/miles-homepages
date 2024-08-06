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

export default function ListedItemCard({ link }: { link?: any }) {
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
    <div className="flex flex-col gap-y-[19px]">
      <Carousel setApi={setApi} className="w-full max-w-xs">
        <CarouselContent>
          {images.map((image, index) => (
            <CarouselItem key={index} className="relative basis-[100%] pl-1">
              <div className="max-w-[258px] w-full h-[258px] p-1 rounded-lg">
                {/* <Link href={link}> */}
                <Image
                  src={image.src}
                  fill
                  className="object-cover rounded-lg border border-gray-2"
                  alt="card"
                  layout="fill"
                />
                {/* </Link> */}
              </div>
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

      <div className="flex flex-col gap-y-[5px]">
        <Chip
          className="bg-green-50 text-green-500"
          text="Available for bookings"
        />
        <p className="text-slate-900">Nikon SB-6A</p>
        <p className="text-slate-300">Quantity Available: 1/1</p>
        <p className="text-slate-900 text-xl font-medium">
          NGN 40,000{" "}
          <span className="text-lg text-slate-400 font-normal">per/day</span>
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
    <div className="flex flex-col gap-y-[19px]">
      <Carousel setApi={setApi} className="w-full max-w-xs">
        <CarouselContent>
          {item.item_images.map((imageItem: ItemImagesProps) => (
            <CarouselItem
              key={imageItem.image_id}
              className="relative basis-[100%] pl-1"
            >
              <Link href={link}>
                <div className="max-w-[258px] w-full h-[258px] p-1 rounded-lg">
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

      <div className="flex flex-col gap-y-[5px]">
        <p className="text-slate-900">{item.product_name}</p>
        <p className="text-slate-300">Listed by {item.full_name}</p>
        <p className="text-orange-600 font-medium">Lagos 1.5 km away</p>
        <p className="text-slate-900 text-xl font-medium">
          NGN {item.price_per_day}{" "}
          <span className="text-lg text-slate-400 font-normal">per/day</span>
        </p>
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
    <Carousel
      setApi={setApi}
      className="w-full max-h-[310px] h-full max-w-[510px]"
    >
      <CarouselContent>
        {images?.map((image) => (
          <CarouselItem
            key={image.image_id}
            className="relative basis-[100%] pl-1"
          >
            <Image
              src={image.image_url}
              width={510}
              height={310}
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
