"use client";
import { SetStateAction, Dispatch, FormEvent } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { useToast } from "@/components/ui/use-toast";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";

import { useAppContext } from "@/context/AppContext";
import CustomFormField from "@/components/forms/CustomFormField";
import { FormFieldType } from "@/types";

interface VerificationModalProps {
  openModal: boolean;
  handleOpenModal: Dispatch<SetStateAction<boolean>>;
}

const loginFormSchema = z.object({
  firstName: z.string().min(2, {
    message: "First name must be at least 2 characters",
  }),
  lastName: z.string().min(2, {
    message: "Last name must be at least 2 characters",
  }),
});

export default function UpdateName({
  openModal,
  handleOpenModal,
}: VerificationModalProps) {
  const { toast } = useToast();
  const { userData } = useAppContext();
  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      firstName: userData?.first_name,
      lastName: userData?.last_name,
    },
  });
  const onSubmit = async (values: z.infer<typeof loginFormSchema>) => {
    // try {
    //   const res = await mutation.mutateAsync(values);
    //   toast({
    //     variant: "success",
    //     title: "Success",
    //     description: "Log in successful!",
    //   });
    //   setToken(res?.data?.accessToken);
    //   setUserData(res?.data?.userData);
    //   const redirect = redirectUrl
    //     ? decodeURIComponent(redirectUrl as string)
    //     : "/dashboard";
    //   router.push(redirect);
    // } catch (err: any) {
    //   const errorMsg = err?.response?.data?.message || mutation.error;
    //   toast({
    //     variant: "destructive",
    //     title: "Uh oh! Something went wrong.",
    //     description: errorMsg,
    //   });
    // }
  };

  return (
    <Dialog open={openModal} onOpenChange={handleOpenModal} defaultOpen={false}>
      <DialogContent className="py-9 px-[30px] rounded-[14px] max-w-[545px] bg-white flex flex-col">
        <div className="mb-8 flex flex-col gap-1">
          <h3 className="font-bold text-slate-9 text-2xl">Update your Name</h3>
          <p className="text-sm text-slate-200">
            Please enter your name as it appears on your ID
          </p>
        </div>
        <div className="w-full flex flex-col">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-y-[35px] overflow-x-hidden"
            >
              <CustomFormField
                control={form.control}
                name="firstName"
                fieldType={FormFieldType.INPUT}
                placeholder="First name"
                className="p-4 rounded-xl"
              />
              <CustomFormField
                control={form.control}
                name="lastName"
                fieldType={FormFieldType.INPUT}
                placeholder="Last name"
                className="p-4 rounded-xl"
              />
              <button className="mt-[60px] py-3 px-4 text-center w-full rounded-[38px] text-white bg-green-500 font-medium disabled:bg-green-200">
                Update
              </button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
