"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
	Bell,
	CircleUser,
	Home,
	Menu,
	Package,
	Search,
	ShoppingCart,
	Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export default function DashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const pathname = usePathname();
	return (
		<div className="grid min-h-screen md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr] h-screen w-screen">
			<div className="hidden border-r bg-white md:block">
				<div className="flex h-full max-h-screen flex-col">
					<div className="flex pt-9 items-center px-4 lg:px-6 mb-16">
						<Link href="/">
							<Image
								src="/images/logo.svg"
								width={95}
								height={26}
								alt="logo"
								className="object-contain hidden md:block"
							/>
						</Link>
						<Button variant="outline" size="icon" className="ml-auto h-8 w-8">
							<Bell className="h-4 w-4" />
							<span className="sr-only">Toggle notifications</span>
						</Button>
					</div>
					<div className="">
						<nav className="grid gap-2 items-start px-2 text-sm font-medium lg:px-4">
							<Link
								href="/dashboard"
								className={`flex ${
									pathname === "/dashboard"
										? "bg-orange-50 text-orange-500"
										: "text-slate-400"
								} items-center gap-2 rounded-lg px-4 py-2 text-sm transition-all hover:text-orange-500`}
							>
								<Home className="h-4 w-4" />
								Dashboard
							</Link>
							<Link
								href="/bookings"
								className={`flex ${
									pathname === "/bookings"
										? "bg-orange-50 text-orange-500"
										: "text-slate-400"
								} items-center gap-2 rounded-lg px-4 py-2 text-sm transition-all hover:text-orange-500`}
							>
								<ShoppingCart className="h-4 w-4" />
								Bookings
							</Link>
							<Link
								href="/listings"
								className={`flex ${
									pathname === "/listings"
										? "bg-orange-50 text-orange-500"
										: "text-slate-400"
								} items-center gap-2 rounded-lg px-4 py-2 text-sm transition-all hover:text-orange-500`}
							>
								<Users className="h-4 w-4" />
								Listings
							</Link>
						</nav>
					</div>
					<div className="mt-4 ml-6 py-3.5 px-2.5">
						<Link
							href="/renting"
							className="py-1 px-5 rounded-[38px] bg-green-500 w-fit text-white"
						>
							Switch to Renting
						</Link>
					</div>
				</div>
			</div>
			<div className="flex flex-col h-screen">
				<header className="flex h-14 items-center gap-2 border-b bg-white px-4 lg:h-[86px] lg:px-6">
					<Sheet>
						<SheetTrigger asChild>
							<Button
								variant="outline"
								size="icon"
								className="shrink-0 md:hidden"
							>
								<Menu className="h-5 w-5" />
								<span className="sr-only">Toggle navigation menu</span>
							</Button>
						</SheetTrigger>
						<SheetContent side="left" className="flex flex-col">
							<nav className="grid gap-2 text-lg font-medium">
								<Link href="#">
									<Image
										src="/images/logo.svg"
										width={45}
										height={12.32}
										alt="logo"
										className="object-contain md:hidden"
									/>
								</Link>
								<Link
									href="#"
									className="mx-[-0.65rem] flex items-center gap-2 rounded-xl px-4 py-2 text-slate-400 text-sm hover:text-foreground"
								>
									<Home className="h-5 w-5" />
									Dashboard
								</Link>
								<Link
									href="#"
									className="mx-[-0.65rem] flex items-center gap-2 rounded-xl bg-orange-50 px-4 py-2 text-orange-500 hover:text-foreground"
								>
									<ShoppingCart className="h-5 w-5" />
									Bookings
								</Link>
								<Link
									href="#"
									className="mx-[-0.65rem] flex items-center gap-2 rounded-xl px-4 py-2 text-slate-400 text-sm hover:text-foreground"
								>
									<Package className="h-5 w-5" />
									Listings
								</Link>
							</nav>
							<div className="mt-4 py-3.5 px-2.5">
								<Link
									href="/renting"
									className="py-1 px-4 rounded-[38px] bg-green-500 w-fit text-white"
								>
									Switch to Renting
								</Link>
							</div>
						</SheetContent>
					</Sheet>
					<div className="w-full flex-1">
						<form>
							<div className="relative">
								<Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400 text-sm" />
								<Input
									type="search"
									placeholder="Search products..."
									className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
								/>
							</div>
						</form>
					</div>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="secondary" size="icon" className="rounded-full">
								<CircleUser className="h-5 w-5" />
								<span className="sr-only">Toggle user menu</span>
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end">
							<DropdownMenuLabel>My Account</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<DropdownMenuItem>Settings</DropdownMenuItem>
							<DropdownMenuItem>Support</DropdownMenuItem>
							<DropdownMenuSeparator />
							<DropdownMenuItem>Logout</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</header>
				<main className="flex flex-1 flex-col gap-2 p-4 lg:gap-[30px] lg:p-[25px] lg:px-[30px] bg-pearl-400 overflow-y-auto overflow-x-hidden">
					{children}
				</main>
			</div>
		</div>
	);
}
