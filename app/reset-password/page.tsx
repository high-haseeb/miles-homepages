"use client";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import AuthLayout from "@/components/Layouts/AuthLayout";
import CustomFormField from "@/components/forms/CustomFormField";
import { FormFieldType } from "@/types";
import { passwordSchema } from "@/constants/schemas";
import { minLengthRegex, specialCharRegex } from "@/constants";
import { resetPassword } from "@/services/auth.api";
import { useAppContext } from "@/context/AppContext";

const resetPasswordFormSchema = z
  .object({
    newPassword: passwordSchema,
    confirmPassword: passwordSchema,
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

export default function ResetPassword({
  searchParams,
}: {
  searchParams: { token: string };
}) {
  const token = searchParams?.token;
  const queryClient = useQueryClient();
  const router = useRouter();
  const { toast } = useToast();
  const { setUserData } = useAppContext();

  const mutation = useMutation({
    mutationFn: resetPassword,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["auth"] });
    },
  });

  const form = useForm<z.infer<typeof resetPasswordFormSchema>>({
    resolver: zodResolver(resetPasswordFormSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });
  const passwordWatch = form.watch("newPassword");
  async function onSubmit(values: z.infer<typeof resetPasswordFormSchema>) {
    try {
      const payload = {
        newPassword: values.newPassword,
      };
      const params = { token };

      const res = await mutation.mutateAsync({ params, payload });
      toast({
        variant: "success",
        title: "Success",
        description: "New password successfully set.",
      });
      setUserData(res?.data?.userData);
      router.push("/login");
    } catch (err: any) {
      const errorMsg = mutation?.error?.message || err?.response?.data?.message;
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: errorMsg,
      });
    }
  }

  return (
    <AuthLayout>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-y-11 overflow-x-hidden"
        >
          <div className="flex flex-col gap-1 max-md:mb-[50px]">
            <h3 className="text-slate-900 text-base md:text-[2rem] md:leading-[40px] font-bold">
              Set a new password
            </h3>
            <p className="text-[10px] md:text-sm text-gray-1">
              Input a new password
            </p>
          </div>
          <div className="flex flex-col gap-y-[5px]">
            <CustomFormField
              control={form.control}
              name="newPassword"
              fieldtype={FormFieldType.PASSWORD}
              placeholder="New password"
              className="p-4 rounded-xl "
            />
            <div className="flex items-center gap-x-3">
              <div className="flex items-center gap-x-0.5 md:gap-x-3 p-0.5">
                <Checkbox
                  id="min-8-characters"
                  disabled
                  checked={minLengthRegex.test(passwordWatch)}
                  className="rounded-full data-[state=checked]:bg-green-500 disabled:opacity-100 border-green-500 h-4 w-4"
                />
                <label
                  htmlFor="min-8-characters"
                  className="text-xs text-slate-800"
                >
                  Minimum of 8 characters
                </label>
              </div>
              <div className="flex items-center gap-x-0.5 md:gap-x-3 p-0.5">
                <Checkbox
                  id="special-char"
                  disabled
                  checked={specialCharRegex.test(passwordWatch)}
                  className="rounded-full data-[state=checked]:bg-green-500 disabled:opacity-100 border-green-500 h-4 w-4"
                />
                <label
                  htmlFor="special-char"
                  className="text-xs text-slate-800"
                >
                  One special character
                </label>
              </div>
            </div>
          </div>
          <CustomFormField
            control={form.control}
            name="confirmPassword"
            fieldtype={FormFieldType.PASSWORD}
            placeholder="Confirm password"
            className="p-4 rounded-xl "
          />
          <div className="flex flex-col">
            <Button
              type="submit"
              disabled={mutation.isPending}
              className="mb-[25px] disabled:bg-green-200 text-teal-50 font-medium bg-green-500 py-3 px-4 rounded-[38px]"
            >
              Save
            </Button>
          </div>
        </form>
      </Form>
    </AuthLayout>
  );
}
