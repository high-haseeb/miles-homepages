import { Checkbox } from "@/components/ui/checkbox";
import LeftArrow from "@/components/vectors/LeftArrow";

export default function Notifications({ clearTab }: { clearTab?: () => void }) {
  return (
    <div className="flex flex-col gap-y-[25px] sm:max-w-[582px] sm:mt-[30px]">
      <div className="sm:hidden flex items-center gap-x-4.5" onClick={clearTab}>
        <LeftArrow />
        <span className="text-slate-900 text-sm font-bold">Notifications</span>
      </div>
      <label className="flex items-center justify-between max-sm:gap-x-[42px]">
        <div className="flex flex-col">
          <p className="font-medium text-sm text-slate-900">
            Message notifications
          </p>
          <p className="text-xs sm:text-sm text-slate-300">
            Show notifications for new messages
          </p>
        </div>
        <Checkbox className="data-[state=checked]:bg-green-500 disabled:opacity-100 border-green-500 h-4 w-4" />
      </label>
      <label className="flex items-center justify-between max-sm:gap-x-[42px]">
        <div className="flex flex-col">
          <p className="font-medium text-sm text-slate-900">
            Rental notifications
          </p>
          <p className="text-xs sm:text-sm text-slate-300">
            Get notified on rental cancellations, confirm & reminders
          </p>
        </div>
        <Checkbox className="data-[state=checked]:bg-green-500 disabled:opacity-100 border-green-500 h-4 w-4" />
      </label>
      <label className="flex items-center justify-between max-sm:gap-x-[42px]">
        <div className="flex flex-col">
          <p className="font-medium text-sm text-slate-900">
            Security Notifications
          </p>
          <p className="text-xs sm:text-sm text-slate-300">
            Get notified on logins from new devices or locations.
          </p>
        </div>
        <Checkbox className="data-[state=checked]:bg-green-500 disabled:opacity-100 border-green-500 h-4 w-4" />
      </label>
      <label className="flex items-center justify-between max-sm:gap-x-[42px]">
        <div className="flex flex-col">
          <p className="font-medium text-sm text-slate-900">
            Promotional & Marketing Notifications
          </p>
          <p className="text-xs sm:text-sm text-slate-300">
            Get notified of special promotions or discounts. And new features
            added to the platform.
          </p>
        </div>
        <Checkbox className="data-[state=checked]:bg-green-500 disabled:opacity-100 border-green-500 h-4 w-4" />
      </label>
    </div>
  );
}
