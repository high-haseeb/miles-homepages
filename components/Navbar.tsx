"use client";
import { useState } from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { ChevronRight, CircleX, Bell, ChevronDown } from "lucide-react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import MenuIcon from "@/components/vectors/MenuIcon";
import ProfileIcon from "./vectors/ProfileIcon";
import DashboardIcon from "./vectors/DashboardIcon";
import RentalsIcon from "./vectors/RentalsIcon";
import LogoutIcon from "./vectors/LogoutIcon";
import Notifications from "./Notifications";
import { useAppContext } from "@/context/AppContext";

export default function Navbar() {
  const [showDropdown, setShowDropdown] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const { handleLogout, userData, isLoggedIn } = useAppContext();

  function handleClick() {
    if (!isLoggedIn) router.push("/login");
    else if (pathname === "/") router.push("/renter");
    else router.push("/manage-listings/list-item");
  }

  return (
    <nav className="md:fixed md:left-1/2 md:top-5 md:-translate-x-1/2 container mx-auto md:max-w-[730px] xl:max-w-[823px] bg-transparent md:bg-white max-md:mb-[29px] border-none md:border-[0.5px] md:border-gray-2 flex items-center justify-between md:rounded-[50px] md:py-2.5 md:px-[15px] z-20">
      <Image
        src="/images/logo.svg"
        width={95}
        height={26}
        alt="logo"
        className="object-contain hidden sm:block"
      />
      <Image
        src="/images/logo.svg"
        width={45}
        height={12.32}
        alt="logo"
        className="object-contain sm:hidden"
      />
      <Sheet>
        <SheetTrigger asChild>
          <button className="p-0.5 border-none bg-transparent sm:hidden">
            <MenuIcon />
          </button>
        </SheetTrigger>
        <SheetContent side="top" className="h-fit w-full rounded-b-[25px]">
          <div className="mb-5 flex items-center justify-between">
            <Image
              src="/images/logo.svg"
              width={45}
              height={12.32}
              alt="logo"
              className="object-contain sm:hidden"
            />
            <SheetClose asChild>
              <CircleX width={24} height={24} />
            </SheetClose>
          </div>
          <div className="flex flex-col">
            <button
              onClick={handleClick}
              className="font-medium text-slate-900 text-sm flex items-center justify-between py-5 border-b"
            >
              List an item
              <ChevronRight width={20} height={20} />
            </button>
            <Link
              href="#how-it-works"
              className="font-medium text-slate-900 text-sm flex items-center justify-between py-5 border-b"
            >
              How it works
              <ChevronRight width={20} height={20} />
            </Link>
          </div>

          {isLoggedIn ? (
            <div className="flex flex-col mb-9">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="font-medium text-slate-900 border-b text-sm flex items-center justify-between h-auto py-5 bg-transparent w-full">
                    Notification
                    <span className="sr-only">Toggle notifications</span>
                  </button>
                </DropdownMenuTrigger>
                <Notifications />
              </DropdownMenu>
              <DropdownMenu>
                <DropdownMenuTrigger asChild className="self-start">
                  <button
                    onClick={() => setShowDropdown((prev) => !prev)}
                    className="bg-transparent items-center border-b font-medium text-slate-900 text-sm py-3 flex space-x-3.5 w-full"
                  >
                    <Avatar className="size-[42px] rounded-full">
                      <AvatarImage
                        src={userData?.image_url || ""}
                        alt="photo"
                      />
                      <AvatarFallback>
                        <ProfileIcon />
                      </AvatarFallback>
                    </Avatar>
                    <p className="">{userData?.first_name || ""}</p>
                    <ChevronDown className="text-slate-800 hidden sm:block" />
                    <span className="sr-only">Toggle user menu</span>
                  </button>
                </DropdownMenuTrigger>
                <div
                  className={`flex flex-col gap-5 w-full mt-5 ${
                    showDropdown ? "h-auto" : "hidden"
                  }`}
                >
                  <div className="w-full py-2 px-3">
                    <Link
                      href="/bookings"
                      className="flex items-center gap-x-2"
                    >
                      <RentalsIcon /> My Rentals
                    </Link>
                  </div>
                  <div className="w-full py-2 px-3">
                    <Link
                      href="/dashboard"
                      className="flex items-center gap-x-2"
                    >
                      <DashboardIcon /> Dashboard
                    </Link>
                  </div>
                  <div className="w-full py-2 px-3">
                    <Link href="/profile" className="flex items-center gap-x-2">
                      <ProfileIcon />
                      Profile
                    </Link>
                  </div>
                  <div
                    className="w-full py-2 px-3 flex items-center cursor-pointer gap-x-2"
                    onClick={() => {
                      handleLogout();
                      router.push("/login");
                    }}
                  >
                    <LogoutIcon /> Logout
                  </div>
                </div>
              </DropdownMenu>
            </div>
          ) : (
            <div className="flex flex-col gap-y-5">
              <Link
                href="/signup"
                className="py-3.5 px-10 text-white text-sm text-center bg-green-500 rounded-[38px] font-medium"
              >
                Sign up
              </Link>
              <Link
                href="/login"
                className="py-3.5 px-10 rounded-[38px] text-sm text-center font-medium text-slate-400"
              >
                Login
              </Link>
            </div>
          )}
        </SheetContent>
      </Sheet>
      <div className="hidden md:flex items-center gap-10 gap-x-6">
        <button
          onClick={handleClick}
          className="font-medium text-slate-900 hover:text-green-500 py-3 px-2"
        >
          List an item
        </button>
        <Link
          href="#how-it-works"
          className="font-medium text-slate-900 hover:text-green-500 py-3 px-2"
        >
          How it works
        </Link>
      </div>
      <div className="hidden md:flex items-center gap-x-[5px]">
        {isLoggedIn ? (
          <>
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
                    <AvatarFallback>
                      <ProfileIcon />
                    </AvatarFallback>
                  </Avatar>
                  <p className="font-bold ml-3.5 text-slate-800 hidden sm:block">
                    {userData?.first_name || ""}
                  </p>
                  <ChevronDown className="text-slate-800 hidden sm:block" />
                  <span className="sr-only">Toggle user menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="center"
                className="flex flex-col gap-6 px-10 py-[30px] rounded-[20px] mr-3"
              >
                <DropdownMenuItem className="w-full justify-center cursor-pointer">
                  <Link href="/bookings" className="flex items-center gap-x-2">
                    <RentalsIcon /> My Rentals
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="w-full justify-center cursor-pointer">
                  <Link href="/dashboard" className="flex items-center gap-x-2">
                    <DashboardIcon /> Dashboard
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="w-full justify-center cursor-pointer">
                  <Link href="/profile" className="flex items-center gap-x-2">
                    <ProfileIcon />
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="w-full justify-center cursor-pointer gap-x-2"
                  onClick={() => {
                    handleLogout();
                    router.push("/login");
                  }}
                >
                  <LogoutIcon /> Logout
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:!bg-transparent">
                  <Link
                    href={pathname === "/renting" ? "/bookings" : "/renting"}
                    className="py-3 px-9 rounded-[38px] bg-green-500 w-fit text-white"
                  >
                    Switch to {pathname === "/renting" ? "Lister" : "Renter"}
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        ) : (
          <>
            <Link
              href="/login"
              className="py-3 px-10 rounded-[38px] font-medium text-slate-900 hover:text-green-500"
            >
              Login
            </Link>
            <Link
              href="/signup"
              className="py-3 px-10 text-white bg-green-500 hover:bg-green-700 rounded-[38px] font-medium"
            >
              Sign up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
