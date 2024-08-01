import {
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import Dot from "./vectors/Dot";
import FlagIcon from "./vectors/FlagIcon";
import MoreIcon from "./vectors/MoreIcon";

export default function Notifications() {
  return (
    <DropdownMenuContent
      align="end"
      className="flex flex-col divide-y p-0 max-w-[610px] w-full max-h-[720px] overflow-y-auto"
    >
      <DropdownMenuItem className="flex items-center justify-between px-[26px] py-3 rounded-none">
        <p className="text-lg font-medium text-slate-800">Notifications</p>
        <div className="flex items-center gap-x-[15px] divide-x">
          <p className="text-green-500 text-sm">Mark all as read</p>
          <p className="text-green-500 text-sm pl-[15px]">Settings</p>
        </div>
      </DropdownMenuItem>
      <DropdownMenuItem className="bg-teal-50 p-[23px] flex items-center justify-between rounded-none">
        <div className="max-w-[375px] flex items-center gap-x-[15px]">
          <Dot />
          <div className="flex flex-col">
            <p className="text-slate-800 font-medium">
              Login attempted from new IPf.
            </p>
            <p className="text-slate-400">
              The system has detected that your account is logged in...
            </p>
          </div>
        </div>
        <div className="flex items-center gap-x-8">
          <FlagIcon />
          <MoreIcon />
        </div>
      </DropdownMenuItem>
      <DropdownMenuItem className="bg-teal-50 p-[23px] flex items-center justify-between rounded-none">
        <div className="max-w-[375px] flex items-center gap-x-[15px]">
          <Dot />
          <div className="flex flex-col">
            <p className="text-slate-800 font-medium">
              Login attempted from new IPf.
            </p>
            <p className="text-slate-400">
              The system has detected that your account is logged in...
            </p>
          </div>
        </div>
        <div className="flex items-center gap-x-8">
          <FlagIcon />
          <MoreIcon />
        </div>
      </DropdownMenuItem>
      <DropdownMenuItem className="p-[23px] flex items-center justify-between rounded-none">
        <div className="max-w-[375px] flex items-center gap-x-[15px]">
          <Dot />
          <div className="flex flex-col">
            <p className="text-slate-800 font-medium">New Rental booking</p>
            <p className="text-slate-400">
              Congratulations! You have a new booking on Miles.
            </p>
            <p className="text-sm text-slate-300">April, 27 at 11:03am</p>
          </div>
        </div>
        <div className="flex items-center gap-x-8">
          <FlagIcon />
          <MoreIcon />
        </div>
      </DropdownMenuItem>
      <DropdownMenuItem className="p-[23px] flex items-center justify-between rounded-none">
        <div className="max-w-[375px] flex items-center gap-x-[15px]">
          <Dot />
          <div className="flex flex-col">
            <p className="text-slate-800 font-medium">New Rental booking</p>
            <p className="text-slate-400">
              Congratulations! You have a new booking on Miles.
            </p>
            <p className="text-sm text-slate-300">April, 27 at 11:03am</p>
          </div>
        </div>
        <div className="flex items-center gap-x-8">
          <FlagIcon />
          <MoreIcon />
        </div>
      </DropdownMenuItem>
      <DropdownMenuItem className="p-[23px] flex items-center justify-between rounded-none">
        <div className="max-w-[375px] flex items-center gap-x-[15px]">
          <Dot />
          <div className="flex flex-col">
            <p className="text-slate-800 font-medium">New Rental booking</p>
            <p className="text-slate-400">
              Congratulations! You have a new booking on Miles.
            </p>
            <p className="text-sm text-slate-300">April, 27 at 11:03am</p>
          </div>
        </div>
        <div className="flex items-center gap-x-8">
          <FlagIcon />
          <MoreIcon />
        </div>
      </DropdownMenuItem>
      <DropdownMenuItem className="p-[23px] flex items-center justify-between rounded-none">
        <div className="max-w-[375px] flex items-center gap-x-[15px]">
          <Dot />
          <div className="flex flex-col">
            <p className="text-slate-800 font-medium">New Rental booking</p>
            <p className="text-slate-400">
              Congratulations! You have a new booking on Miles.
            </p>
            <p className="text-sm text-slate-300">April, 27 at 11:03am</p>
          </div>
        </div>
        <div className="flex items-center gap-x-8">
          <FlagIcon />
          <MoreIcon />
        </div>
      </DropdownMenuItem>
      <DropdownMenuItem className="p-0 w-full rounded-none">
        <button className="w-full text-center self-center p-[23px] text-green-500 font-medium text-lg">
          See All Notifications
        </button>
      </DropdownMenuItem>
    </DropdownMenuContent>
  );
}
