"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { format } from "date-fns";

import { ModalProps } from "@/types";
import CalendarModal from "../../list-item/steps/modals/CalendarModal";
import { updateSchedule } from "@/services/general.api";

const formSchema = z.object({
  multiple_date_ranges: z.any().optional(),
  recurring_days_of_week: z.array(z.string()).optional(),
  recurring_date: z.any().optional(),
});

interface EditAvailabilityProps extends ModalProps {
  id: number;
}

export default function EditAvailability({
  id,
  openModal,
  handleOpenModal,
}: EditAvailabilityProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      multiple_date_ranges: "",
    },
  });

  const mutation = useMutation({
    mutationFn: updateSchedule,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["schedule"] });
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
    try {
      const formData = new FormData();
      for (const [key, value] of Object.entries(values)) {
        if (key === "multiple_date_ranges" && value) {
          const dateRangeString = `${format(
            (value as any).from,
            "M/d/yyyy"
          )}, ${format((value as any).to, "M/d/yyyy")}`;
          formData.append("multiple_date_ranges", dateRangeString);
        } else if (key === "recurring_days_of_week" && value) {
          const days = value.join(", ");
          formData.append("recurring_days_of_week", days);
        } else if (key === "recurring_date" && value) {
          formData.append(
            "recurring_start_date",
            format((value as any).from, "M/d/yyyy")
          );
          formData.append(
            "recurring_end_date",
            format((value as any).to, "M/d/yyyy")
          );
        }
      }
      const payload: any = {};
      for (const [key, value] of formData) {
        payload[key] = value;
      }
      const params = { id };
      await mutation.mutateAsync({ params, payload });
      toast({
        variant: "success",
        title: "Success",
        description: `Schedule updated successfully!`,
      });
      handleOpenModal(false);
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
      <DialogContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CalendarModal control={form.control} isUpdating />
            <Button className=" mt-5 w-full bg-green-500 py-3 px-4 rounded-[38px] font-medium text-white">
              Save
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
