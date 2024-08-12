"use client";
import { useState, useEffect } from "react";
import { ArrowLeft, CircleCheck } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import AuthLayout from "@/components/Layouts/AuthLayout";
import CustomFormField from "@/components/forms/CustomFormField";
import { FormFieldType } from "@/types";
import { forgotPassword } from "@/services/auth.api";
import { useAppContext } from "@/context/AppContext";

const forgotPasswordFormSchema = z.object({
  email: z.string().email("Invalid email").min(5, {
    message: "Email must be at least 5 characters",
  }),
});

export default function ForgotPassword({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { toast } = useToast();
  const { setToken, setUserData } = useAppContext();

  const [success, setSuccess] = useState(false);

  const mutation = useMutation({
    mutationFn: forgotPassword,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["auth"] });
    },
  });

  const form = useForm<z.infer<typeof forgotPasswordFormSchema>>({
    resolver: zodResolver(forgotPasswordFormSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(values: z.infer<typeof forgotPasswordFormSchema>) {
    try {
      const res = await mutation.mutateAsync(values);
      toast({
        variant: "success",
        title: "Success",
        description: "Reset password link sent. \nCheck your email",
      });
      setToken(res?.data?.accessToken);
      setUserData(res?.data?.userData);
      router.push("/reset-password");
    } catch (err: any) {
      const errorMsg = mutation?.error?.message || err?.response?.data?.message;
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: errorMsg,
      });
    }
  }

  useEffect(() => {
    if (success) {
      setTimeout(() => setSuccess(false), 3000);
    }
  }, [success]);

  return (
    <AuthLayout>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-y-11 overflow-x-hidden"
        >
          <div className="flex flex-col gap-1 max-md:mb-[50px]">
            <h3 className="text-slate-900 text-base md:text-[2rem] md:leading-[40px] font-bold">
              Forgot Password?
            </h3>
            <p className="text-[10px] md:text-sm text-gray-1">
              All good. Enter your account’s email address and we’ll send you a
              link to reset your password.
            </p>
          </div>
          <CustomFormField
            control={form.control}
            name="email"
            fieldType={FormFieldType.INPUT}
            placeholder="E-mail address"
            className="p-4 rounded-xl"
          />
          <div className="flex flex-col gap-y-[22.5px]">
            <Button
              type="submit"
              disabled={mutation.isPending}
              className="mb-[25px] disabled:bg-green-200 text-teal-50 font-medium bg-green-500 py-3 px-4 rounded-[38px]"
            >
              Send reset link
            </Button>
            {success && (
              <div className="bg-green-50 border-[0.5px] border-green-500 rounded-[14px] flex items-center gap-x-[5px] py-4.5 px-7">
                <CircleCheck className="text-green-500" />
                <p className="text-sm text-slate-800">
                  An email has been sent. Click on link to verify.
                </p>
              </div>
            )}
          </div>
          <div className="flex justify-center">
            <Link
              href="/login"
              className="flex items-center gap-x-0.5 text-orange-500 text-sm font-bold text-center"
            >
              <ArrowLeft />
              Return to login
            </Link>
          </div>
        </form>
      </Form>
    </AuthLayout>
  );
}
