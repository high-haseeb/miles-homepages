"use client";
import { useRouter } from "next/navigation";

import LeftArrow from "./vectors/LeftArrow";

export default function Backbtn({
  link,
  text,
}: {
  link?: string;
  text?: string;
}) {
  const router = useRouter();
  const handleReturnBack = () => {
    if (link) router.push(link);
    else router.back();
  };
  return (
    <button
      onClick={handleReturnBack}
      className="bg-transparent border-none flex items-center gap-x-3.5 p-0.5 text-slate-900 font-bold"
    >
      <LeftArrow />
      <span className="max-sm:hidden">{text || "Back"}</span>
    </button>
  );
}
