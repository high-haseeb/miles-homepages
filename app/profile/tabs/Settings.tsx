"use client";
import { ReactElement, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { ChevronRight } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Checkbox } from "@/components/ui/checkbox";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";

import CustomFormField from "@/components/forms/CustomFormField";
import { FormFieldType } from "@/types";
import { passwordSchema } from "@/constants/schemas";
import LeftArrow from "@/components/vectors/LeftArrow";
import { minLengthRegex, specialCharRegex } from "@/constants";
import { changePassword } from "@/services/auth.api";
import { useAppContext } from "@/context/AppContext";
import ChangePassword from "../modals/ChangePassword";

const updatePasswordFormSchema = z.object({
  password: passwordSchema,
});

export default function Settings({ clearTab }: { clearTab?: () => void }) {
  const [tab, setTab] = useState("");
  const [openModal, setOpenModal] = useState(false);

  const stepComponents: {
    [key: string]: ReactElement;
  } = {
    password: <PasswordManagement setTab={() => setTab("")} />,
    delete: <DeleteAccount setTab={() => setTab("")} />,
  };

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
    <>
      <div className="flex flex-col sm:mt-[30px] sm:gap-y-[30px] sm:divide-y">
        {tab === "" ? (
          <div className="sm:hidden">
            <div
              className="pb-5 mb-5 flex items-center gap-x-4.5"
              onClick={clearTab}
            >
              <LeftArrow />
              <span className="text-slate-900 text-sm font-bold">Settings</span>
            </div>

            <div className="flex flex-col gap-y-10">
              <div
                className="flex gap-x-[42px] justify-between cursor-pointer"
                onClick={() => setTab("password")}
              >
                <div className="'flex flex-col">
                  <p className="text-slate-900 text-sm">Password Management</p>
                  <p className="text-slate-300 text-xs">Change your password</p>
                </div>
                <ChevronRight
                  width={16}
                  height={16}
                  className="flex-shrink-0"
                />
              </div>
              <div
                className="flex gap-x-[42px] justify-between cursor-pointer"
                onClick={() => setTab("delete")}
              >
                <div className="'flex flex-col">
                  <p className="text-slate-900 text-sm">Delete account</p>
                  <p className="text-slate-300 text-xs">
                    Permanently delete your data and everything associated with
                    your account
                  </p>
                </div>
                <ChevronRight
                  width={16}
                  height={16}
                  className="flex-shrink-0"
                />
              </div>
            </div>
          </div>
        ) : (
          stepComponents[tab]
        )}
        <div className="hidden sm:flex flex-col gap-y-10 pb-[78px] border-none">
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
                name="newPassword"
                fieldtype={FormFieldType.PASSWORD}
                placeholder="Password"
                className="p-4 rounded-xl"
                fullwidth
                disabled
              />
              <Button
                className="h-auto py-3 px-5 rounded-[38px] w-fit"
                variant="secondary"
                type="button"
                onClick={() => setOpenModal(true)}
              >
                Change
              </Button>
            </form>
          </Form>
        </div>
        <div className="hidden sm:flex flex-col pt-[30px] gap-y-[30px]">
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
      <ChangePassword openModal={openModal} handleOpenModal={setOpenModal} />
    </>
  );
}

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

function PasswordManagement({ setTab }: { setTab: () => void }) {
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
      setTab();
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
    <div className="flex flex-col">
      <div
        className="sm:hidden pb-5 mb-5 flex items-center gap-x-4.5"
        onClick={setTab}
      >
        <LeftArrow />
        <span className="text-slate-900 text-sm font-bold">
          Password Management
        </span>
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
    </div>
  );
}

function DeleteAccount({ setTab }: { setTab: () => void }) {
  return (
    <div className="flex flex-col">
      <div
        className="sm:hidden pb-5 mb-5 flex items-center gap-x-4.5"
        onClick={setTab}
      >
        <LeftArrow />
        <span className="text-slate-900 text-sm font-bold">Delete Account</span>
      </div>
      <div className="flex flex-col gap-y-[60px]">
        <p className="text-sm text-slate-900">
          Permanently delete your data and everything associated with your
          account
        </p>
        <Button
          className="h-auto py-3 px-5 rounded-[38px] w-fit self-center"
          variant="secondary"
        >
          Delete account
        </Button>
      </div>
    </div>
  );
}
