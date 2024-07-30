"use client";
import { Control } from "react-hook-form";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

import CustomFormField from "@/components/forms/CustomFormField";
import { FormFieldType } from "@/types";
import CalendarIcon from "@/components/vectors/CalendarIcon";

export default function ExtraInfo({ control }: { control: Control<any> }) {
  return (
    <div className="flex flex-col gap-y-[25px]">
      <CustomFormField
        control={control}
        fieldType={FormFieldType.NUMBER}
        placeholder="This input is quite long"
        name="quantity_available"
        className="py-3 px-4 rounded-lg border border-gray-3"
        label="Quantity/Inventory Available"
      />
      <CustomFormField
        control={control}
        fieldType={FormFieldType.NUMBER}
        placeholder="This input is quite long"
        name="estimated_value"
        className="py-3 px-4 rounded-lg border border-gray-3"
        label="Estimated value of the Item  *"
      />
      <CustomFormField
        control={control}
        fieldType={FormFieldType.NUMBER}
        placeholder="This input is quite long"
        name="price_per_day"
        className="py-3 px-4 rounded-lg border border-gray-3"
        label="Rate (price / day)"
      />
      {/* <Dialog>
        <DialogTrigger asChild>
          <div>
            <p className="text-slate-800 font-medium mb-2 text-sm">
              Manage Availability Date & Schedules
            </p>
            <button className="py-2 bg-white px-4 rounded-lg border border-gray-3 w-full flex items-center justify-between text-sm text-slate-100">
              <span className="underline">Edit Availability</span>
              <CalendarIcon />
            </button>
          </div>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[670px]"></DialogContent>
      </Dialog> */}

      <CustomFormField
        control={control}
        fieldType={FormFieldType.DATE_PICKER}
        placeholder="This input is quite long"
        name="multiple_date_ranges"
        className="py-3 px-4 rounded-lg border border-gray-3 w-full justify-start"
        label="Manage Availability Date & Schedules"
      />
    </div>
  );
}
