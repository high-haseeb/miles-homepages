import Image from "next/image";
import Link from "next/link";

import Navbar from "@/components/Navbar";
import Dot from "@/components/vectors/Dot";
import PlayIcon from "@/components/vectors/PlayIcon";
import Footer from "@/components/Footer";

export default function RenterPage() {
  return (
    <section className="min-h-screen flex flex-col overflow-x-hidden max-w-[100vw] w-full">
      <header className="min-h-screen bg-pearl-400 pt-[15px] px-[25px] md:p-5 flex flex-col md:items-center md:justify-center relative">
        <Navbar />
        <div className="flex flex-col items-center text-center max-w-[578px] z-10">
          <div className="bg-white rounded-[100px] mb-[30px] md:mb-3.5 border border-gray-2 px-2 py-1 flex items-center gap-x-1 text-xs md:text-sm text-dark">
            <Dot />
            Free, fast, secure and easy to navigate
          </div>
          <h3 className="font-bold text-xl md:text-[52px] text-slate-900 md:leading-[62px] text-center mb-5">
            Get More Mileage Out of the Things You Own
          </h3>
          <p className="text-xs md:text-lg text-center text-slate-900 mb-[33px] md:mb-[61px]">
            Buying stuff is easy. But what if there was a way to make renting
            out the things you already own just as simple and rewarding?.
          </p>
          <Link
            href="/listings"
            className="flex items-center gap-x-3 px-[30px] py-3 rounded-[38px] bg-green-500 hover:bg-green-700 text-sm md:text-base text-white"
          >
            Get started <PlayIcon />
          </Link>
        </div>
        <div className="md:hidden absolute bottom-14 left-0 flex justify-between w-full px-[25px]">
          <Image
            src="/images/laptop.png"
            width={79.08}
            height={96.05}
            alt="laptop"
            className="object-contain rotate-[225deg]"
          />
          <Image
            src="/images/Camera.png"
            width={99.59}
            height={104.05}
            alt="Camera"
            className="object-contain rotate-[130deg]"
          />

          <Image
            src="/images/projector.png"
            width={101.4}
            height={67.11}
            alt="projector"
            className="object-contain -rotate-45"
          />
        </div>
      </header>
      <main className="flex flex-col container mx-auto md:max-w-[823px] xl:max-w-[1128px]">
        <section className="pt-[88px] pb-[100px] flex flex-col space-y-[60px]">
          <div className="desc-chip">KEY BENEFITS</div>
          <div className="flex flex-col md:flex-row xl:space-6 md:space-[16.88px] space-[12.73]">
            <div className="flex xl:space-6 md:space-[16.88px] space-[12.73]"></div>
            <div className="flex xl:space-6 md:space-[16.88px] space-[12.73]"></div>
          </div>
        </section>
      </main>
      <Footer />
    </section>
  );
}
