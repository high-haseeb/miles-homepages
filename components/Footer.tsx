import Image from "next/image";
import Link from "next/link";

import { teams, contact, useCases, products, resources } from "@/constants";

export default function Footer() {
	return (
		<footer className="bg-teal-500 rounded-t-lg px-[25px] lg:px-[123px] pb-[49.68px] md:pb-[94px] pt-[50px] md:pt-[301px] flex flex-col">
			<div className="flex flex-col md:items-center md:justify-between mb-10 md:mb-[100px]">
				<Image
					src="/images/logo.svg"
					width={95}
					height={26}
					alt="logo"
					className="object-contain hidden md:block"
				/>
				<Image
					src="/images/logo.svg"
					width={45}
					height={12.32}
					alt="logo"
					className="object-contain max-md:hidden mb-5"
				/>
				<div className="rounded-[40px] bg-white bg-opacity-[8%] flex items-center max-md:justify-between md:gap-6 p-2 md:p-6">
					<Image
						src="/icons/leaf.svg"
						width={32}
						height={32}
						alt="leaf"
						className="object-contain hidden md:block"
					/>
					<Image
						src="/icons/leaf.svg"
						width={24}
						height={24}
						alt="leaf"
						className="object-contain md:hidden"
					/>
					<p className="text-white text-[10px] md:text-base max-md:w-[149px] max-md:truncate">
						At Miles, we dedicate 1% of our revenues to eliminating carbon
						dioxide.
					</p>
					<Link
						href="#"
						className="text-xs text-dark_green rounded-[28px] md;font-medium bg-green-500 py-4 px-6 w-fit"
					>
						Learn more
					</Link>
				</div>
			</div>
			<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-md:gap-[43px] mb-5 md:mb-[61px]">
				<div className="flex flex-col gap-y-[43px] md:gap-y-[53px]">
					<div className="flex flex-col gap-y-4">
						<p className="text-xs md:text-lg text-green-500 font-medium">
							Teams
						</p>
						{teams.map((team) => (
							<Link
								key={team.name}
								href={team.link}
								className="text-xs md:text-base md:font-medium text-white"
							>
								{team.name}
							</Link>
						))}
					</div>
					<div className="flex flex-col gap-y-4">
						<p className="text-xs md:text-lg text-green-500 font-medium">
							Use cases
						</p>
						{useCases.map((team) => (
							<Link
								key={team.name}
								href={team.link}
								className="text-xs md:text-base md:font-medium text-white"
							>
								{team.name}
							</Link>
						))}
					</div>
				</div>
				<div className="flex flex-col gap-y-4">
					<p className="text-xs md:text-lg text-green-500 font-medium">
						Product
					</p>
					{products.map((team) => (
						<Link
							key={team.name}
							href={team.link}
							className="text-xs md:text-base md:font-medium text-white"
						>
							{team.name}
						</Link>
					))}
				</div>
				<div className="flex flex-col gap-y-4">
					<p className="text-xs md:text-lg text-green-500 font-medium">
						Resources
					</p>
					{resources.map((team) => (
						<Link
							key={team.name}
							href={team.link}
							className="text-xs md:text-base md:font-medium text-white"
						>
							{team.name}
						</Link>
					))}
				</div>
				<div className="flex flex-col gap-y-4">
					<p className="text-xs md:text-lg text-green-500 font-medium">
						Contact
					</p>
					{contact.map((team) => (
						<Link
							key={team.name}
							href={team.link}
							className="text-xs md:text-base md:font-medium text-white"
						>
							{team.name}
						</Link>
					))}
				</div>
			</div>
			<div className="flex items-center flex-wrap max-md:justify-between md:gap-x-[23px]">
				<p className="text-xs md:text-base font-medium text-white/50">
					© {new Date().getFullYear()} Miles
				</p>
				<Link
					href="#terms"
					className="text-xs md:text-base font-medium text-white/50"
				>
					Terms & conditions
				</Link>
				<Link
					href="#privacy"
					className="text-xs md:text-base font-medium text-white/50"
				>
					Privacy
				</Link>
				<Link
					href="#cookies"
					className="text-xs md:text-base font-medium text-white/50"
				>
					🍪 Cookies
				</Link>
			</div>
		</footer>
	);
}
