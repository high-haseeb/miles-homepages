"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";

import AuthLayout from "@/components/Layouts/AuthLayout";
import CustomFormField from "@/components/forms/CustomFormField";
import { FormFieldType } from "@/types";
import { passwordSchema } from "@/constants/schemas";
import { login } from "@/services/auth.api";
import { useAppContext } from "@/context/AppContext";

const loginFormSchema = z.object({
  email: z.string().email("Invalid email").min(5, {
    message: "Email must be at least 5 characters",
  }),
  password: passwordSchema,
});

export default function LoginPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { toast } = useToast();
  const { setToken, setUserData } = useAppContext();

  const mutation = useMutation({
    mutationFn: login,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["auth"] });
    },
  });

  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const redirectUrl = searchParams.redirect;

  async function onSubmit(values: z.infer<typeof loginFormSchema>) {
    try {
      const res = await mutation.mutateAsync(values);
      toast({
        variant: "success",
        title: "Success",
        description: "Log in successful!",
      });
      setToken(res?.data?.accessToken);
      setUserData(res?.data?.userData);
      const redirect = redirectUrl
        ? decodeURIComponent(redirectUrl as string)
        : "/dashboard";
      router.push(redirect);
    } catch (err: any) {
      console.log(err);
      console.log(mutation.error);
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: err?.response?.data?.message,
      });
    }
  }

  return (
    <AuthLayout>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-y-6 overflow-x-hidden"
        >
          <div className="flex flex-col gap-1 max-md:mb-[50px]">
            <h3 className="text-slate-900 text-base md:text-[2rem] md:leading-[40px] font-bold">
              Login into your account
            </h3>
            <p className="text-[10px] md:text-sm text-gray-1">
              Welcome back, select a login method
            </p>
          </div>
          <div className="flex flex-col gap-y-6">
            <Button className="py-2 px-4 rounded-[38px] text-black text-sm font-bold relative bg-gray-2">
              <Image
                src="/icons/google-icon.svg"
                width={24}
                height={24}
                alt="google-icon"
                className="object-contain md:absolute md:left-4 max-md:mr-2.5"
              />
              Continue with Google
            </Button>
            <Button className="py-2 px-4 rounded-[38px] text-black text-sm font-bold relative bg-gray-2">
              <Image
                src="/icons/facebook-icon.svg"
                width={24}
                height={24}
                alt="facebook-icon"
                className="object-contain md:absolute md:left-4 max-md:mr-2.5"
              />
              Continue with Facebook
            </Button>
          </div>
          <div className="flex items-center gap-x-3">
            <div className="h-[1px] bg-gray-2 w-full" />
            <p className="text-slate-200 text-xs">Or</p>
            <div className="h-[1px] bg-gray-2 w-full" />
          </div>
          <div className="flex flex-col gap-y-3">
            <CustomFormField
              control={form.control}
              name="email"
              fieldType={FormFieldType.INPUT}
              placeholder="E-mail address"
              className="p-4 rounded-xl"
            />
            <CustomFormField
              control={form.control}
              name="password"
              fieldType={FormFieldType.PASSWORD}
              placeholder="Password"
              className="p-4 rounded-xl"
            />
            <Link href="/forgot-password" className="text-xs text-orange-500">
              Forgot password ?
            </Link>
          </div>
          <Button
            type="submit"
            disabled={mutation.isPending}
            className="mb-[25px] disabled:bg-green-200 text-teal-50 font-medium bg-green-500 py-3 px-4 rounded-[38px]"
          >
            Proceed
          </Button>
          <p className="text-sm text-center text-dark">
            Don’t have an account?{" "}
            <Link href="/signup" className="font-bold text-green-500">
              Sign Up
            </Link>
          </p>
        </form>
      </Form>
    </AuthLayout>
  );
}
