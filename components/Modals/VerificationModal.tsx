"use client";
import {
  useState,
  useRef,
  SetStateAction,
  Dispatch,
  useEffect,
  ChangeEvent,
  RefObject,
} from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Camera } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { useToast } from "@/components/ui/use-toast";

import Stepper from "../Stepper";
import { StepProps } from "@/types";
import InfoIcon from "../vectors/InfoIcon";
import { sendSMSOTP, verifySMSOTP } from "@/services/auth.api";
import { uploadProfilePic } from "@/services/general.api";
import { useAppContext, UserDataType } from "@/context/AppContext";
import WriteIcon from "../vectors/WriteIcon";
import GalleryIcon from "../vectors/GalleryIcon";
import PhotoIcon from "../vectors/PhotoIcon";
import { identifyUrlType, base64ToFile } from "@/utils";

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
      2: (
        <VerifyIdentity
          date={date!}
          setDate={setDate}
          setCurrentStep={setCurrentStep}
        />
      ),
    },
    {
      3: <UploadPhoto handleOpenModal={handleOpenModal} />,
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

export function PhoneNumber({
  setCurrentStep,
}: {
  setCurrentStep?: Dispatch<SetStateAction<number>>;
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
    } catch (err: any) {
      const errorMsg =
        sendMutation?.error?.message || err?.response?.data?.message;
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: errorMsg,
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
      if (setCurrentStep) setCurrentStep((prev) => prev + 1);
    } catch (err: any) {
      const errorMsg =
        verifyMutation?.error?.message || err?.response?.data?.message;
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: errorMsg,
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

  const handleSkip = () => {
    if (setCurrentStep) setCurrentStep((prev) => prev + 1);
  };
  return (
    <div className="flex flex-col gap-y-10">
      <div className="relative">
        <PhoneInput
          country={"ng"}
          value={phoneNumber}
          inputProps={{
            name: "phone",
            autoFocus: false,
            onChange: (e: ChangeEvent<HTMLInputElement>) =>
              setPhoneNumber(e.target.value),
          }}
          placeholder="Phone number"
          inputClass="!w-full !py-6 !pl-20 !px-4 !border-none h-auto"
          containerClass={`outline-none pl-0 p-1 w-full border rounded-xl ring-0 ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0`}
        />
        <button
          className="text-sm text-green-500 font-medium disabled:text-slate-200 absolute top-1/2 -translate-y-1/2 right-2"
          onClick={handleSendCode}
          disabled={
            phoneNumber.split(" ").join("").length < 11 ||
            phoneNumber.split(" ").join("").length > 14 ||
            startCountdown
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
      <div className="w-full mt-[100px] flex items-center gap-x-6">
        <button
          onClick={handleSkip}
          className="py-3 px-4 text-center w-full rounded-[38px] text-slate-900 bg-transparent font-medium disabled:bg-slate-200"
        >
          Skip
        </button>
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

export function VerifyIdentity({
  date,
  setDate,
  setCurrentStep,
}: {
  date: Date;
  setDate: Dispatch<SetStateAction<Date | undefined>>;
  setCurrentStep?: Dispatch<SetStateAction<number>>;
}) {
  const handleSkip = () => {
    if (setCurrentStep) setCurrentStep((prev) => prev + 1);
  };
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
      <div className="w-full mt-[100px] flex items-center gap-x-6">
        <button
          onClick={handleSkip}
          className="py-3 px-4 text-center w-full rounded-[38px] text-slate-900 bg-transparent font-medium disabled:bg-slate-200"
        >
          Skip
        </button>
        <button className="py-3 px-4 text-center w-full rounded-[38px] text-white bg-green-500 font-medium disabled:bg-green-200">
          Proceed
        </button>
      </div>
    </div>
  );
}

export function UploadPhoto({
  handleOpenModal,
}: {
  handleOpenModal: Dispatch<SetStateAction<boolean>>;
}) {
  const { userData, setUserData } = useAppContext();
  const [user, setUser] = useState<UserDataType | undefined>(undefined);
  const [imageFileList, setImageFile] = useState<FileList | null>(null);
  const [ppFile, setPPFile] = useState<File | null>(null);
  const videoRef: RefObject<HTMLVideoElement> = useRef(null);
  const canvasRef: RefObject<HTMLCanvasElement> = useRef(null);
  const [photo, setPhoto] = useState<string>("");
  const [isTakingPhoto, setIsTakingPhoto] = useState<boolean>(false);

  const { toast } = useToast();
  const queryClient = useQueryClient();
  const profilePicMutation = useMutation({
    mutationFn: uploadProfilePic,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
  });

  useEffect(() => {
    setUser(userData);
    if (userData?.image_url) {
      setPhoto(userData?.image_url);
    }
  }, [userData]);

  const takeWebPhoto = async () => {
    setIsTakingPhoto(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
    } catch (err) {
      console.error("Error accessing webcam: ", err);
      setIsTakingPhoto(false);
    }
  };

  const stopWebPhoto = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }
  };

  const takePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext("2d");
      if (context) {
        context.drawImage(
          videoRef.current,
          0,
          0,
          canvasRef.current.width,
          canvasRef.current.height
        );
        const dataURL = canvasRef.current.toDataURL("image/png");
        setPhoto(dataURL);
        setIsTakingPhoto(false);
        stopWebPhoto();
      }
    }
  };

  useEffect(() => {
    const urlType = identifyUrlType(photo);
    let file: File;
    if (photo) {
      if (urlType === "base64") {
        file = base64ToFile(photo, "profile-photo");
        setPPFile(file);
      } else if (urlType === "blob" && imageFileList) {
        file = imageFileList![0];
        setPPFile(file);
      } else return;
    }
  }, [photo, imageFileList]);

  const handleSubmit = async () => {
    try {
      if (ppFile) {
        const res = await profilePicMutation.mutateAsync({
          image: ppFile,
        });
        console.log(res);
        setUserData({ ...userData, image_url: res?.data?.image_url });
        toast({
          variant: "success",
          title: "Success",
          description: "Profile picture uploaded.",
        });
        handleOpenModal(false);
      }
    } catch (err: any) {
      const errorMsg =
        profilePicMutation?.error?.message || err?.response?.data?.message;
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: errorMsg,
      });
    }
  };

  const fullName = `${user?.first_name} ${user?.last_name}`;

  return (
    <div className="flex flex-col px-12 relative">
      <div className="flex flex-col items-center gap-y-[5px] text-center mb-[11px]">
        <Avatar className="w-[150px] h-[150px]">
          <AvatarImage
            src={photo || "https://github.com/shadcn.png"}
            alt="photo"
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="flex items-center gap-x-[9px]">
          <p className="text-slate-800">{fullName}</p>
          <WriteIcon />
        </div>
      </div>
      <p className="text-xs text-gray-1 mb-1">
        Finish up by uploading a clear portrait of you. File size not larger
        than 5MB
      </p>
      <div className="self-center flex items-center justify-between w-full max-w-[334px]">
        <label
          htmlFor="upload-photo"
          className="flex items-center py-2.5 px-5 gap-x-[7px] text-slate-800 cursor-pointer"
        >
          <GalleryIcon />
          Gallery
          <input
            id="upload-photo"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const files = e.target.files;
              if (files && files[0]) {
                setImageFile(e.target.files);
                setPhoto(URL.createObjectURL(files[0]));
              }
            }}
          />
        </label>
        <button
          className="flex items-center py-2.5 px-5 gap-x-[7px] text-slate-800"
          onClick={takeWebPhoto}
        >
          <PhotoIcon />
          Take a photo
        </button>
      </div>
      {isTakingPhoto && (
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 z-10 w-full">
          <video
            ref={videoRef}
            width="640"
            height="480"
            className="rounded-xl"
          />
          <button
            onClick={takePhoto}
            className="absolute bottom-5 z-20 bg-white left-1/2 -translate-x-1/2 rounded-full text-slate-300 border-[3px] border-slate-300 h-16 w-16 flex items-center justify-center"
          >
            <Camera className="w-10 h-10" />
          </button>
          <canvas
            ref={canvasRef}
            width="640"
            height="480"
            style={{ display: "none" }}
          />
        </div>
      )}
      <div className="w-full mt-5">
        <button
          onClick={handleSubmit}
          disabled={!ppFile || profilePicMutation.isPending}
          className="py-3 px-4 text-center w-full rounded-[38px] text-white bg-green-500 font-medium disabled:bg-green-200"
        >
          Submit
        </button>
      </div>
    </div>
  );
}
