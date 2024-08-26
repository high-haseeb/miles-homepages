"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Menu,
  Search,
  CalendarDays,
  ClipboardList,
  LayoutGrid,
  Bell,
  ChevronDown,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import { useAppContext } from "@/context/AppContext";
import ProfileIcon from "../vectors/ProfileIcon";
import DashboardIcon from "../vectors/DashboardIcon";
import RentalsIcon from "../vectors/RentalsIcon";
import LogoutIcon from "../vectors/LogoutIcon";
import Notifications from "../Notifications";
import VerificationModal from "../Modals/VerificationModal";
import { DashboardLayoutProps } from "@/types";

interface DashboardLayout2Props extends DashboardLayoutProps {
  noPaddingY?: boolean;
}

export default function DashboardLayout2({
  children,
  noPaddingY,
  handleSearchSubmit,
  handleSearchChange,
  searchValue,
}: DashboardLayout2Props) {
  const pathname = usePathname();
  const router = useRouter();

  const { handleLogout, isVerified, userData } = useAppContext();
  const [openVerifModal, setOpenVerifModal] = useState(false);

  useEffect(() => {
    const showVerifModal = sessionStorage.getItem("showVerifModal");
    if (!showVerifModal && !isVerified) {
      setTimeout(() => {
        setOpenVerifModal(true);
      }, 5000);
      sessionStorage.setItem("showVerifModal", "show");
    }
  }, [isVerified]);

  return (
    <div className="flex flex-col h-screen w-screen">
      <header className="flex h-14 items-center gap-2 border-b bg-white px-4 lg:h-[86px] lg:px-6">
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="shrink-0 md:hidden border-none"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent
            side="left"
            className="flex flex-col rounded-r-[60px] py-[127px]"
          >
            <nav className="grid gap-2.5 text-lg font-medium">
              <Link href="/">
                <Image
                  src="/images/logo.svg"
                  width={81}
                  height={22}
                  alt="logo"
                  className="object-contain md:hidden mb-12"
                />
              </Link>
              <Link
                href="/dashboard"
                className={`flex ${
                  pathname.includes("/dashboard")
                    ? "bg-orange-50 text-orange-500"
                    : "text-slate-400"
                } items-center gap-2 rounded-xl mx-[-0.65rem] px-4.5 py-3 text-sm transition-all hover:text-orange-500`}
              >
                <LayoutGrid className="h-5 w-5" />
                Dashboard
              </Link>
              <Link
                href="/bookings"
                className={`flex ${
                  pathname.includes("/bookings")
                    ? "bg-orange-50 text-orange-500"
                    : "text-slate-400"
                } items-center gap-2 rounded-xl mx-[-0.65rem] px-4.5 py-3 text-sm transition-all hover:text-orange-500`}
              >
                <CalendarDays className="h-5 w-5" />
                Bookings
              </Link>
              <Link
                href="/manage-listings"
                className={`flex ${
                  pathname.includes("/manage-listings")
                    ? "bg-orange-50 text-orange-500"
                    : "text-slate-400"
                } items-center gap-2 rounded-xl mx-[-0.65rem] px-4.5 py-3 text-sm transition-all hover:text-orange-500`}
              >
                <ClipboardList className="h-5 w-5" />
                Listings
              </Link>
            </nav>
            <div className="mt-4 py-3.5 px-2.5">
              <Link
                href={pathname === "/renting" ? "/bookings" : "/renting"}
                className="py-3 px-5 rounded-[38px] bg-green-500 w-full sm:w-fit text-white"
              >
                Switch to {pathname === "/renting" ? "Lister" : "Renter"}
              </Link>
            </div>
          </SheetContent>
        </Sheet>
        <div className="flex items-center sm:gap-x-[50px] w-full flex-1">
          <Link href="/">
            <Image
              src="/images/logo.svg"
              width={95}
              height={26}
              alt="logo"
              className="object-contain hidden md:block"
            />
          </Link>
          <form className="w-full" onSubmit={handleSearchSubmit}>
            <Link href="/listings" className="relative block w-full">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400 text-sm" />
              <Input
                type="search"
                value={searchValue}
                onChange={handleSearchChange}
                placeholder="Search products..."
                className="w-full appearance-none rounded-[39px] bg-background pl-8 shadow-none md:w-2/3 max-w-[346px] outline-none ring-0 ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0"
              />
            </Link>
          </form>
        </div>
        <div className="hidden sm:flex items-center gap-x-9 mr-[176px]">
          <Link
            href="/manage-listings/list-item"
            className="text-slate-900 hover:text-green-500"
          >
            List an item
          </Link>
          <Link
            href="#how-it-works"
            className="text-slate-900 hover:text-green-500"
          >
            How it works
          </Link>
        </div>
        <div className="flex items-center gap-x-11">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                size="icon"
                variant="ghost"
                className="ml-auto hidden sm:block text-[#394455] p-2 bg-transparent"
              >
                <Bell className="h-6 w-6" />
                <span className="sr-only">Toggle notifications</span>
              </Button>
            </DropdownMenuTrigger>
            <Notifications />
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild className="flex items-center gap-1">
              <Button className="bg-transparent hover:bg-transparent text-slate-800">
                <Avatar className="w-[42px] h-[42px] rounded-full">
                  <AvatarImage src={userData?.image_url || ""} alt="photo" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <p className="font-bold ml-3.5 text-slate-800 hidden sm:block">
                  {userData?.first_name || ""}
                </p>
                <ChevronDown className="text-slate-800 hidden sm:block" />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="flex flex-col gap-6 px-2 py-4"
            >
              <DropdownMenuItem className="px-4 cursor-pointer">
                <Link href="/bookings" className="flex items-center gap-x-2">
                  <RentalsIcon /> My Rentals
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="px-4 cursor-pointer">
                <Link href="/dashboard" className="flex items-center gap-x-2">
                  <DashboardIcon /> Dashboard
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="px-4 cursor-pointer">
                <Link href="/profile" className="flex items-center gap-x-2">
                  <ProfileIcon />
                  Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="flex items-center gap-x-2 px-4 cursor-pointer"
                onClick={() => {
                  handleLogout();
                  router.push("/");
                }}
              >
                <LogoutIcon /> Logout
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-transparent">
                <Link
                  href={pathname === "/renting" ? "/bookings" : "/renting"}
                  className="py-1 px-4 rounded-[38px] bg-green-500 w-fit text-white"
                >
                  Switch to {pathname === "/renting" ? "Lister" : "Renter"}
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
      <main
        className={`flex flex-1 flex-col gap-[25px] p-5 sm:p-6 lg:gap-[30px] ${
          noPaddingY ? "lg:py-0" : "lg:py-[25px]"
        } lg:px-[30px] bg-pearl-400 overflow-y-auto overflow-x-hidden`}
      >
        {children}
      </main>
      <VerificationModal
        openModal={openVerifModal}
        handleOpenModal={setOpenVerifModal}
      />
    </div>
  );
}
