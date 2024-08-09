"use client";
import { useState, SetStateAction, Dispatch } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { useToast } from "@/components/ui/use-toast";

import { PhoneNumber } from "@/components/Modals/VerificationModal";

interface VerificationModalProps {
  openModal: boolean;
  handleOpenModal: Dispatch<SetStateAction<boolean>>;
}

export default function VerifyPhoneNumber({
  openModal,
  handleOpenModal,
}: VerificationModalProps) {
  const [date, setDate] = useState<Date>();

  return (
    <Dialog open={openModal} onOpenChange={handleOpenModal} defaultOpen={false}>
      <DialogContent className="py-9 px-[30px] rounded-[14px] max-w-[545px] bg-white flex flex-col">
        <div className="mb-8 flex flex-col gap-1">
          <h3 className="font-bold text-slate-9 text-2xl">
            Update your Phone Number
          </h3>
          <p className="text-sm text-slate-200">
            We’ll send a code for verification
          </p>
        </div>
        <div className="w-full flex flex-col gap-y-10">
          <PhoneNumber />
        </div>
      </DialogContent>
    </Dialog>
  );
}
