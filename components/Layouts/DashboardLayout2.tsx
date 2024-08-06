"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  CircleUser,
  Home,
  Menu,
  Package,
  Search,
  ShoppingCart,
  Bell,
} from "lucide-react";

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

  const { handleLogout, isVerified } = useAppContext();
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
        <div className="flex items-center gap-x-[50px] w-full flex-1">
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
            <div className="relative w-full">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400 text-sm" />
              <Input
                type="search"
                value={searchValue}
                onChange={handleSearchChange}
                placeholder="Search products..."
                className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 rounded-[39px] max-w-[346px]"
              />
            </div>
          </form>
        </div>
        <div className="flex items-center gap-x-9 mr-[176px]">
          <Link
            href="/manage-listings/list-item"
            className="text-slate-900 hover:text-green-500"
          >
            List an item
          </Link>
          <Link href="#" className="text-slate-900 hover:text-green-500">
            How it works
          </Link>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              size="icon"
              className="ml-auto text-[#394455] h-8 w-8 hover:bg-transparent bg-transparent mr-11"
            >
              <Bell className="h-6 w-6" />
              <span className="sr-only">Toggle notifications</span>
            </Button>
          </DropdownMenuTrigger>
          <Notifications />
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="icon" className="rounded-full">
              <CircleUser className="h-5 w-5" />
              <span className="sr-only">Toggle user menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="flex flex-col gap-6 px-2 py-4"
          >
            <DropdownMenuItem className="flex items-center gap-x-2 px-4 cursor-pointer">
              <RentalsIcon /> My Rentals
            </DropdownMenuItem>
            <DropdownMenuItem className="px-4 cursor-pointer">
              <Link href="/dashboard" className="flex items-center gap-x-2">
                <DashboardIcon /> Dashboard
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex items-center gap-x-2 px-4 cursor-pointer">
              <ProfileIcon />
              Profile
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
                href="/renting"
                className="py-1 px-4 rounded-[38px] bg-green-500 w-fit text-white"
              >
                Switch to Renting
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>
      <main
        className={`flex flex-1 flex-col gap-2 p-4 lg:gap-[30px] ${
          noPaddingY ? "lg:py-0" : "lg:py-[25px]"
        } lg:p-[25px] lg:px-[30px] bg-pearl-400 overflow-y-auto overflow-x-hidden`}
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
