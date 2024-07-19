"use client";
import { useState } from "react";
import Link from "next/link";
import { X } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
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

export default function ListItem() {
	const [currentStep, setCurrentStep] = useState(1);
	const queryClient = useQueryClient();

	const form = useForm<z.infer<typeof listItemFormSchema>>({
		resolver: zodResolver(listItemFormSchema),
		defaultValues: {
			product_name: "",
			item_location: "",
			description: "",
			image: "",
		},
	});

	const steps: StepProps[] = [
		{ 1: <ItemInfo control={form.control} /> },
		{ 2: <ItemImages control={form.control} /> },
		{ 3: <ExtraInfo control={form.control} /> },
	];

	const onSubmit = async (values: z.infer<typeof listItemFormSchema>) => {
		console.log("Form Submitted");
		console.log(values);
	};

	const handleButtonClick = () => {
		if (currentStep < steps.length) {
			setCurrentStep((prev) => prev + 1);
		}
	};

	console.log(
		form.formState.isDirty,
		form.formState.dirtyFields,
		form.formState.errors,
		form.formState.isValid
	);

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
					<Link href="/listings" className="p-4 text-slate-900">
						<X className="h-5 w-5" />
					</Link>
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
			</>
		</DashboardLayout>
	);
}
