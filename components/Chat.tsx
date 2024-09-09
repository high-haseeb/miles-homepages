"use client";
import { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { io, Socket } from "socket.io-client";
import { useQuery } from "@tanstack/react-query";

import SendIcon from "./vectors/SendIcon";
import { BookingDetails } from "@/types";
import { PURE_API_URL } from "@/constants";
import { getMessages } from "@/services/general.api";
import { formatCustomDate } from "@/utils";

interface ChatProps {
  details: BookingDetails;
  status?: string;
}

interface MessageProps {
  message_content: string;
  message_created_at: Date;
  message_id: number;
  sender_full_name: string;
}

export default function Chat({ status, details }: ChatProps) {
  const [socketObj, setSocketObj] = useState<Socket | null>(null);
  const [messages, setMessages] = useState<MessageProps[]>([]);
  const [message, setMessage] = useState<string>("");

  const bookingId = details?.booking_id;
  const renterId = details?.renter_id;
  const listerId = details?.lister_id;
  const currentUserId = status === "lister" ? listerId : renterId;

  const roomId = details?.room_ids?.[0];

  const { data: chatMessages, isPending } = useQuery({
    queryKey: ["messages", bookingId, roomId],
    queryFn: () =>
      getMessages({
        roomId,
      }),
  });

  useEffect(() => {
    const socket = io(PURE_API_URL!);
    setSocketObj(socket);

    socket.on("connect", () => {
      console.log("Socket connected:", socket.id);

      // Join the room if roomId is available
      if (roomId) {
        socket.emit("joinRoom", roomId);
      }
    });

    socket.on("error", (error) => {
      console.error("Socket error:", error.message);
    });

    socket.on("chat message", (newMessage: MessageProps) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    if (chatMessages) {
      setMessages(chatMessages?.data);
    }

    return () => {
      socket.disconnect();
    };
  }, [chatMessages, roomId]);

  const handleSendMessage = () => {
    if (socketObj && message.trim() && roomId) {
      socketObj.emit("message", roomId, currentUserId, message.trim());
      setMessage("");
    }
  };

  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-col gap-y-[25px]">
        <div className="flex flex-col gap-y-5">
          {messages?.map((message: MessageProps) => (
            <div
              className={`flex gap-x-2.5 ${
                message?.sender_full_name.toLowerCase() ===
                details?.lister_name.toLowerCase()
                  ? "self-end flex-row-reverse"
                  : ""
              }`}
              key={message?.message_id}
            >
              <Avatar className="w-[35px] sm:w-[53px] h-[35px] sm:h-[53px]">
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className="flex flex-col gap-y-0.5">
                <div className="rounded-xl bg-white border border-slate-50 py-3 px-4 text-slate-800">
                  {message?.message_content}
                </div>
                <p
                  className={`text-sm text-slate-400 ${
                    message?.sender_full_name.toLowerCase() ===
                    details?.lister_name.toLowerCase()
                      ? "self-end"
                      : ""
                  }`}
                >
                  {formatCustomDate(message?.message_created_at)}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="w-full flex flex-col gap-y-2.5">
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
