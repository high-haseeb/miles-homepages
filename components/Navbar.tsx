"use client";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { ChevronRight, CircleX } from "lucide-react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

import MenuIcon from "@/components/vectors/MenuIcon";
import { useAuth } from "@/hooks";

export default function Navbar() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const authenticated = isAuthenticated();

  function handleClick() {
    if (!authenticated) router.push("/login");
    else if (pathname === "/") router.push("/renter");
    else router.push("/manage-listings/list-item");
  }
  return (
    <nav className="md:fixed md:left-1/2 md:top-5 md:-translate-x-1/2 max-w-[802px] mx-auto w-full bg-transparent md:bg-white max-md:mb-[29px] border-none md:border-[0.5px] md:border-gray-2 flex items-center justify-between md:rounded-[50px] md:py-2.5 md:px-[15px] z-20">
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
          <div className="flex flex-col divide-y mb-9">
            <button
              onClick={handleClick}
              className="pb-5 font-medium text-slate-900 text-sm flex items-center justify-between py-5"
            >
              List an item
              <ChevronRight width={20} height={20} />
            </button>
            <Link
              href="#how-it-works"
              className="pb-5 font-medium text-slate-900 text-sm flex items-center justify-between py-5"
            >
              How it works
              <ChevronRight width={20} height={20} />
            </Link>
          </div>
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
      </div>
    </nav>
  );
}
