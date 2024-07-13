import Image from "next/image";
import Link from "next/link";

import MenuIcon from "@/components/vectors/MenuIcon";

export default function Navbar() {
	return (
		<nav className="md:fixed md:left-1/2 md:top-5 md:-translate-x-1/2 max-w-[802px] mx-auto w-full bg-transparent md:bg-white max-md:mb-[29px] border-none md:border-[0.5px] md:border-gray-2 flex items-center justify-between md:rounded-[50px] md:py-2.5 md:px-[15px] z-20">
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
				className="object-contain md:hidden"
			/>
			<button className="p-0.5 border-none bg-transparent md:hidden">
				<MenuIcon />
			</button>
			<div className="hidden md:flex items-center gap-10 gap-x-6">
				<Link
					href="/list-item"
					className="font-medium text-slate-900 py-3 px-2"
				>
					List an item
				</Link>
				<Link
					href="/how-it-works"
					className="font-medium text-slate-900 py-3 px-2"
				>
					How it works
				</Link>
			</div>
			<div className="hidden md:flex items-center gap-x-[5px]">
				<Link
					href="/login"
					className="py-3 px-10 rounded-[38px] font-medium text-slate-900"
				>
					Login
				</Link>
				<Link
					href="/signup"
					className="py-3 px-10 text-white bg-green-500 rounded-[38px] font-medium"
				>
					Sign up
				</Link>
			</div>
		</nav>
	);
}
