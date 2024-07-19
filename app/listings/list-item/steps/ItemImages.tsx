"use client";
import { useState } from "react";
import Image from "next/image";
import { Control } from "react-hook-form";
import { FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import CustomFormField from "@/components/forms/CustomFormField";
import { FormFieldType } from "@/types";

export default function ItemImages({ control }: { control: Control<any> }) {
	const [disabled, setDisabled] = useState(false);
	const [imageURLs, setImageURLs] = useState<string[]>([]);

	return (
		<div className="flex flex-col gap-y-[30px]">
			<div className="flex flex-col gap-y-3.5">
				<p className="text-slate-800 font-medium">Upload Product Images</p>
				<CustomFormField
					control={control}
					fieldType={FormFieldType.SKELETON}
					name="image"
					className="py-3 px-4 rounded-lg border border-gray-3"
					renderSkeleton={(field) => (
						<FormControl>
							<div className="flex flex-col gap-y-2.5">
								<div className="flex flex-col items-center w-full pt-6 pb-11 rounded-lg border border-dashed border-mist-500">
									<Image
										src="/icons/img-upload-icon.svg"
										alt="upload image icon"
										height={50}
										width={55.64}
										className="mb-5"
									/>
									<label
										htmlFor="image"
										className="text-center text-black mb-[13px] cursor-pointer"
									>
										Drag and drop images or{" "}
										<span className="text-green-500 font-medium">
											Browse here
										</span>
									</label>
									<p className="text-center text-slate-300">
										PNG, JPG and a maximum file size of 10 mb
									</p>
									<Input
										type="file"
										multiple
										accept="image/*"
										id="image"
										{...field}
										disabled={disabled}
										className={`hidden outline-none ring-0 ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0`}
										onChange={(e) => {
											const files = e.target.files;
											if (files && files.length > 5) {
												setDisabled(true);
												return;
											}
											setDisabled(false);
											const fileArray = Array.from(files!);
											const urls = fileArray.map((file) =>
												URL.createObjectURL(file)
											);
											setImageURLs(urls);
											// field.value = fileArray;
											field.value = urls[0];
										}}
									/>
								</div>
								<div className="flex items-center justify-between">
									<Image
										src={imageURLs[0] || "/images/default-img.png"}
										alt="default-img"
										width={103}
										height={103}
										className="rounded-lg border border-gray-3 object-cover"
									/>
									<Image
										src={imageURLs[1] || "/images/default-img.png"}
										alt="default-img"
										width={103}
										height={103}
										className="rounded-lg border border-gray-3 object-cover"
									/>
									<Image
										src={imageURLs[2] || "/images/default-img.png"}
										alt="default-img"
										width={103}
										height={103}
										className="rounded-lg border border-gray-3 object-cover"
									/>
									<Image
										src={imageURLs[3] || "/images/default-img.png"}
										alt="default-img"
										width={103}
										height={103}
										className="rounded-lg border border-gray-3 object-cover"
									/>
									<Image
										src={imageURLs[4] || "/images/default-img.png"}
										alt="default-img"
										width={103}
										height={103}
										className="rounded-lg border border-gray-3 object-cover"
									/>
								</div>
							</div>
						</FormControl>
					)}
				/>
			</div>
			<CustomFormField
				control={control}
				fieldType={FormFieldType.TEXTAREA}
				placeholder="This item..."
				name="description"
				className="py-3 px-4 rounded-lg border border-gray-3"
				label="Description"
			/>
		</div>
	);
}
