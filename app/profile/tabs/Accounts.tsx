"use client";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

import VerifiedIcon from "@/components/vectors/VerifiedIcon";
import UpdateEmail from "../modals/UpdateEmail";
import UpdateName from "../modals/UpdateName";
import VerifyPhoneNumber from "../modals/VerifyPhoneNumber";
import VerifyUserIdentity from "../modals/VerifyUserIdentity";
import { useAppContext } from "@/context/AppContext";
import UpdateProfilePicture from "../modals/UpdateProfilePicture";
import LeftArrow from "@/components/vectors/LeftArrow";
import CustomFormField from "@/components/forms/CustomFormField";
import { FormFieldType } from "@/types";

const editProfileFormSchema = z.object({
  firstName: z
    .string()
    .min(2, { message: "First name must be at least 2 characters." }),
  lastName: z
    .string()
    .min(2, { message: "Last name must be at least 2 characters." }),
  email: z.string().email("Invalid email format."),
});

export default function Accounts({ clearTab }: { clearTab?: () => void }) {
  const [openPhoneVerif, setOpenPhoneVerif] = useState(false);
  const [openEmailVerif, setOpenEmailVerif] = useState(false);
  const [openIDVerif, setOpenIDVerif] = useState(false);
  const [openNameVerif, setOpenNameVerif] = useState(false);
  const [openUploadModal, setOpenUploadModal] = useState(false);
  const { userData } = useAppContext();

  const form = useForm<z.infer<typeof editProfileFormSchema>>({
    resolver: zodResolver(editProfileFormSchema),
    defaultValues: {
      email: userData?.email || "",
      firstName: userData?.first_name || "",
      lastName: userData?.last_name || "",
    },
  });

  const onSubmit = async (values: z.infer<typeof editProfileFormSchema>) => {};

  return (
    <>
      <div className="hidden sm:flex flex-col py-[30px]">
        <div className="h-[100px] flex items-center gap-x-[135px]">
          <p className="w-[135px] font-medium text-slate-900">Profile Photo</p>
          <div className="flex items-center">
            <Avatar className="w-[70px] h-[70px] mr-[25px]">
              <AvatarImage src={userData?.image_url || ""} alt="profile-pic" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <button className="py-3 px-4 border-none text-sm text-slate-300 mr-2.5 font-medium">
              Remove
            </button>
            <button
              className="py-3 px-4 border-none text-sm text-green-500 font-medium"
              onClick={() => setOpenUploadModal(true)}
            >
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
              value={userData?.first_name}
              disabled
            />
            <Input
              className="py-3 px-4 text-sm text-slate-900 mr-2.5 h-auto"
              value={userData?.last_name}
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
              value={userData?.phone_number || ""}
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
              value={userData?.email}
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
              <VerifiedIcon notVerified={!userData?.identity_verified} />
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
      <div className="sm:hidden">
        <div
          className="sm:hidden flex items-center gap-x-4.5"
          onClick={clearTab}
        >
          <LeftArrow />
          <span className="text-slate-900 text-sm font-bold">Edit profile</span>
        </div>
        <div className="flex flex-col gap-y-5 mt-[30px]">
          <div className="self-center flex flex-col items-center gap-y-2.5">
            <Avatar className="w-[90px] h-[90px]">
              <AvatarImage src={userData?.image_url || ""} alt="profile-pic" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="flex items-center gap-2.5">
              <button className="py-3 px-4 border-none text-sm text-slate-300 mr-2.5 font-medium">
                Remove
              </button>
              <button
                className="py-3 px-4 border-none text-sm text-green-500 font-medium"
                onClick={() => setOpenUploadModal(true)}
              >
                Update
              </button>
            </div>
          </div>
          <Form {...form}>
            <form
              className="flex flex-col gap-y-[15px]"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <CustomFormField
                control={form.control}
                name="firstName"
                fieldType={FormFieldType.INPUT}
                label="First name"
                className="p-4 rounded-lg"
              />
              <CustomFormField
                control={form.control}
                name="lastName"
                fieldType={FormFieldType.INPUT}
                label="Last name"
                className="p-4 rounded-lg"
              />
              <CustomFormField
                control={form.control}
                name="email"
                fieldType={FormFieldType.INPUT}
                label="Email"
                className="p-4 rounded-lg"
              />
            </form>
            <div className="flex flex-col">
              <p className="text-black font-medium mb-2 text-sm">
                Phone Number
              </p>
              <button
                type="button"
                className="p-4 text-sm text-slate-900 bg-white rounded-lg border text-left"
                onClick={() => setOpenPhoneVerif(true)}
              >
                {userData?.phone_number || ""}
              </button>
            </div>
            <div className="flex flex-col">
              <p className="text-black font-medium mb-2 text-sm">
                Proof of Identity
              </p>
              <button
                type="button"
                className="p-4 text-sm text-slate-900 bg-white rounded-lg border text-left"
                onClick={() => setOpenIDVerif(true)}
              >
                NIN
              </button>
            </div>
            <Button
              type="submit"
              // disabled={mutation.isPending}
              className="mt-[37px] w-full disabled:bg-green-200 text-teal-50 font-medium bg-green-500 py-3 px-4 rounded-[38px]"
            >
              Update
            </Button>
          </Form>
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
      <UpdateProfilePicture
        openModal={openUploadModal}
        handleOpenModal={setOpenUploadModal}
      />
    </>
  );
}
