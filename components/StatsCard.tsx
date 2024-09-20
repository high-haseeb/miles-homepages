import Image from "next/image";

import { StatsCardProps } from "@/types";

export default function StatsCard({
  src,
  title,
  stat,
  iconStart,
  iconEnd,
}: StatsCardProps) {
  return (
    <div className="bg-white border-[0.8px] border-border max-w-[270px] md:max-h-[120px] w-full h-full py-[25px] px-[22px] max-sm:gap-y-2.5 rounded-[25px] flex flex-col sm:flex-row items-center sm:gap-x-[15px]">
      <Image
        src={src}
        width={70}
        height={70}
        alt="stats-badge"
        className="object-contain"
      />
      <div className="flex flex-col gap-y-2 max-sm:items-center">
        <h5 className="text-xs text-teal-500 font-medium">{title}</h5>
        <div className="flex items-center gap-x-2 w-fit">
          {iconStart}
          <p className="text-slate-800 font-bold sm:min-w-[57.18px]">{stat}</p>
          {iconEnd}
        </div>
      </div>
    </div>
  );
}
