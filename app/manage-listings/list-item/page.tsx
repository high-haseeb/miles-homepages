"use client";
import { useState, useEffect } from "react";
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

import { createFileList, base64ToFile } from "@/utils";
import DashboardLayout from "@/components/Layouts/DashboardLayout";
import Backbtn from "@/components/Backbtn";
import Stepper from "@/components/Stepper";
import ItemInfo from "./steps/ItemInfo";
import ItemImages from "./steps/ItemImages";
import ExtraInfo from "./steps/ExtraInfo";
import { StepProps } from "@/types";
import { listItemFormSchema } from "@/constants/schemas";
import Preview from "./steps/Preview";
import { useAppContext } from "@/context/AppContext";
import { InitialValuesProps } from "@/types";
import { createListing, updateListing } from "@/services/general.api";
import VerificationModal from "@/components/Modals/VerificationModal";
import SuccessModal from "./steps/modals/SuccessModal";
import LoadingItemModal from "./steps/modals/LoadingItemModal";

export default function ListItem({
  searchParams,
}: {
  searchParams?: { edit: string; itemID: string };
}) {
  const [currentStep, setCurrentStep] = useState(1);
  const [openVerifModal, setOpenVerifModal] = useState(false);
  const [openSuccessModal, setOpenSuccessModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedItemId, setEditedItemId] = useState<number>();
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
      setOpenSuccessModal(true);
    },
  });

  const editMutation = useMutation({
    mutationFn: updateListing,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["listings"] });
      setOpenSuccessModal(true);
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
      sub_category_id: "",
      quantity_listed: undefined,
      estimated_value: undefined,
      price_per_day: undefined,
      recurring_days_of_week: [],
      multiple_date_ranges: { from: new Date(), to: new Date() },
      recurring_date: { from: new Date(), to: new Date() },
      state: "",
      city: "",
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

  useEffect(() => {
    if (searchParams) {
      const { edit, itemID } = searchParams;
      setIsEditing(Boolean(edit));
      setEditedItemId(Number(itemID));
      const formDetails = localStorage.getItem("listItemForm");
      if (formDetails) {
        const parsedFormDetails = JSON.parse(formDetails);
        setInitialValues(parsedFormDetails);
        form.reset(parsedFormDetails);
      }
      if (edit) {
        setCurrentStep(4);
      }
    }
  }, [searchParams, form]);

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
    try {
      const formData = new FormData();
      for (const [key, value] of Object.entries(values)) {
        if (key === "multiple_date_ranges" && value) {
          const dateRangeString = `${format(
            (value as any).from,
            "M/d/yyyy"
          )}, ${format((value as any).to, "M/d/yyyy")}`;
          formData.append("multiple_date_ranges", dateRangeString);
          formData.append("schedule_type", "IS_MULTIPLE");
        } else if (key === "recurring_days_of_week" && value) {
          const days = value.join(", ");
          formData.append("schedule_type", "IS_RECURRENT");
          formData.append("recurring_days_of_week", days);
        } else if (key === "recurring_date" && value) {
          formData.append(
            "recurring_start_date",
            format((value as any).from, "M/d/yyyy")
          );
          formData.append(
            "recurring_end_date",
            format((value as any).to, "M/d/yyyy")
          );
        } else if (key === "image" && value) {
          const imageFiles = Array.from(value as any[])
            .filter((file: any) => typeof file === "string")
            .map((base64: string, index: number) =>
              base64ToFile(base64, `image-${index}`)
            );
          const fileList = createFileList(imageFiles);
          Array.from(fileList).forEach((img: any) => {
            formData.append("image", img);
          });
        } else {
          formData.append(key, value as string | Blob);
        }
      }
      if (isEditing) {
        const newFormData: any = {};
        for (const [key, value] of formData) {
          newFormData[key] = value;
        }
        const newPayload = {
          product_name: newFormData?.product_name,
          category_id: newFormData?.category_id,
          sub_category_id: newFormData?.sub_category_id,
          item_location: newFormData?.item_location,
          description: newFormData?.description,
          quantity_available: newFormData?.quantity_available,
          estimated_value: newFormData?.estimated_value,
          price_per_day: newFormData?.price_per_day,
          latitude: newFormData?.latitude,
          longitude: newFormData?.longitude,
        };
        const params = { id: editedItemId! };
        await editMutation.mutateAsync({ params, payload: newPayload });
        console.log("level 2");
      } else {
        await mutation.mutateAsync(formData as any);
      }

      toast({
        variant: "success",
        title: "Success",
        description: `Listing ${
          isEditing ? "updated" : "created"
        } successfully!`,
      });
      localStorage.removeItem("listItemForm");
    } catch (err: any) {
      console.log(err);
      const errorMsg = mutation?.error?.message || err?.response?.data?.message;
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: errorMsg,
      });
    }
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

  const handleBackClick = () => {
    if (currentStep === 1) router.back();
    else setCurrentStep((prev) => prev - 1);
  };

  return (
    <DashboardLayout>
      <>
        <div className="flex items-center justify-between sm:mb-[50px]">
          <Backbtn handleClick={handleBackClick} />
          <div className="max-w-[495px] w-full hidden sm:block">
            <Stepper
              steps={steps}
              complete={currentStep === steps.length}
              currentStep={currentStep}
            />
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <button className="p-4 text-slate-900 hidden sm:block">
                <X className="h-5 w-5" />
              </button>
            </DialogTrigger>
            <DialogContent
              showClose={false}
              className="sm:max-w-[350px] py-[43.5px] px-[21.5px] flex flex-col gap-y-[23px] items-center"
            >
              <p className="text-center text-black">
                Do you want to close the listing form? Your progress has been
                saved.
              </p>
              <div className="flex items-center gap-x-6">
                <Button
                  onClick={() => router.push("/manage-listings")}
                  className="text-slate-400 rounded-lg h-auto py-2 px-3 border-none bg-transparent w-fit"
                >
                  Close
                </Button>
                <DialogClose>
                  <Button className="text-white h-auto rounded-lg py-2 px-3 border-none bg-green-500 hover:bg-green-600 w-fit">
                    Continue
                  </Button>
                </DialogClose>
              </div>
            </DialogContent>
          </Dialog>
        </div>
        <div className="w-full sm:hidden">
          <Stepper
            steps={steps}
            complete={currentStep === steps.length}
            currentStep={currentStep}
          />
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
                    {isEditing ? "Update" : "List"} item
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
        <SuccessModal
          name={userData?.first_name}
          openModal={openSuccessModal}
          handleOpenModal={setOpenSuccessModal}
        />
        <LoadingItemModal
          openModal={mutation?.isPending || editMutation?.isPending}
          isEditing={isEditing}
        />
      </>
    </DashboardLayout>
  );
}
