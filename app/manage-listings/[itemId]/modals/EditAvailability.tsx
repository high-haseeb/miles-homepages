"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Dialog } from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import { useQueryClient, useMutation } from "@tanstack/react-query";

import { ModalProps } from "@/types";
import CalendarModal from "../../list-item/steps/modals/CalendarModal";
import { updateSchedule } from "@/services/general.api";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});

export default function EditAvailability({
  openModal,
  handleOpenModal,
}: ModalProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };
  return (
    <Dialog open={openModal} onOpenChange={handleOpenModal} defaultOpen={false}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CalendarModal control={form.control} />
        </form>
      </Form>
    </Dialog>
  );
}
