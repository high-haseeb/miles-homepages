"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";

import Backbtn from "@/components/Backbtn";
import AuthLayout from "@/components/Layouts/AuthLayout";
import CustomFormField from "@/components/forms/CustomFormField";
import { FormFieldType } from "@/types";
import { passwordSchema } from "@/constants/schemas";

const onboardingFormSchema = z
	.object({
		firstName: z
			.string()
			.min(2, { message: "First name must be at least 2 characters." }),
		lastName: z
			.string()
			.min(2, { message: "Last name must be at least 2 characters." }),
		email: z.string().email("Invalid email format."),
		password: passwordSchema,
		confirmPassword: passwordSchema,
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords do not match.",
		path: ["confirmPassword"],
	});

export default function OnboardingPage() {
	const form = useForm<z.infer<typeof onboardingFormSchema>>({
		resolver: zodResolver(onboardingFormSchema),
		defaultValues: {
			firstName: "",
			lastName: "",
			password: "",
			confirmPassword: "",
		},
	});

	function onSubmit(values: z.infer<typeof onboardingFormSchema>) {
		console.log(values);
	}
	return (
		<AuthLayout>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="flex flex-col gap-y-6 overflow-x-hidden"
				>
					<Backbtn />
					<div className="flex flex-col gap-1 max-md:-mt-4 max-md:mb-[50px]">
						<h3 className="text-slate-900 text-base md:text-2xl font-bold">
							Tell us about yourself
						</h3>
						<p className="text-[10px] md:text-sm text-slate-200">
							Miles is legally required to collect this information.
						</p>
					</div>
					<div className="flex flex-col">
						<CustomFormField
							control={form.control}
							name="firstName"
							fieldType={FormFieldType.INPUT}
							placeholder="First name"
							className="p-4 rounded-t-xl rounded-b-none outline-none ring-0 ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0"
						/>
						<CustomFormField
							control={form.control}
							name="lastName"
							fieldType={FormFieldType.INPUT}
							placeholder="Last name"
							className="p-4 rounded-b-xl rounded-t-none outline-none ring-0 ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0"
						/>
						<p className="text-slate-200 text-xs mt-2">
							Your names matches the name on your government issued ID
						</p>
					</div>
					<div className="flex flex-col gap-y-[5px]">
						<CustomFormField
							control={form.control}
							name="password"
							fieldType={FormFieldType.PASSWORD}
							placeholder="Password"
							className="p-4 rounded-xl outline-none ring-0 ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0"
						/>
						<div className="flex items-center gap-x-3">
							<div className="flex items-center gap-x-0.5 md:gap-x-3 p-0.5">
								<Checkbox
									id="min-8-characters"
									disabled
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
						fieldType={FormFieldType.PASSWORD}
						placeholder="Confirm password"
						className="p-4 rounded-xl outline-none ring-0 ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0"
					/>
					<div className="flex gap-x-2 p-0.5">
						<Checkbox
							id="terms"
							className="data-[state=checked]:bg-orange-500 border-orange-500 h-4 w-4"
						/>
						<label
							htmlFor="terms"
							className="text-xs md:text-sm leading-6 text-black"
						>
							I agree to the Miles{" "}
							<span className="font-medium underline">Terms of Service</span>,
							<span className="font-medium underline">
								Payments Terms of Services
							</span>{" "}
							and acknowledge the{" "}
							<span className="font-medium underline">Privacy Policy</span>
						</label>
					</div>
					<Button
						type="submit"
						className="mb-[25px] disabled:bg-green-200 text-teal-50 font-medium bg-green-500 py-3 px-4 rounded-[38px]"
					>
						Join Miles
					</Button>
				</form>
			</Form>
		</AuthLayout>
	);
}
