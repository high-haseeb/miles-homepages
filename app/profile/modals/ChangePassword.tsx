"use client";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Form } from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import CustomFormField from "@/components/forms/CustomFormField";
import { FormFieldType } from "@/types";
import { passwordSchema } from "@/constants/schemas";
import { ModalProps } from "@/types";
import { changePassword } from "@/services/auth.api";
import { useAppContext } from "@/context/AppContext";
import { minLengthRegex, specialCharRegex } from "@/constants";

const resetPasswordFormSchema = z
  .object({
    oldPassword: passwordSchema,
    newPassword: passwordSchema,
    confirmPassword: passwordSchema,
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

export default function ChangePassword({
  openModal,
  handleOpenModal,
}: ModalProps) {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const { setUserData } = useAppContext();

  const mutation = useMutation({
    mutationFn: changePassword,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["auth"] });
    },
  });

  const form = useForm<z.infer<typeof resetPasswordFormSchema>>({
    resolver: zodResolver(resetPasswordFormSchema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });
  const passwordWatch = form.watch("newPassword");
  async function onSubmit(values: z.infer<typeof resetPasswordFormSchema>) {
    try {
      const newValue = {
        oldPassword: values.oldPassword,
        newPassword: values.newPassword,
      };
      const res = await mutation.mutateAsync(newValue);
      toast({
        variant: "success",
        title: "Success",
        description: "New password successfully set.",
      });
      setUserData(res?.data?.userData);
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
    <Dialog open={openModal} onOpenChange={handleOpenModal} defaultOpen={false}>
      <DialogContent className="py-9 px-[30px] rounded-[14px] max-w-[545px] bg-white flex flex-col">
        <div className="mb-8 flex flex-col gap-1">
          <h3 className="font-bold text-slate-9 text-2xl">Change Password</h3>
          <p className="text-sm text-slate-200">Change your password</p>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-y-11 overflow-x-hidden"
          >
            <div className="flex flex-col gap-y-[25px]">
              <CustomFormField
                control={form.control}
                name="oldPassword"
                fieldtype={FormFieldType.PASSWORD}
                className="p-4 rounded-xl"
                label="Old Password"
              />
              <CustomFormField
                control={form.control}
                name="newPassword"
                fieldtype={FormFieldType.PASSWORD}
                className="p-4 rounded-xl"
                label="New Password"
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
              label="Confirm password"
              className="p-4 rounded-xl "
            />
            <div className="flex flex-col mt-[60px]">
              <Button
                type="submit"
                disabled={mutation.isPending}
                className="mb-[25px] w-full disabled:bg-green-200 text-teal-50 font-medium bg-green-500 py-3 px-4 rounded-[38px]"
              >
                Save
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
