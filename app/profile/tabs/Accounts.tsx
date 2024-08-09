"use client";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import VerifiedIcon from "@/components/vectors/VerifiedIcon";
import UpdateEmail from "../modals/UpdateEmail";
import UpdateName from "../modals/UpdateName";
import VerifyPhoneNumber from "../modals/VerifyPhoneNumber";
import VerifyUserIdentity from "../modals/VerifyUserIdentity";

export default function Accounts() {
  const [openPhoneVerif, setOpenPhoneVerif] = useState(false);
  const [openEmailVerif, setOpenEmailVerif] = useState(false);
  const [openIDVerif, setOpenIDVerif] = useState(false);
  const [openNameVerif, setOpenNameVerif] = useState(false);

  return (
    <>
      <div className="flex flex-col py-[30px]">
        <div className="h-[100px] flex items-center gap-x-[135px]">
          <p className="w-[135px] font-medium text-slate-900">Profile Photo</p>
          <div className="flex items-center">
            <Avatar className="w-[70px] h-[70px] mr-[25px]">
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <button className="py-3 px-4 border-none text-sm text-slate-300 mr-2.5 font-medium">
              Remove
            </button>
            <button className="py-3 px-4 border-none text-sm text-green-500 font-medium">
              Update
            </button>
          </div>
        </div>
        <div className="h-[100px] flex items-center gap-x-[135px]">
          <p className="w-[135px] font-medium text-slate-900">
            First & Last Name
          </p>
          <div className="flex items-center">
            <Input
              className="py-3 px-4 text-sm text-slate-900 mr-[25px] h-auto"
              value="Femi"
              disabled
            />
            <Input
              className="py-3 px-4 text-sm text-slate-900 mr-2.5 h-auto"
              value="Lawal"
              disabled
            />
            <button
              onClick={() => setOpenNameVerif(true)}
              className="py-3 px-4 border-none text-xs text-orange-600 font-medium underline"
            >
              (Edit)
            </button>
          </div>
        </div>
        <div className="h-[100px] flex items-center gap-x-[135px]">
          <p className="w-[135px] font-medium text-slate-900">Phone Number</p>
          <div className="flex items-center">
            <Input
              className="py-3 px-4 text-sm text-slate-900 mr-2.5 h-auto"
              value="07034753927"
              disabled
            />
            <div className="flex items-center gap-1">
              <VerifiedIcon />
              <p className="text-xs text-slate-900 font-medium">Verified</p>
              <button
                onClick={() => setOpenPhoneVerif(true)}
                className="py-3 px-4 border-none text-xs text-orange-600 font-medium underline"
              >
                (Edit)
              </button>
            </div>
          </div>
        </div>
        <div className="h-[100px] flex items-center gap-x-[135px]">
          <p className="w-[135px] font-medium text-slate-900">Email</p>
          <div className="flex items-center">
            <Input
              className="py-3 px-4 text-sm text-slate-900 mr-2.5 h-auto"
              value="Femi.lawal@gmail.com"
              disabled
            />
            <div className="flex items-center gap-1">
              <VerifiedIcon />
              <p className="text-xs text-slate-900 font-medium">Verified</p>
              <button
                onClick={() => setOpenEmailVerif(true)}
                className="py-3 px-4 border-none text-xs text-orange-600 font-medium underline"
              >
                (Edit)
              </button>
            </div>
          </div>
        </div>
        <div className="h-[100px] flex items-center gap-x-[135px]">
          <p className="w-[135px] font-medium text-slate-900">
            Proof of Identity
          </p>
          <div className="flex items-center">
            <Input
              className="py-3 px-4 text-sm text-slate-900 mr-2.5 h-auto w-16"
              value="NIN"
              disabled
            />
            <div className="flex items-center gap-1 w-full">
              <VerifiedIcon notVerified />
              <p className="text-xs text-error font-medium">Not Verified</p>
              <button
                onClick={() => setOpenIDVerif(true)}
                className="py-3 px-4 border-none text-xs text-slate9600 font-medium"
              >
                (Click to reverify)
              </button>
            </div>
          </div>
        </div>
      </div>
      <UpdateEmail
        openModal={openEmailVerif}
        handleOpenModal={setOpenEmailVerif}
      />
      <UpdateName
        openModal={openNameVerif}
        handleOpenModal={setOpenNameVerif}
      />
      <VerifyPhoneNumber
        openModal={openPhoneVerif}
        handleOpenModal={setOpenPhoneVerif}
      />
      <VerifyUserIdentity
        openModal={openIDVerif}
        handleOpenModal={setOpenIDVerif}
      />
    </>
  );
}
