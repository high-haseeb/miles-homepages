import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import FilterIcon from "@/components/vectors/FilterIcon";
import SortIcon from "@/components/vectors/SortIcon";
import Pending from "./tabs/Pending";
import Upcoming from "./tabs/Upcoming";
import Progress from "./tabs/Progress";
import Completed from "./tabs/Completed";
import All from "./tabs/All";
import DashboardLayout2 from "@/components/Layouts/DashboardLayout2";
import PrivateRoute from "@/components/custom-routes/PrivateRoute";
import Rejected from "./tabs/Rejected";
import Cancelled from "./tabs/Cancelled";

export default function Rentals() {
  return (
    <PrivateRoute>
      <DashboardLayout2 noPaddingX>
        <>
          <div className="flex flex-col px-[25px]">
            <div className="flex flex-col sm:gap-y-2.5 mb-2">
              <h3 className="sm:text-2xl text-slate-900 font-bold">
                My Rentals
              </h3>
              <p className="text-xs sm:text-sm text-gray-1">
                Manage your rentals.
              </p>
            </div>
            <div className="flex items-center gap-x-2.5 sm:gap-x-7 self-end">
              <button className="flex items-center gap-2 rounded-lg p-2 sm:px-4 sm:border-[0.5px] sm:border-white sm:bg-white text-xs sm:text-sm text-slate-400">
                <FilterIcon /> Filter
              </button>
              <button className="flex items-center gap-2 rounded-lg p-2 sm:px-4 sm:border-[0.5px] sm:border-white sm:bg-white text-xs sm:text-sm text-slate-400">
                <SortIcon /> Sort
              </button>
            </div>
          </div>
          <Tabs defaultValue="pending" className="sm:px-[25px]">
            <TabsList className="sm:gap-x-10 gap-x-6 max-sm:w-screen max-sm:overflow-x-auto w-full text-slate-400 bg-transparent h-auto pb-0 border-b border-gray-2 rounded-none justify-start">
              <TabsTrigger value="pending" className="tab-item">
                Pending request
              </TabsTrigger>
              <TabsTrigger value="upcoming" className="tab-item">
                Upcoming
              </TabsTrigger>
              <TabsTrigger value="progress" className="tab-item">
                In progress
              </TabsTrigger>
              <TabsTrigger value="completed" className="tab-item">
                Completed
              </TabsTrigger>
              <TabsTrigger value="cancelled" className="tab-item">
                Cancelled
              </TabsTrigger>
              <TabsTrigger value="rejected" className="tab-item">
                Rejected
              </TabsTrigger>
              <TabsTrigger value="all" className="tab-item">
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
            <TabsContent value="rejected">
              <Rejected />
            </TabsContent>
            <TabsContent value="cancelled">
              <Cancelled />
            </TabsContent>
            <TabsContent value="all">
              <All />
            </TabsContent>
          </Tabs>
        </>
      </DashboardLayout2>
    </PrivateRoute>
  );
}
