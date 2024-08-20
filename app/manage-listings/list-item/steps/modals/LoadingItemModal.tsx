import Image from "next/image";
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface LoadingItemModalProps {
  openModal: boolean;
  isEditing: boolean;
}

export default function LoadingItemModal({
  openModal,
  isEditing,
}: LoadingItemModalProps) {
  return (
    <Dialog open={openModal} defaultOpen={false}>
      <DialogContent
        showClose={false}
        className="sm:max-w-[434px] py-[52px] px-6 flex flex-col items-center gap-y-6"
      >
        <Image
          src="/icons/three-dots.svg"
          width={48}
          height={48}
          alt="loading"
        />
        <div className="text-center">
          <h3 className="text-black font-bold text-2xl mb-2.5">
            {isEditing ? "Updating item" : "Adding new Item"}
          </h3>
          <p className="text-dark">Your changes are being saved</p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
