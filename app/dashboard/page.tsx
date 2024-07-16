import Image from "next/image";
import Link from "next/link";
import {
	Table,
	TableBody,
	TableCell,
	TableRow,
	TableHead,
	TableHeader,
} from "@/components/ui/table";

import DashboardLayout from "@/components/Layouts/DashboardLayout";
import StatsCard from "@/components/StatsCard";
import DashboardChart from "@/components/DashboardChart";
import BadgeIcon from "@/components/vectors/BadgeIcon";
import FilledStarIcon from "@/components/vectors/FilledStarIcon";
import InfoIcon from "@/components/vectors/InfoIcon";
import VerifiedIcon from "@/components/vectors/VerifiedIcon";

export default function Dashboard() {
	return (
		<DashboardLayout>
			<>
				<div className="flex flex-col gap-[5px]">
					<h3 className="text-2xl text-slate-900 font-bold">
						Welcome back, Femi
					</h3>
					<div className="flex items-center gap-x-[11px]">
						<p className="text-xs text-slate-400 font-medium">
							MEMBER SINCE 2020
						</p>
						<div className="h-2 w-2 bg-slate-200 rounded-full" />
						<div className="flex items-center gap-1">
							<BadgeIcon />
							<p className="text-xs text-slate-400 font-medium">TOP LENDER</p>
						</div>
						<div className="h-2 w-2 bg-slate-200 rounded-full" />
						<div className="flex items-center gap-1">
							<VerifiedIcon />
							<p className="text-xs text-slate-400 font-medium">VERIFIED</p>
						</div>
					</div>
				</div>
				<div className="grid grid-cols-1 md:grid-3 lg:grid-cols-4 gap-[15.33px]">
					<StatsCard
						src="/icons/star-badge.svg"
						title="LENDER RATING"
						stat="5.0"
						iconStart={<FilledStarIcon />}
					/>
					<StatsCard
						src="/icons/cash-hand-badge.svg"
						title="TOTAL EARNINGS"
						stat="$32,000,000"
					/>
					<StatsCard
						src="/icons/response-rate-badge.svg"
						title="RESPONSE RATE"
						stat="90%"
						iconEnd={<InfoIcon />}
					/>
					<StatsCard
						src="/icons/charts-badge.svg"
						title="TOTAL RENTALS"
						stat="24"
					/>
				</div>
				<div className="flex flex-col md:flex-row md:items-end gap-x-[30px]">
					<div className="flex flex-col gap-y-[7px] max-w-[700px] w-full">
						<div className="flex items-center justify-between">
							<p className="font-medium text-slate-900">Item Milage</p>
							<Link href="#" className="font-medium text-slate-900 text-sm">
								See All
							</Link>
						</div>
						<Table className="w-full bg-white p-[25px] rounded-[25px]">
							<TableBody>
								{items.map((item) => (
									<TableRow key={item.name} className="border-none">
										<TableCell className="flex items-center gap-x-[25px]">
											<Image
												src={item.src}
												width={55}
												height={55}
												alt={item.name}
												className="rounded-[20px] object-cover"
											/>
											<div className="flex flex-col gap-0.5">
												<p className="text-sm text-slate-900">{item.name}</p>
												<p className="text-sm text-orange-500">
													{item.pricePerDay} per day
												</p>
											</div>
										</TableCell>
										<TableCell className="text-sm text-teal-500">
											{item.duration}
										</TableCell>
										<TableCell className="text-sm text-slate-800 text-right">
											{item.quantity} X
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</div>
					<div className="flex flex-col gap-y-[18px] p-6 rounded-[10px] bg-cover bg-center bg-no-repeat bg-[url('/images/go-green-bg.png')]">
						<h4 className="font-bold text-[22px] text-white leading-[28.64px]">
							Go green campaign
						</h4>
						<p className="text-wrap max-w-[284px] text-sm text-white">
							Upgrade your profile by verifying your identity or address to
							enjoy unlimited access to your profile from any where in the world
						</p>
						<button className="border border-gray-1 bg-gray-3 py-2 px-4 rounded-[38px] w-fit text-sm text-black font-medium">
							Verify your profile
						</button>
					</div>
				</div>
				<div className="flex flex-col md:flex-row md:items-stretch gap-[30px]">
					<div className="flex flex-col gap-y-[7px] max-w-[621px] w-full">
						<div className="flex items-center justify-between">
							<p className="font-medium text-slate-900">Rental Stats</p>
						</div>
						<DashboardChart />
					</div>
					<div className="flex flex-col gap-y-[7px]">
						<div className="flex items-center justify-between">
							<p className="font-medium text-slate-900">Price Stats</p>
							<Link href="#" className="font-medium text-slate-900 text-sm">
								See All
							</Link>
						</div>
						<Table className="w-full bg-white py-[27px] px-[30px] rounded-[25px]">
							<TableHeader>
								<TableRow>
									<TableHead className="text-teal-500 text-sm font-medium">
										SL No
									</TableHead>
									<TableHead className="text-teal-500 text-sm font-medium">
										Name
									</TableHead>
									<TableHead className="text-teal-500 text-sm font-medium">
										O.Price
									</TableHead>
									<TableHead className="text-teal-500 text-sm font-medium">
										Rental
									</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{priceStats.map((stat) => (
									<TableRow key={stat.name} className="border-none">
										<TableCell className="text-slate-600 text-sm">
											{stat.no}
										</TableCell>
										<TableCell className="text-slate-600 text-sm">
											{stat.name}
										</TableCell>
										<TableCell className="text-slate-600 text-sm">
											{stat.price}
										</TableCell>
										<TableCell className="text-slate-600 text-sm">
											{stat.rental}
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</div>
				</div>
			</>
		</DashboardLayout>
	);
}

const items = [
	{
		src: "/images/canon-sb.png",
		name: "Canon SB-6A",
		pricePerDay: "$100",
		duration: "25 Jan, 2020 - 22 Apr, 2024",
		quantity: 10,
	},
	{
		src: "/images/nikon-sb.png",
		name: "Nikon SB-6A",
		pricePerDay: "$300",
		duration: "25 Jan, 2020 - 22 Apr, 2024",
		quantity: 50,
	},
	{
		src: "/images/polaroid-sb.png",
		name: "Polaroid SB-6A",
		pricePerDay: "$160",
		duration: "25 Jan, 2020 - 22 Apr, 2024",
		quantity: 1000,
	},
];

const priceStats = [
	{
		no: "01",
		name: "Canon SB.",
		price: "$520",
		rental: "$820",
	},
	{
		no: "02",
		name: "Nikon",
		price: "$520",
		rental: "$820",
	},
	{
		no: "03",
		name: "Polaroid",
		price: "$520",
		rental: "$820",
	},
	{
		no: "04",
		name: "-----",
		price: "-----",
		rental: "-----",
	},
	{
		no: "05",
		name: "-----",
		price: "-----",
		rental: "-----",
	},
];
