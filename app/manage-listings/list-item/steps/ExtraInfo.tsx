"use client";
import { Control, useFormContext } from "react-hook-form";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { format } from "date-fns";

import CustomFormField from "@/components/forms/CustomFormField";
import { FormFieldType } from "@/types";
import CalendarIcon from "@/components/vectors/CalendarIcon";
import CalendarModal from "./modals/CalendarModal";

export default function ExtraInfo({ control }: { control: Control<any> }) {
  const { watch } = useFormContext();
  const date_range = watch("multiple_date_ranges");
  return (
    <div className="flex flex-col gap-y-[25px]">
      <CustomFormField
        control={control}
        fieldtype={FormFieldType.NUMBER}
        placeholder="This input is quite long"
        name="quantity_listed"
        className="py-3 px-4 rounded-lg border border-gray-3"
        label="Quantity/Inventory Available"
      />
      <CustomFormField
        control={control}
        fieldtype={FormFieldType.NUMBER}
        placeholder="This input is quite long"
        name="estimated_value"
        className="py-3 px-4 rounded-lg border border-gray-3"
        label="Estimated value of the Item  *"
      />
      <CustomFormField
        control={control}
        fieldtype={FormFieldType.NUMBER}
        placeholder="This input is quite long"
        name="price_per_day"
        className="py-3 px-4 rounded-lg border border-gray-3"
        label="Rate (price / day)"
      />
      <Dialog>
        <DialogTrigger asChild>
          <div>
            <p className="text-slate-800 font-medium mb-2 text-sm">
              Manage Availability Date & Schedules
            </p>
            <button
              type="button"
              className="py-2 bg-white px-4 rounded-lg border border-gray-3 w-full flex items-center justify-between text-sm text-slate-100"
            >
              {date_range?.from ? (
                date_range.to ? (
                  <>
                    {format(date_range.from, "LLL dd, y")} -{" "}
                    {format(date_range.to, "LLL dd, y")}
                  </>
                ) : (
                  format(date_range.from, "LLL dd, y")
                )
              ) : (
                <span className="underline">Edit Availability</span>
              )}
              <CalendarIcon />
            </button>
          </div>
        </DialogTrigger>
        <DialogContent>
          <CalendarModal control={control} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
