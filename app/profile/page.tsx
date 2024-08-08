import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import ProfileLayout from "@/components/Layouts/ProfileLayout";
import Accounts from "./tabs/Accounts";
import Payments from "./tabs/Payments";
import Payouts from "./tabs/Payouts";
import Settings from "./tabs/Settings";
import Notifications from "./tabs/Notifications";

export default function Profile() {
  return (
    <ProfileLayout>
      <div className="mx-11 my-4">
        <Tabs defaultValue="account" className="w-full border-b border-gray-2">
          <TabsList className="gap-x-10 text-slate-400 bg-transparent h-auto pb-0">
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
    </ProfileLayout>
  );
}
