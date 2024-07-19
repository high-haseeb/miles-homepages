"use client";
import { Control } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";

import CustomFormField from "@/components/forms/CustomFormField";
import { FormFieldType } from "@/types";
import { getCategories } from "@/services/listing.api";
import { useAppContext } from "@/context/AppContext";

export default function ItemInfo({ control }: { control: Control<any> }) {
	const { token } = useAppContext();
	const { data: categories, isPending } = useQuery({
		queryKey: ["category"],
		queryFn: () => getCategories(token),
	});

	return (
		<div className="flex flex-col gap-y-[30px]">
			<div className="flex flex-col gap-y-[7px]">
				<h4 className="font-bold text-2xl text-slate-800">List an item</h4>
				<p className="text-slate-300">
					To start listing, fill in the product information below.
				</p>
			</div>
			<div className="flex flex-col gap-y-[25px]">
				<CustomFormField
					control={control}
					fieldType={FormFieldType.INPUT}
					placeholder="Nikon SB"
					name="product_name"
					className="py-3 px-4 rounded-lg border border-gray-3"
					label="Product name"
				/>
				<CustomFormField
					control={control}
					fieldType={FormFieldType.SELECT}
					placeholder="Film and Photography"
					name="category_id"
					className="py-3 px-4 rounded-lg border border-gray-3"
					label="Category"
					selectItems={categories?.data}
					disabled={isPending}
				/>
				<CustomFormField
					control={control}
					fieldType={FormFieldType.SELECT}
					placeholder="Film and Photography"
					name="item_location"
					className="py-3 px-4 rounded-lg border border-gray-3"
					label="Item Location"
					selectItems={categories?.data}
					disabled={isPending}
				/>
			</div>
		</div>
	);
}
