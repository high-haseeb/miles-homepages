"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { X } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import DashboardLayout from "@/components/Layouts/DashboardLayout";
import Backbtn from "@/components/Backbtn";
import Stepper from "@/components/Stepper";
import ItemInfo from "./steps/ItemInfo";
import ItemImages from "./steps/ItemImages";
import ExtraInfo from "./steps/ExtraInfo";
import { StepProps, FormFieldType, ListItemPayload } from "@/types";
import { listItemFormSchema } from "@/constants/schemas";
import Preview from "./steps/Preview";
import { useAppContext } from "@/context/AppContext";

export default function ListItem() {
  const [currentStep, setCurrentStep] = useState(1);
  const queryClient = useQueryClient();
  const router = useRouter();
  const pathname = usePathname();
  const { isLoggedIn } = useAppContext();

  const initialValues = JSON.parse(
    localStorage.getItem("listItemForm") || "{}"
  );
  const form = useForm<z.infer<typeof listItemFormSchema>>({
    resolver: zodResolver(listItemFormSchema),
    defaultValues: {
      product_name: initialValues.product_name || "",
      item_location: initialValues.item_location || "",
      description: initialValues.description || "",
      image: initialValues.image || [],
      category_id: initialValues.category_id || "",
      quantity_available: initialValues.quantity_available || null,
      estimated_value: initialValues.estimated_value || null,
      price_per_day: initialValues.price_per_day || null,
      multiple_date_ranges: initialValues.multiple_date_ranges || null,
    },
  });

  const steps: StepProps[] = [
    { 1: <ItemInfo control={form.control} /> },
    { 2: <ItemImages control={form.control} /> },
    { 3: <ExtraInfo control={form.control} /> },
    { 4: <Preview control={form.control} /> },
  ];

  const onSubmit = async (values: z.infer<typeof listItemFormSchema>) => {
    if (!isLoggedIn) {
      router.push(`/login?redirect=${encodeURIComponent(pathname)}`);
    }
    console.log("Form Submitted");
    console.log(values);
  };

  const handleButtonClick = () => {
    if (currentStep < steps.length) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  console.log(
    form.formState.isDirty,
    form.formState.dirtyFields,
    form.formState.errors,
    form.formState.isValid
  );

  useEffect(() => {
    const subscription = form.watch((value) => {
      localStorage.setItem("listItemForm", JSON.stringify(value));
    });
    return () => subscription.unsubscribe();
  }, [form]);

  function handleCloseForm() {}

  return (
    <DashboardLayout>
      <>
        <div className="flex items-center justify-between mb-[50px]">
          <Backbtn />
          <div className="max-w-[495px] w-full">
            <Stepper
              steps={steps}
              complete={currentStep === steps.length}
              currentStep={currentStep}
            />
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <button className="p-4 text-slate-900">
                <X className="h-5 w-5" />
              </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[350px] py-[43.5px] px-[21.5px] flex flex-col gap-y-[23px] items-center">
              <p className="text-center text-black">
                Do you want to close the listing form ? your progress has been
                saved.
              </p>
              <div className="flex items-center gap-x-6">
                <Button
                  onClick={() => router.push("/listings")}
                  className="text-slate-400 rounded-lg hover:bg-transparent py-2 px-3 border-none bg-transparent w-fit"
                >
                  Close
                </Button>
                <DialogClose>
                  <Button className="text-white rounded-lg py-2 px-3 border-none bg-green-500 hover:bg-green-600 w-fit">
                    Continue
                  </Button>
                </DialogClose>
              </div>
            </DialogContent>
          </Dialog>
        </div>
        <div className="lg:px-[174px] w-full">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="overflow-x-hidden w-full flex flex-col"
            >
              {steps[currentStep - 1][currentStep]}
              <div className="self-end">
                {currentStep !== steps.length && (
                  <Button
                    type="button"
                    className={`rounded-[38px] py-3 px-4 bg-green-500 text-white mt-[35px] max-w-[200px] w-full ${
                      currentStep !== steps.length && "block"
                    }`}
                    onClick={handleButtonClick}
                  >
                    Proceed
                  </Button>
                )}
                {currentStep === steps.length && (
                  <Button
                    type="submit"
                    className={`rounded-[38px] py-3 px-4 bg-green-500 text-white mt-[35px] max-w-[200px] w-full ${
                      currentStep === steps.length && "block"
                    }`}
                  >
                    List item
                  </Button>
                )}
              </div>
            </form>
          </Form>
        </div>
      </>
    </DashboardLayout>
  );
}
