import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

import Dot from "./vectors/Dot";
import SendIcon from "./vectors/SendIcon";

export default function Chat() {
	return (
		<div className="flex flex-col gap-y-2.5 w-full">
			<div className="bg-white rounded-[14px] py-11 px-[26px] md:pr-[55px] flex flex-col gap-y-[17px]">
				<div className="flex flex-col">
					<div className="flex gap-x-2">
						<Dot color="#232424" className="mt-1" />
						<p className="text-slate-800">
							Lolu B. requested to book Polaroid SB-6A between
							<span className="font-medium">Jan 1 ,2020 - Mar 15, 2020</span>
						</p>
					</div>
					<p className="text-sm text-slate-400">Today 8:45 am</p>
				</div>
				<div className="flex gap-x-2.5">
					<Avatar className="w-[53px] h-[53px]">
						<AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
						<AvatarFallback>CN</AvatarFallback>
					</Avatar>
					<div className="flex flex-col">
						<div className="rounded-xl bg-white py-4.5 px-5 shadow text-slate-800">
							Hello Femi, would love to rent your polaroid SB-6A from Jan 1 to
							Mar 15. Thank you
						</div>
						<p className="text-sm text-slate-400">Today 8:45 am</p>
					</div>
				</div>
				<div className="w-full flex flex-col gap-y-[9px]">
					<Textarea
						className="bg-transparent py-[34px] px-[33px] bg-white border border-gray-2 rounded-[14px]"
						placeholder="Message Luis B..."
					/>
					<Button className="rounded-lg border border-gray-4 gap-2 py-2 px-4 text-slate-400 self-end w-fit bg-transparent">
						<SendIcon /> Send Message
					</Button>
				</div>
			</div>
		</div>
	);
}
