"use client";
import { useState } from "react";
import { Control } from "react-hook-form";

import CustomFormField from "@/components/forms/CustomFormField";
import { FormFieldType } from "@/types";

export default function ExtraInfo({ control }: { control: Control<any> }) {
	return (
		<div className="flex flex-col gap-y-[25px]">
			<CustomFormField
				control={control}
				fieldType={FormFieldType.NUMBER}
				placeholder="This input is quite long"
				name="quantity_available"
				className="py-3 px-4 rounded-lg border border-gray-3"
				label="Quantity/Inventory Available"
			/>
			<CustomFormField
				control={control}
				fieldType={FormFieldType.NUMBER}
				placeholder="This input is quite long"
				name="estimated_value"
				className="py-3 px-4 rounded-lg border border-gray-3"
				label="Estimated value of the Item  *"
			/>
			<CustomFormField
				control={control}
				fieldType={FormFieldType.NUMBER}
				placeholder="This input is quite long"
				name="price_per_day"
				className="py-3 px-4 rounded-lg border border-gray-3"
				label="Rate (price / day)"
			/>
			<CustomFormField
				control={control}
				fieldType={FormFieldType.DATE_PICKER}
				placeholder="This input is quite long"
				name="availability_date"
				className="py-3 px-4 rounded-lg border border-gray-3 w-full justify-start"
				label="Manage Availability Date & Schedules"
			/>
		</div>
	);
}
