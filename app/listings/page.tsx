import Link from "next/link";

import DashboardLayout from "@/components/Layouts/DashboardLayout";
import ListItemIcon from "@/components/vectors/ListItemIcon";
import ListedItemCard from "@/components/ListedItemCard";

export default function Lisitngs() {
	return (
		<DashboardLayout>
			<>
				<div className="flex items-center justify-between">
					<div className="flex flex-col gap-y-2.5">
						<h3 className="text-2xl text-slate-900 font-bold">
							Manage Listings
						</h3>
						<p className="text-sm text-gray-1">
							Manage, edit and view your available listings.
						</p>
					</div>
					<Link
						href="/listings/list-item"
						className="flex items-center py-2.5 px-4.5 gap-2 border-[0.5px] border-white bg-green-500 rounded-[38px] font-medium text-sm text-white"
					>
						<ListItemIcon /> List New Item
					</Link>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-x-[35px] gap-y-[25px]">
					<ListedItemCard />
					<ListedItemCard />
					<ListedItemCard />
					<ListedItemCard />
					<ListedItemCard />
					<ListedItemCard />
					<ListedItemCard />
					<ListedItemCard />
				</div>
			</>
		</DashboardLayout>
	);
}
