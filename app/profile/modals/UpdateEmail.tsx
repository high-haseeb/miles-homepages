"use client";
import { SetStateAction, Dispatch, FormEvent, useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

import { updateEmail } from "@/services/general.api";

interface VerificationModalProps {
  openModal: boolean;
  handleOpenModal: Dispatch<SetStateAction<boolean>>;
}

export default function UpdateEmail({
  openModal,
  handleOpenModal,
}: VerificationModalProps) {
  const [email, setEmail] = useState("");
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const mutation = useMutation({
    mutationFn: updateEmail,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
  });

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await mutation.mutateAsync({ email: email });
      console.log(res);
    } catch (err: any) {
      const errorMsg = mutation?.error?.message || err?.response?.data?.message;
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: errorMsg,
      });
    }
  };

  return (
    <Dialog open={openModal} onOpenChange={handleOpenModal} defaultOpen={false}>
      <DialogContent className="py-9 px-[30px] rounded-[14px] max-w-[545px] bg-white flex flex-col">
        <div className="mb-8 flex flex-col gap-1">
          <h3 className="font-bold text-slate-9 text-2xl">Update your Email</h3>
          <p className="text-sm text-slate-200">
            We’ll send an email to verify your address
          </p>
        </div>
        <div className="w-full flex flex-col">
          <form className="flex flex-col gap-y-[35px]" onSubmit={onSubmit}>
            <Input
              className="h-auto outline-none ring-0 ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0 py-3 px-4"
              placeholder="Email"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button
              disabled={!email}
              className="mt-[60px] py-3 px-4 text-center w-full rounded-[38px] text-white bg-green-500 font-medium disabled:bg-green-200"
            >
              Update
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
