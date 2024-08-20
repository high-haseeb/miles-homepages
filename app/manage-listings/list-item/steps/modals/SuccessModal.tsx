"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";

import { ModalProps } from "@/types";

interface SuccessModalProps extends ModalProps {
  name?: string;
}

export default function SuccessModal({
  openModal,
  handleOpenModal,
  name,
}: SuccessModalProps) {
  const router = useRouter();
  return (
    <Dialog onOpenChange={handleOpenModal} open={openModal} defaultOpen={false}>
      <DialogContent
        showClose={false}
        className="sm:max-w-[434px] py-8 px-6 flex flex-col items-center gap-y-6"
      >
        <Image
          src="/images/success.png"
          width={324}
          height={151}
          alt="success"
        />
        <div className="text-center">
          <h3 className="text-black font-bold text-2xl mb-1">Success!</h3>
          <p className="text-dark">
            Congratulations {name} you’ve successfully listed your first item on
            miles.
          </p>
        </div>
        <Button
          onClick={() => router.push("/manage-listings")}
          className="rounded-[38px] py-3 px-4 bg-green-500 h-auto text-white font-medium w-full text-center"
        >
          Check Listings
        </Button>
        <Button
          onClick={() => router.push("/manage-listings/list-item")}
          variant="secondary"
          className="rounded-[38px] py-3 px-4 h-auto font-medium w-full text-center"
        >
          Add new Item
        </Button>
      </DialogContent>
    </Dialog>
  );
}
