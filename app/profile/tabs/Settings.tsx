"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";

import CustomFormField from "@/components/forms/CustomFormField";
import { FormFieldType } from "@/types";
import { passwordSchema } from "@/constants/schemas";

const updatePasswordFormSchema = z.object({
  password: passwordSchema,
});

export default function Settings() {
  const form = useForm<z.infer<typeof updatePasswordFormSchema>>({
    resolver: zodResolver(updatePasswordFormSchema),
    defaultValues: {
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof updatePasswordFormSchema>) => {
    console.log(values);
  };

  return (
    <div className="flex flex-col mt-[30px] gap-y-[30px] divide-y">
      <div className="flex flex-col gap-y-10 pb-[78px]">
        <div className="flex flex-col">
          <p className="font-medium text-slate-900">Password Management</p>
          <p className="text-sm text-slate-300">Change your password</p>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex items-center gap-x-[30px] max-w-[541px] w-full"
          >
            <CustomFormField
              control={form.control}
              name="password"
              fieldType={FormFieldType.PASSWORD}
              placeholder="Password"
              className="p-4 rounded-xl flex-grow"
            />
            <Button
              className="h-auto py-3 px-5 rounded-[38px] w-fit"
              variant="secondary"
            >
              Change
            </Button>
          </form>
        </Form>
      </div>
      <div className="flex flex-col pt-[30px] gap-y-[30px]">
        <div className="flex flex-col">
          <p className="font-medium text-slate-900">Delete your Account</p>
          <p className="text-sm text-slate-300">
            Permanently delete your data and everything associated with your
            account
          </p>
        </div>
        <Button
          className="h-auto py-3 px-5 rounded-[38px] w-fit"
          variant="secondary"
        >
          Delete account
        </Button>
      </div>
    </div>
  );
}
