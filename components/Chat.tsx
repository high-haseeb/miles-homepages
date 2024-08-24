"use client";
import { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { io, Socket } from "socket.io-client";

import Dot from "./vectors/Dot";
import SendIcon from "./vectors/SendIcon";
import { BookingDetails } from "@/types";
import { PURE_API_URL } from "@/constants";

interface ChatProps {
  details: BookingDetails;
  status?: string;
}

export default function Chat({ status, details }: ChatProps) {
  const [socketObj, setSocketObj] = useState<Socket | null>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [message, setMessage] = useState<string>("");
  // const startDate = format(details?.start_date, "MMM d, yyyy");
  // const endDate = format(details?.end_date, "MMM d, yyyy");
  // console.log(details);

  const user =
    status === "lister" ? details?.lister_name : details?.renter_name;

  useEffect(() => {
    const socket = io(PURE_API_URL!);
    setSocketObj(socket);
    socket.on("connect", () => {
      console.log("socket connected");
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleSendMessage = () => {
    if (socketObj && message.trim()) {
      socketObj.emit("message", { username: user, message });
      setMessage(""); // Clear input field after sending
    }
  };

  useEffect(() => {
    if (socketObj) {
      socketObj.on("message", (msg) => {
        setMessages((prevMessages) => [...prevMessages, msg]);
      });
    }
  }, [messages, socketObj]);

  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-col gap-y-[25px]">
        <div className="flex gap-x-2.5">
          <Avatar className="w-[35px] sm:w-[53px] h-[35px] sm:h-[53px]">
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-y-0.5">
            <div className="rounded-xl bg-white border border-slate-50 py-4.5 px-5 text-slate-800">
              {details?.description}
            </div>
            <p className="text-sm text-slate-400">Today 8:45 am</p>
          </div>
        </div>
        <div className="w-full flex flex-col gap-y-2.5 sm:ml-16">
          <Textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="bg-transparent py-[34px] px-[33px] bg-white border border-gray-2 rounded-[14px] ring-0 ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0"
            placeholder="Message Luis B..."
          />
          <button
            onClick={handleSendMessage}
            className="rounded-lg border flex border-gray-4 gap-2 py-2 px-4 text-slate-400 self-end w-fit bg-transparent"
          >
            <SendIcon /> Send Message
          </button>
        </div>
      </div>
    </div>
  );
}
