"use client";
import { SetStateAction, Dispatch } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { UploadPhoto } from "@/components/Modals/VerificationModal";

interface VerificationModalProps {
  openModal: boolean;
  handleOpenModal: Dispatch<SetStateAction<boolean>>;
}

export default function UpdateProfilePicture({
  openModal,
  handleOpenModal,
}: VerificationModalProps) {
  return (
    <Dialog open={openModal} onOpenChange={handleOpenModal} defaultOpen={false}>
      <DialogContent className="py-9 px-[30px] rounded-[14px] max-w-[545px] bg-white flex flex-col">
        <div className="mb-8 flex flex-col gap-1">
          <h3 className="font-bold text-slate-9 text-2xl">
            Change profile photo
          </h3>
          <p className="text-sm text-slate-200">
            Upload a clear portrait of you. File size not larger than 5MB
          </p>
        </div>
        <div className="w-full flex flex-col">
          <UploadPhoto
            handleOpenModal={handleOpenModal}
            openModal={openModal}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
