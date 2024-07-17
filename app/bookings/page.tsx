import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import DashboardLayout from "@/components/Layouts/DashboardLayout";
import FilterIcon from "@/components/vectors/FilterIcon";
import SortIcon from "@/components/vectors/SortIcon";
import Pending from "./tabs/Pending";
import Upcoming from "./tabs/Upcoming";
import Progress from "./tabs/Progress";
import Completed from "./tabs/Completed";
import All from "./tabs/All";

export default function Bookings() {
	return (
		<DashboardLayout>
			<>
				<div className="flex flex-col">
					<div className="flex flex-col gap-y-2.5">
						<h3 className="text-2xl text-slate-900 font-bold">Bookings</h3>
						<p className="text-sm text-gray-1">Manage your bookings.</p>
					</div>
					<div className="flex items-center gap-x-7 self-end">
						<button className="flex items-center gap-2 rounded-lg py-2 px-4 border-[0.5px] border-white bg-white text-sm text-slate-400">
							<FilterIcon /> Filter
						</button>
						<button className="flex items-center gap-2 rounded-lg py-2 px-4 border-[0.5px] border-white bg-white text-sm text-slate-400">
							<SortIcon /> Sort
						</button>
					</div>
				</div>
				<Tabs defaultValue="pending" className="w-full border-b border-gray-2">
					<TabsList className="gap-x-10 text-slate-400 bg-transparent h-auto pb-0">
						<TabsTrigger
							value="pending"
							className="data-[state=active]:bg-transparent data-[state=active]:border-b-[3px] data-[state=active]:border-green-500 rounded-none data-[state=active]:text-green-500 data-[state=active]:shadow-none"
						>
							Pending request
						</TabsTrigger>
						<TabsTrigger
							value="upcoming"
							className="data-[state=active]:bg-transparent data-[state=active]:border-b-[3px] data-[state=active]:border-green-500 rounded-none data-[state=active]:text-green-500 data-[state=active]:shadow-none"
						>
							Upcoming
						</TabsTrigger>
						<TabsTrigger
							value="progress"
							className="data-[state=active]:bg-transparent data-[state=active]:border-b-[3px] data-[state=active]:border-green-500 rounded-none data-[state=active]:text-green-500 data-[state=active]:shadow-none"
						>
							In progress
						</TabsTrigger>
						<TabsTrigger
							value="completed"
							className="data-[state=active]:bg-transparent data-[state=active]:border-b-[3px] data-[state=active]:border-green-500 rounded-none data-[state=active]:text-green-500 data-[state=active]:shadow-none"
						>
							Completed
						</TabsTrigger>
						<TabsTrigger
							value="all"
							className="data-[state=active]:bg-transparent data-[state=active]:border-b-[3px] data-[state=active]:border-green-500 rounded-none data-[state=active]:text-green-500 data-[state=active]:shadow-none"
						>
							All
						</TabsTrigger>
					</TabsList>
					<TabsContent value="pending">
						<Pending />
					</TabsContent>
					<TabsContent value="upcoming">
						<Upcoming />
					</TabsContent>
					<TabsContent value="progress">
						<Progress />
					</TabsContent>
					<TabsContent value="completed">
						<Completed />
					</TabsContent>
					<TabsContent value="all">
						<All />
					</TabsContent>
				</Tabs>
			</>
		</DashboardLayout>
	);
}
