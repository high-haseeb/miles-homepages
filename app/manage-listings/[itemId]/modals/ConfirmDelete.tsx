"use client";
import { useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogClose } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { useQueryClient, useMutation } from "@tanstack/react-query";

import { delMyListing } from "@/services/general.api";
import { ModalProps } from "@/types";
import { Button } from "@/components/ui/button";
import DangerCautionIcon from "@/components/vectors/DangerCautionIcon";

interface ConfirmDeleteModalProps extends ModalProps {
  itemId: number;
}

export default function ConfirmDelete({
  openModal,
  handleOpenModal,
  itemId,
}: ConfirmDeleteModalProps) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const mutation = useMutation({
    mutationFn: delMyListing,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["listing", itemId] });
    },
  });

  const handleDeleteListing = async () => {
    try {
      await mutation.mutateAsync(itemId);
      toast({
        variant: "success",
        title: "Success",
        description: "Listing deleted.",
      });
      router.push("/manage-listings");
    } catch (err: any) {
      const errorMsg = mutation?.error?.message || err?.response?.data?.message;
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.\nUnable to delete listing",
        description: errorMsg,
      });
    }
  };
  return (
    <Dialog open={openModal} onOpenChange={handleOpenModal} defaultOpen={false}>
      <DialogContent
        showClose={false}
        className="sm:max-w-[270px] w-full py-5 px-3.5 flex flex-col gap-y-[15px] items-center"
      >
        <DangerCautionIcon />
        <p className="text-black text-center">This action is non-reversible.</p>
        <div className="flex items-center gap-x-2.5">
          <DialogClose asChild>
            <Button className="h-auto py-2 px-4 rounded-lg bg-green-500 text-white">
              Cancel
            </Button>
          </DialogClose>
          <Button
            onClick={handleDeleteListing}
            className="h-auto py-2 px-4 rounded-lg bg-transparent text-black"
          >
            Proceed
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
