"use client";
import { ReactElement, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChevronRight } from "lucide-react";

import ProfileLayout from "@/components/Layouts/ProfileLayout";
import Accounts from "./tabs/Accounts";
import Payments from "./tabs/Payments";
import Payouts from "./tabs/Payouts";
import Settings from "./tabs/Settings";
import Notifications from "./tabs/Notifications";
import { useAppContext } from "@/context/AppContext";

export default function Profile() {
  const [tab, setTab] = useState("");
  const { userData } = useAppContext();
  const stepComponents: {
    [key: string]: ReactElement;
  } = {
    account: <Accounts clearTab={() => setTab("")} />,
    payments: <Payments clearTab={() => setTab("")} />,
    payouts: <Payouts clearTab={() => setTab("")} />,
    settings: <Settings clearTab={() => setTab("")} />,
    notifications: <Notifications clearTab={() => setTab("")} />,
  };

  return (
    <ProfileLayout>
      <div className="mx-11 my-4 hidden sm:block">
        <Tabs defaultValue="account" className="w-full">
          <TabsList className="gap-x-10 text-slate-400 bg-transparent h-auto pb-0 border-b border-gray-2 w-full rounded-none justify-start">
            <TabsTrigger value="account" className="tab-item">
              Account
            </TabsTrigger>
            <TabsTrigger value="payment" className="tab-item">
              Payment
            </TabsTrigger>
            <TabsTrigger value="payouts" className="tab-item">
              Payouts
            </TabsTrigger>
            <TabsTrigger value="settings" className="tab-item">
              Settings
            </TabsTrigger>
            <TabsTrigger value="notifications" className="tab-item">
              Notifications
            </TabsTrigger>
          </TabsList>
          <TabsContent value="account" className="mt-0">
            <Accounts />
          </TabsContent>
          <TabsContent value="payment" className="mt-0">
            <Payments />
          </TabsContent>
          <TabsContent value="payouts" className="mt-0">
            <Payouts />
          </TabsContent>
          <TabsContent value="settings" className="mt-0">
            <Settings />
          </TabsContent>
          <TabsContent value="notifications" className="mt-0">
            <Notifications />
          </TabsContent>
        </Tabs>
      </div>
      <div className="sm:hidden">
        {tab === "" ? (
          <div className="flex flex-col gap-y-[35px]">
            <div
              className="flex items-center justify-between cursor-pointer"
              onClick={() => setTab("account")}
            >
              <div className="flex items-center gap-x-[15px]">
                <Avatar className="w-[60px] h-[60px]">
                  <AvatarImage
                    src={userData?.image_url || ""}
                    alt="profile-pic"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm text-slate-800">{`${userData?.first_name} ${userData?.last_name}`}</p>
                  <p className="text-xs text-slate-300">View profile</p>
                </div>
              </div>
              <ChevronRight width={16} height={16} />
            </div>
            <div className="flex flex-col gap-y-10">
              <div
                className="flex items-center justify-between cursor-pointer"
                onClick={() => setTab("payments")}
              >
                <p className="text-slate-900">Payment</p>
                <ChevronRight width={16} height={16} />
              </div>
              <div
                className="flex items-center justify-between cursor-pointer"
                onClick={() => setTab("payouts")}
              >
                <p className="text-slate-900">Payouts</p>
                <ChevronRight width={16} height={16} />
              </div>
              <div
                className="flex items-center justify-between cursor-pointer"
                onClick={() => setTab("settings")}
              >
                <p className="text-slate-900">Settings</p>
                <ChevronRight width={16} height={16} />
              </div>
              <div
                className="flex items-center justify-between cursor-pointer"
                onClick={() => setTab("notifications")}
              >
                <p className="text-slate-900">Notifications</p>
                <ChevronRight width={16} height={16} />
              </div>
            </div>
          </div>
        ) : (
          stepComponents[tab]
        )}
      </div>
    </ProfileLayout>
  );
}
