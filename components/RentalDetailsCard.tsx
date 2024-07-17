import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function RentalDetailsCard() {
	return (
		<div className="rounded-xl border border-gray-4/35 bg-white p-5 flex flex-col overflow-x-hidden">
			<div className="flex items-end gap-x-[30px] mb-[22px]">
				<Image
					src="/images/polaroid-card.png"
					width={200}
					height={200}
					alt="polaroid"
					className="rounded-[10px] object-contain"
				/>
				<div className="flex flex-col gap-y-2.5 w-full">
					<div className="flex flex-col">
						<p className="mb-[5px] text-slate-900">Canon SB-6A</p>
						<p className="text-lg text-green-500 font-medium">
							NGN 50,000
							<br />
							<span className="text-sm text-slate-500 font-normal">
								per/day
							</span>
						</p>
					</div>
					<div className="flex border border-gray-4/50 bg-white rounded-[15px] divide-x w-fit">
						<div className="py-[15px] px-2">
							<p className="text-sm text-slate-400 mb-[7px]">START DATE</p>
							<p className="text-slate-800 font-medium">01/11/2020</p>
						</div>
						<div className="py-[15px] px-2">
							<p className="text-sm text-slate-400 mb-[7px]">END DATE</p>
							<p className="text-slate-800 font-medium">01/11/2020</p>
						</div>
					</div>
				</div>
			</div>
			<div className="flex flex-col gap-y-2.5">
				<p className="text-sm text-slate-400">PRICE BREAKDOWN</p>
				<div className="flex flex-col border-b pb-[31px] mb-[31px] gap-y-[5px]">
					{priceBreakdown.map((item, index) => (
						<div
							key={`itemId-${index + 1}`}
							className="flex items-center justify-between"
						>
							<p className="text-slate-900">{item.title}</p>
							<p className="text-slate-900">{item.value}</p>
						</div>
					))}
				</div>
				<div className="flex items-center justify-between mb-[31px]">
					<p className="text-green-500 font-medium text-xl">Total</p>
					<p className="text-green-500 font-medium text-xl">NGN 150,000</p>
				</div>
				<div className="flex items-center justify-between">
					<Button className="rounded-[38px] py-3 px-4 bg-transparent border-none font-medium text-slate-400">
						Decline request
					</Button>
					<Button className="rounded-[38px] py-3 px-4 bg-green-500 font-medium text-white border-none">
						Accept request
					</Button>
				</div>
			</div>
		</div>
	);
}

const priceBreakdown = [
	{
		title: "NGN 50,000 X 2 Days",
		value: "NGN 100,000",
	},
	{
		title: "Service Charge",
		value: "xxxx",
	},
	{
		title: "VAT",
		value: "xxxx",
	},
];
