import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
	return (
		<nav className="md:fixed md:left-1/2 md:top-5 md:-translate-x-1/2 max-w-[802px] mx-auto w-full bg-transparent md:bg-white border-none md:border-[0.5px] border-gray-2 flex items-center justify-between md:rounded-[50px] py-2.5 px-[15px]">
			<Image
				src="/images/logo.svg"
				width={95}
				height={26}
				alt="logo"
				className="object-contain"
			/>
			<div className="flex items-center gap-10 gap-x-6">
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
			<div className="flex items-center gap-x-[5px]">
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
