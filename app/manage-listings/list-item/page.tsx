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
import { format } from "date-fns";
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
import { InitialValuesProps } from "@/types";
import { base64ToFile } from "@/utils";
import { createListing } from "@/services/general.api";
import VerificationModal from "@/components/Modals/VerificationModal";

export default function ListItem() {
  const [currentStep, setCurrentStep] = useState(1);
  const [openVerifModal, setOpenVerifModal] = useState(false);
  const [initialValues, setInitialValues] = useState<InitialValuesProps | null>(
    null
  );
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const router = useRouter();
  const pathname = usePathname();
  const { isLoggedIn, isVerified, userData } = useAppContext();
  const mutation = useMutation({
    mutationFn: createListing,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["listings"] });
    },
  });

  const form = useForm<z.infer<typeof listItemFormSchema>>({
    resolver: zodResolver(listItemFormSchema),
    defaultValues: initialValues ?? {
      product_name: "",
      item_location: "",
      description: "",
      image: [],
      category_id: "",
      quantity_available: 0,
      estimated_value: 0,
      price_per_day: 0,
      recurring_days_of_week: [],
      multiple_date_ranges: { from: new Date(), to: new Date() },
      recurring_end_date: new Date(),
    },
  });

  useEffect(() => {
    const formDetails = localStorage.getItem("listItemForm");
    if (formDetails) {
      const parsedFormDetails = JSON.parse(formDetails);
      setInitialValues(parsedFormDetails);
      form.reset(parsedFormDetails);
    }
  }, [form]);

  const steps: StepProps[] = [
    { 1: <ItemInfo control={form.control} /> },
    { 2: <ItemImages control={form.control} /> },
    { 3: <ExtraInfo control={form.control} /> },
    { 4: <Preview control={form.control} /> },
  ];

  const onSubmit = async (values: z.infer<typeof listItemFormSchema>) => {
    if (!isLoggedIn) {
      router.push(`/login?redirect=${encodeURIComponent(pathname)}`);
      return;
    }
    if (!isVerified) {
      setOpenVerifModal(true);
      return;
    }
    console.log("Form Submitted");
    console.log(values);

    try {
      let newListingObject: Partial<ListItemPayload> = {};

      for (const [key, value] of Object.entries(values)) {
        if (key === "image" && value) {
          const imageFiles = Array.from(value as any[])
            .filter((file: any) => typeof file === "string")
            .map((base64: string, index: number) =>
              base64ToFile(base64, `image-${index}`)
            );
          newListingObject.image = imageFiles;
        } else if (key === "multiple_date_ranges" && value) {
          const dateRangeString = `${format(
            (value as any).from,
            "M/d/yyyy"
          )}, ${format((value as any).to, "M/d/yyyy")}`;
          newListingObject.multiple_date_ranges = dateRangeString;
        } else if (key === "category_id") {
          newListingObject.category_id = Number(value);
        } else if (key === "sub_category_id" && value !== undefined) {
          newListingObject.sub_category_id = Number(value);
        } else if (Array.isArray(value)) {
          (newListingObject as any)[key] = value.join(",");
        } else if (value !== undefined) {
          (newListingObject as any)[key] = value;
        }
      }

      const res = await mutation.mutateAsync(
        newListingObject as ListItemPayload
      );
      console.log(res);

      toast({
        variant: "success",
        title: "Success",
        description: "Listing created successfully!",
      });
    } catch (err: any) {
      console.log(err);
      console.log(mutation.error);

      const errorMessage =
        err.response?.data?.message || "An error occurred. Please try again.";
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: errorMessage,
      });
    }

    console.log("Form Submitted");
  };

  const handleButtonClick = () => {
    if (currentStep < steps.length) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  useEffect(() => {
    const subscription = form.watch((value) => {
      localStorage.setItem("listItemForm", JSON.stringify(value));
    });
    return () => subscription.unsubscribe();
  }, [form]);

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
                Do you want to close the listing form? Your progress has been
                saved.
              </p>
              <div className="flex items-center gap-x-6">
                <Button
                  onClick={() => router.push("/manage-listings")}
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
        <VerificationModal
          openModal={openVerifModal}
          handleOpenModal={setOpenVerifModal}
        />
      </>
    </DashboardLayout>
  );
}
