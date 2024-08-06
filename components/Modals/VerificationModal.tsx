"use client";
import { useState, SetStateAction, Dispatch, useEffect } from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { useToast } from "@/components/ui/use-toast";

import Stepper from "../Stepper";
import { StepProps } from "@/types";
import InfoIcon from "../vectors/InfoIcon";
import { sendSMSOTP, verifySMSOTP } from "@/services/auth.api";
import { useAppContext } from "@/context/AppContext";

interface VerificationModalProps {
  openModal: boolean;
  handleOpenModal: Dispatch<SetStateAction<boolean>>;
}

export default function VerificationModal({
  openModal,
  handleOpenModal,
}: VerificationModalProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [date, setDate] = useState<Date>();

  const steps: StepProps[] = [
    {
      1: <PhoneNumber setCurrentStep={setCurrentStep} />,
    },
    {
      2: <VerifyIdentity date={date!} setDate={setDate} />,
    },
    {
      3: <UploadPhoto />,
    },
  ];

  return (
    <Dialog open={openModal} onOpenChange={handleOpenModal} defaultOpen={false}>
      <DialogContent className="py-9 px-[30px] rounded-[14px] max-w-[545px] bg-white flex flex-col">
        <div className="mb-8 flex flex-col gap-1">
          <h3 className="font-bold text-slate-9 text-2xl">
            Verify your Profile
          </h3>
          <p className="text-sm text-slate-200">
            Miles is legally required to collect this information.{" "}
          </p>
        </div>
        <div className="w-full flex flex-col gap-y-10">
          <Stepper
            steps={steps}
            complete={currentStep === steps.length}
            currentStep={currentStep}
          />
          {steps[currentStep - 1][currentStep]}
        </div>
      </DialogContent>
    </Dialog>
  );
}

function PhoneNumber({
  setCurrentStep,
}: {
  setCurrentStep: Dispatch<SetStateAction<number>>;
}) {
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [otp, setOtp] = useState<string>("");
  const [timeLeft, setTimeLeft] = useState(20);
  const [startCountdown, setStartCountdown] = useState(false);
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const { setUserData } = useAppContext();

  const sendMutation = useMutation({
    mutationFn: sendSMSOTP,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["auth"] });
    },
  });

  const verifyMutation = useMutation({
    mutationFn: verifySMSOTP,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["auth"] });
    },
  });

  const handleSendCode = async () => {
    setStartCountdown(true);
    try {
      const res = await sendMutation.mutateAsync({
        phone_number: phoneNumber,
      });
      console.log(res);
      toast({
        variant: "success",
        title: "Success",
        description: res?.data,
      });
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: isAxiosError(err)
          ? err?.response?.data?.message
          : "An unknown error occured",
      });
    }
  };

  const handleProceed = async () => {
    try {
      const res = await verifyMutation.mutateAsync({
        phone_number: phoneNumber,
        otp,
      });
      console.log(res);
      setUserData(res?.data);
      toast({
        variant: "success",
        title: "Success",
        description: "Phone number verified.",
      });
      setCurrentStep((prev) => prev + 1);
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: isAxiosError(err)
          ? err?.response?.data?.message
          : "An unknown error occured",
      });
    }
  };

  useEffect(() => {
    let timerId: any;

    if (startCountdown) {
      timerId = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(timerId);
            setStartCountdown(false);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    } else {
      setTimeLeft(20);
    }

    return () => clearInterval(timerId);
  }, [startCountdown]);
  return (
    <div className="flex flex-col gap-y-10">
      <div className="w-full flex items-center gap-x-3 py-3 px-4 border rounded-xl">
        <Input
          type="tel"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          placeholder="Phone number"
          className={`outline-none flex-1 border-none ring-0 ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0`}
        />
        <button
          className="text-sm text-green-500 font-medium disabled:text-slate-200"
          onClick={handleSendCode}
          disabled={
            phoneNumber.length < 11 || phoneNumber.length > 14 || startCountdown
          }
        >
          Send code
        </button>
      </div>
      <div className="flex flex-col gap-y-[11px]">
        <InputOTP
          maxLength={6}
          className="w-full"
          value={otp}
          onChange={(value) => setOtp(value)}
        >
          <InputOTPGroup className="flex items-center justify-between w-full">
            <InputOTPSlot
              index={0}
              className="border rounded-lg p-4 h-14 w-16"
            />
            <InputOTPSlot
              index={1}
              className="border rounded-lg p-4 h-14 w-16"
            />
            <InputOTPSlot
              index={2}
              className="border rounded-lg p-4 h-14 w-16"
            />
            <InputOTPSlot
              index={3}
              className="border rounded-lg p-4 h-14 w-16"
            />
            <InputOTPSlot
              index={4}
              className="border rounded-lg p-4 h-14 w-16"
            />
            <InputOTPSlot
              index={5}
              className="border rounded-lg p-4 h-14 w-16"
            />
          </InputOTPGroup>
        </InputOTP>
        <div className="flex items-center justify-between">
          <p className="text-sm text-slate-800">
            Didn’t get the code?{" "}
            <button
              disabled={startCountdown}
              className="text-green-500 disabled:text-slate-400"
            >
              Send again
            </button>
          </p>
          <p className="text-sm text-slate-800">{timeLeft}s</p>
        </div>
      </div>
      <div className="w-full mt-[100px]">
        <button
          disabled={!otp || otp.length < 6}
          onClick={handleProceed}
          className="py-3 px-4 text-center w-full rounded-[38px] text-white bg-green-500 font-medium disabled:bg-green-200"
        >
          Proceed
        </button>
      </div>
    </div>
  );
}

function VerifyIdentity({
  date,
  setDate,
}: {
  date: Date;
  setDate: Dispatch<SetStateAction<Date | undefined>>;
}) {
  return (
    <div className="flex flex-col gap-y-10">
      <div className="flex flex-col gap-y-[5px]">
        <Input
          type="number"
          placeholder="NIN"
          className={`outline-none rounded-xl h-auto px-4 py-3 ring-0 ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0`}
        />
        <div className="flex items-center justify-between">
          <p className="text-xs text-gray-1">
            You’ll need this before you can list or rent on the platform.
          </p>
          <p className="text-xs text-gray-1 font-medium flex items-center gap-x-1">
            why? <InfoIcon />
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-y-[5px]">
        <Popover>
          <PopoverTrigger asChild>
            <button
              className={`rounded-xl border flex items-center justify-between px-4 py-3`}
            >
              {date ? format(date, "M/d/yyyy") : <span>DD/MM/YYYY</span>}
              <CalendarIcon className="mr-2 h-4 w-4" />
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              initialFocus
            />
          </PopoverContent>
        </Popover>
        <div className="flex items-center justify-between">
          <p className="text-xs text-gray-1">
            You’ll need this before you can list or rent on the platform.
          </p>
          <p className="text-xs text-gray-1 font-medium flex items-center gap-x-1">
            why? <InfoIcon />
          </p>
        </div>
      </div>
      <div className="w-full mt-[100px]">
        <button className="py-3 px-4 text-center w-full rounded-[38px] text-white bg-green-500 font-medium disabled:bg-green-200">
          Proceed
        </button>
      </div>
    </div>
  );
}

function UploadPhoto() {
  return <div></div>;
}
