"use client";
import { useState, SetStateAction, Dispatch } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

import { VerifyIdentity } from "@/components/Modals/VerificationModal";

interface VerificationModalProps {
  openModal: boolean;
  handleOpenModal: Dispatch<SetStateAction<boolean>>;
}

export default function VerifyUserIdentity({
  openModal,
  handleOpenModal,
}: VerificationModalProps) {
  const [date, setDate] = useState<Date>();

  return (
    <Dialog open={openModal} onOpenChange={handleOpenModal} defaultOpen={false}>
      <DialogContent className="py-9 px-[30px] rounded-[14px] max-w-[545px] bg-white flex flex-col">
        <div className="mb-8 flex flex-col gap-1">
          <h3 className="font-bold text-slate-9 text-2xl">Proof of Identity</h3>
          <p className="text-sm text-slate-200">
            If there’s been a change on any of your document, kindly update to
            reflect
          </p>
        </div>
        <div className="w-full flex flex-col gap-y-10">
          <VerifyIdentity date={date!} setDate={setDate} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
