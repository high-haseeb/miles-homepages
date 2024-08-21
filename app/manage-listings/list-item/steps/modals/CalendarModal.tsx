"use client";
import { useState, useEffect } from "react";
import { Control, useFormContext } from "react-hook-form";
import { Checkbox } from "@/components/ui/checkbox";
import { FormControl } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import CustomFormField from "@/components/forms/CustomFormField";
import { FormFieldType } from "@/types";

export default function CalendarModal({ control }: { control: Control<any> }) {
  const [activeTab, setActiveTab] = useState("date_range");
  const { watch, unregister } = useFormContext();

  const watchDateRanges = Boolean(watch("multiple_date_ranges"));
  const watchRecurringDays = Boolean(watch("recurring_days_of_week"));

  useEffect(() => {
    if (activeTab === "date_range" && watchDateRanges) {
      unregister("recurring_days_of_week");
      unregister("recurring_end_date");
    } else if (activeTab === "schedule" && watchRecurringDays) {
      unregister("multiple_date_ranges");
    }
  }, [activeTab, watchRecurringDays, watchDateRanges, unregister]);

  return (
    <DialogContent className="sm:max-w-[670px] w-full px-6 h-screen sm:h-auto max-sm:py-[60px]">
      <DialogTitle className="hidden sr-only">Set Schedule Modal</DialogTitle>
      <div className="flex flex-col items-center">
        <div className="flex items-center gap-x-9 mb-[22px]">
          <Button
            onClick={() => setActiveTab("date_range")}
            className={`py-[15px] px-4.5 ${
              activeTab === "date_range"
                ? "bg-green-500 text-lg font-medium text-white"
                : "bg-transparent font-normal border-none text-lg text-gray-1"
            } rounded-[15px]`}
          >
            Select date range
          </Button>
          <Button
            onClick={() => setActiveTab("schedule")}
            className={`py-[15px] px-4.5 ${
              activeTab === "schedule"
                ? "bg-green-500 text-lg font-medium text-white"
                : "bg-transparent font-normal border-none text-lg text-gray-1"
            } rounded-[15px]`}
          >
            Set up schedule
          </Button>
        </div>
        {activeTab === "date_range" ? (
          <div className="flex flex-col items-center w-full">
            <p className="text-center text-slate-500 mb-[50px]">
              Set up a recurring schedule and customize as you wish.
            </p>
            <CustomFormField
              control={control}
              fieldType={FormFieldType.SKELETON}
              name="multiple_date_ranges"
              className=""
              renderSkeleton={(field) => (
                <FormControl>
                  <Calendar
                    mode="range"
                    selected={
                      field.value || { from: new Date(), to: new Date() }
                    }
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date < new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                    defaultMonth={field.value?.from || new Date()}
                    numberOfMonths={1}
                  />
                </FormControl>
              )}
            />
            <DialogClose className="w-full">
              <Button className="mt-[100px] w-full bg-green-500 py-3 px-4 rounded-[38px] font-medium text-white">
                Save
              </Button>
            </DialogClose>
          </div>
        ) : (
          <div className="flex flex-col items-center w-full">
            <p className="text-center text-slate-500 mb-[15px]">
              Set up a weekly recurring schedule
            </p>
            {days.map((day) => (
              <div
                key={day}
                className="flex items-center justify-between max-w-[214px] w-full py-2 px-3"
              >
                <p className="text-black">{day}</p>
                <CustomFormField
                  key={day}
                  control={control}
                  fieldType={FormFieldType.SKELETON}
                  name="recurring_days_of_week"
                  className=""
                  renderSkeleton={(field) => (
                    <FormControl>
                      <Checkbox
                        className="rounded-full self-end text-end data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500 disabled:opacity-100 border-gray-1 h-4 w-4"
                        checked={field?.value?.includes(day)}
                        onCheckedChange={(checked) => {
                          const currentValue = Array.isArray(field.value)
                            ? field.value
                            : [];
                          return checked
                            ? field.onChange([...currentValue, day])
                            : field.onChange(
                                currentValue.filter(
                                  (value: string) => value !== day
                                )
                              );
                        }}
                      />
                    </FormControl>
                  )}
                />
              </div>
            ))}
            <div className="py-4 px-3.5 flex items-center gap-x-5 mt-[15px] mb-10">
              <p className="text-black">Recurring schedule:</p>
              <CustomFormField
                control={control}
                fieldType={FormFieldType.SKELETON}
                name="recurring_date"
                className=""
                renderSkeleton={(field) => (
                  <FormControl>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button className="text-slate-300 bg-transparent font-normal">
                          {field.value ? (
                            <>
                              {format(field.value.from, "LLL dd, y")} -{" "}
                              {format(field.value.to, "LLL dd, y")}
                            </>
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="range"
                          selected={
                            field.value || { from: new Date(), to: new Date() }
                          }
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date < new Date() || date < new Date("1900-01-01")
                          }
                          initialFocus
                          defaultMonth={field.value?.from || new Date()}
                          numberOfMonths={1}
                        />
                      </PopoverContent>
                    </Popover>
                  </FormControl>
                )}
              />
            </div>
            <Button
              type="button"
              onClick={() => {
                unregister("recurring_days_of_week");
                unregister("recurring_end_date");
              }}
              className="py-[15px] px-3.5 font-normal rounded-lg bg-slate-50 mb-[100px] text-lg text-slate-400"
            >
              Clear All
            </Button>
            <DialogClose className="w-full">
              <Button
                type="button"
                className="w-full bg-green-500 py-3 px-4 rounded-[38px] font-medium text-white"
              >
                Save
              </Button>
            </DialogClose>
          </div>
        )}
      </div>
    </DialogContent>
  );
}

const days = [
  "SUNDAYS",
  "MONDAYS",
  "TUESDAYS",
  "WEDNESDAYS",
  "THURSDAYS",
  "FRIDAYS",
  "SATURDAYS",
];
