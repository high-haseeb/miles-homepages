"use client";
import { SetStateAction, Dispatch, FormEvent } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { useToast } from "@/components/ui/use-toast";

interface VerificationModalProps {
  openModal: boolean;
  handleOpenModal: Dispatch<SetStateAction<boolean>>;
}

export default function UpdateName({
  openModal,
  handleOpenModal,
}: VerificationModalProps) {
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <Dialog open={openModal} onOpenChange={handleOpenModal} defaultOpen={false}>
      <DialogContent className="py-9 px-[30px] rounded-[14px] max-w-[545px] bg-white flex flex-col">
        <div className="mb-8 flex flex-col gap-1">
          <h3 className="font-bold text-slate-9 text-2xl">Update your Name</h3>
          <p className="text-sm text-slate-200">
            Please enter your name as it appears on your ID
          </p>
        </div>
        <div className="w-full flex flex-col">
          <form className="flex flex-col gap-y-[35px]" onSubmit={onSubmit}>
            <Input
              className="h-auto outline-none ring-0 ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0 py-3 px-4"
              placeholder="First name"
              name="first_name"
            />
            <Input
              className="h-auto outline-none ring-0 ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0 py-3 px-4"
              placeholder="Last name"
              name="last_name"
            />
            <button className="mt-[60px] py-3 px-4 text-center w-full rounded-[38px] text-white bg-green-500 font-medium disabled:bg-green-200">
              Update
            </button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
