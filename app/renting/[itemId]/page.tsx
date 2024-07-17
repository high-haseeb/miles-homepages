import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import Backbtn from "@/components/Backbtn";
import DashboardLayout2 from "@/components/Layouts/DashboardLayout2";
import Chat from "@/components/Chat";
import RentalDetailsCard from "@/components/RentalDetailsCard";

export default function Item() {
	return (
		<DashboardLayout2>
			<>
				<div className="flex flex-col md:flex-row gap-[30px]">
					<div className="md:w-1/2 w-full flex flex-col">
						<Backbtn />
						<div className="flex items-center gap-x-5 max-w-[382px] mt-[30px] mb-[25px]">
							<Avatar className="w-[60px] h-[60px]">
								<AvatarImage
									src="https://github.com/shadcn.png"
									alt="@shadcn"
								/>
								<AvatarFallback>CN</AvatarFallback>
							</Avatar>
							<p className="font-bold text-slate-900">
								You received a booking request from Lolu.B
							</p>
						</div>
						<div className="flex flex-col gap-y-2.5">
							<p className="text-slate-900">Activity</p>
							<div className="w-full">
								<Chat />
							</div>
						</div>
					</div>
					<div className="md:w-1/2 w-full">
						<RentalDetailsCard />
					</div>
				</div>
			</>
		</DashboardLayout2>
	);
}
