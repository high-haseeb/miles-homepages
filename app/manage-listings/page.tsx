import Link from "next/link";

import DashboardLayout from "@/components/Layouts/DashboardLayout";
import ListItemIcon from "@/components/vectors/ListItemIcon";
import ListedItemCard from "@/components/ListedItemCard";

export default function Lisitngs() {
  return (
    <DashboardLayout>
      <>
        <div className="flex items-center justify-between">
          <div className="flex flex-col sm:gap-y-2.5">
            <h3 className="sm:text-2xl text-slate-900 font-bold">
              Manage Listings
            </h3>
            <p className="text-xs sm:text-sm text-gray-1">
              Manage, edit and view your available listings.
            </p>
          </div>
          <Link
            href="/manage-listings/list-item"
            className="sm:flex items-center hidden py-2.5 px-4.5 gap-2 border-[0.5px] border-white bg-green-500 rounded-[38px] font-medium text-sm text-white"
          >
            <ListItemIcon /> List New Item
          </Link>
        </div>
        <Link
          href="/manage-listings/list-item"
          className="flex items-center self-end sm:hidden py-2.5 px-4.5 gap-2 border-[0.5px] border-white bg-green-500 rounded-[38px] font-medium text-sm text-white"
        >
          <ListItemIcon /> List New Item
        </Link>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-[15px] sm:gap-x-[35px] gap-y-4.5 sm:gap-y-[25px]">
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
