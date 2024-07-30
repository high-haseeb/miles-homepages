"use client";
import { Control } from "react-hook-form";
import ItemInfo from "./ItemInfo";
import ItemImages from "./ItemImages";
import ExtraInfo from "./ExtraInfo";

export default function Preview({ control }: { control: Control<any> }) {
  return (
    <div className="flex flex-col gap-y-[25px]">
      <ItemInfo control={control} />
      <ItemImages control={control} />
      <ExtraInfo control={control} />
    </div>
  );
}
