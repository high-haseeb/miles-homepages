import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

import AuthLayout from "@/components/Layouts/AuthLayout";
import Backbtn from "@/components/Backbtn";

export default function OnboardingPage() {
	return (
		<AuthLayout>
			<div className="flex flex-col gap-y-6 overflow-x-hidden">
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
					<Input
						type="text"
						placeholder="First name"
						className="p-4 rounded-t-xl rounded-b-none outline-none ring-0 ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0"
					/>
					<Input
						type="text"
						placeholder="Last name"
						className="p-4 rounded-b-xl rounded-t-none outline-none ring-0 ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0"
					/>
					<p className="text-slate-200 text-xs mt-2">
						Your names matches the name on your government issued ID
					</p>
				</div>
				<div className="flex flex-col gap-y-[5px]">
					<Input
						type="password"
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
							<label htmlFor="special-char" className="text-xs text-slate-800">
								One special character
							</label>
						</div>
					</div>
				</div>
				<Input
					type="password"
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
			</div>
		</AuthLayout>
	);
}
