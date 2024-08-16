import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import VerifiedIcon from "./vectors/VerifiedIcon";
import StarIcon from "./vectors/StarIcon";

export default function Review() {
  return (
    <div className="flex gap-x-3.5">
      <Avatar className="w-16 h-16">
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>AR</AvatarFallback>
      </Avatar>
      <div className="flex flex-col">
        <div className="flex items-center justify-between max-w-[403px]">
          <div className="flex items-center gap-x-[5px]">
            <p className="text-slate-800">Anslem Rex</p>
            <VerifiedIcon />
          </div>
          <p className="text-slate-400 text-sm">Apr 16, 2020</p>
        </div>
        <div className="flex">
          <StarIcon />
          <StarIcon />
          <StarIcon />
          <StarIcon />
          <StarIcon />
        </div>
        <p className="text-slate-400 text-sm mt-[5px]">
          EOS R5 is a powerhouse mirrorless camera, boasting groundbreaking
          features like 8K video recording...
        </p>
      </div>
    </div>
  );
}
