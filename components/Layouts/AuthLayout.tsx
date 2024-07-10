import Image from "next/image";
import { AuthLayoutProps } from "@/types";

export default function AuthLayout({ children }: AuthLayoutProps) {
	return (
		<section className="w-full h-screen flex max-md:flex-col md:justify-center md:items-center bg-cover bg-center bg-no-repeat bg-white md:bg-[url('/images/onboarding-bg.png')] md:px-5">
			<div className="bg-white md:shadow-standard border-slate-50 rounded-[20px] py-[15px] md:py-[34px] px-[25px] md:px-[50px] flex md:divide-x md:gap-x-10 max-w-[1046px] w-full md:mx-auto">
				<div className="flex-1 max-md:flex-col">
					<Image
						src="/images/logo.svg"
						width={45}
						height={12.32}
						alt="logo"
						className="object-contain mb-5 block md:hidden"
					/>
					{children}
				</div>
				<div className="pl-11 hidden md:flex flex-col justify-center flex-1">
					<Image
						src="/images/logo.svg"
						width={95}
						height={26}
						alt="logo"
						className="object-contain mb-10"
					/>
					<h3 className="text-slate-900 text-4xl font-bold mb-4.5">
						Make extra cash from your items you.
					</h3>
					<p className="text-slate-600 text-lg mb-4.5">
						Miles is a digital renting market built to encourage communal
						sharing while decluttering your space and helping you save.
					</p>
					<Image
						src="/icons/three-dots.svg"
						width={40}
						height={8}
						alt="miles 3 dots"
					/>
				</div>
			</div>
		</section>
	);
}
