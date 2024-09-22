import Image from "next/image";
import Link from "next/link";

import Navbar from "@/components/Navbar";
import Dot from "@/components/vectors/Dot";
import PlayIcon from "@/components/vectors/PlayIcon";
import Footer from "@/components/Footer";
import YellowStar from "@/components/vectors/YellowStar";

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
        <section className="pt-[88px] pb-[100px] flex flex-col xl:space-y-[60px] md:space-y-[50px] space-y-[34px]">
          <div className="desc-chip">KEY BENEFITS</div>
          <div className="flex flex-col md:flex-row xl:gap-6 md:gap-[16.88px] gap-[12.73px]">
            <div className="flex xl:space-x-6 md:space-x-[16.88px] space-x-[12.73px] md:basis-1/2">
              <div className="basis-1/2 xl:rounded-3xl xl:p-12 md:p-[33.93px] p-[25.66px] md:rounded-[16.88px] rounded-[12.83px] h-[299.46px] md:h-[394px] xl:h-[560px] flex justify-center bg-center bg-cover bg-no-repeat bg-[url('/images/key-benefit-1.png')]">
                <p className="text-center text-wrap text-white text-xs md:text-sm xl:text-xl font-semibold">
                  Committed to bringing ease.
                </p>
              </div>
              <div className="flex flex-col w-full xl:space-y-6 md:space-y-[16.88px] space-y-[12.73px] basis-1/2">
                <div className="h-[190.77px] md:h-[251px] xl:h-[358px] xl:p-12 md:p-[33.93px] p-[25.66px] xl:rounded-3xl md:rounded-[16.88px] rounded-[12.83px] flex justify-center bg-center bg-cover bg-no-repeat bg-[url('/images/piggy.png')]">
                  <p className="text-center text-wrap text-white text-xs md:text-sm xl:text-xl font-semibold">
                    Save More
                  </p>
                </div>
                <div className="xl:rounded-3xl md:rounded-[16.88px] py-[25.66px] px-2.5 md:p-[33.75px] rounded-[12.83px] flex flex-col space-y-6 xl:p-12 border border-[#D7D7D7]">
                  <div className="flex items-center space-x-2.5">
                    <YellowStar />
                    <YellowStar />
                    <YellowStar />
                    <YellowStar />
                    <YellowStar />
                  </div>
                  <p className="text-dark_2 text-xs xl:text-base">
                    – Cheaper than buying
                  </p>
                  <p className="text-dark_2 font-medium text-xs xl:text-base">
                    Get access to what you need without the hefty upfront costs.
                  </p>
                </div>
              </div>
            </div>
            <div className="flex xl:space-x-6 md:space-x-[16.88px] space-x-[12.73px] md:basis-1/2">
              <div className="flex flex-col w-full xl:space-y-6 md:space-y-[16.88px] space-y-[12.73px] basis-1/2">
                <div className="h-[256.14px] md:h-[337px] xl:h-[480px] xl:p-12 md:p-[33.93px] p-[25.66px] xl:rounded-3xl md:rounded-[16.88px] rounded-[12.83px] flex justify-center items-end bg-center bg-cover bg-no-repeat bg-[url('/images/key-benefit-3.png')]">
                  <p className="text-center text-wrap text-white text-xs md:text-sm xl:text-xl font-semibold">
                    Easily find items around you.
                  </p>
                </div>
                <div className="xl:rounded-3xl md:rounded-[16.88px] py-[25.66px] px-2.5 md:p-[33.75px] rounded-[12.83px] flex flex-col space-y-6 xl:p-12 border border-[#D7D7D7]">
                  <div className="flex items-center space-x-2.5">
                    <Image
                      src="/images/locality.png"
                      alt="map"
                      width={90}
                      height={45}
                      className="object-contain xl:w-[90px] xl:h-[45px] md:h-[31.65px] md:w-[63.29px] h-[24.05px] w-[48.1px]"
                    />
                  </div>
                  <p className="text-dark_2 text-xs xl:text-base">
                    – Local Convenience
                  </p>
                  <p className="text-dark_2 font-medium text-xs xl:text-base">
                    Rent what you need from people in your community, from the
                    comfort of your home
                  </p>
                </div>
              </div>
              <div className="flex flex-col w-full xl:space-y-6 md:space-y-[16.88px] space-y-[12.73px] basis-1/2">
                <div className="h-[190.77px] md:h-[251px] xl:h-[292px] xl:p-12 md:p-[33.93px] p-[25.66px] xl:rounded-3xl md:rounded-[16.88px] rounded-[12.83px] flex justify-center items-center bg-center bg-cover bg-no-repeat bg-[url('/images/key-benefit-4.png')]">
                  <p className="text-center text-wrap text-white text-xs md:text-sm xl:text-xl font-semibold">
                    We’re always expanding and adding more!
                  </p>
                </div>
                <div className="xl:rounded-3xl md:rounded-[16.88px] py-[25.66px] px-2.5 md:p-[33.75px] rounded-[12.83px] flex flex-col space-y-6 xl:p-12 border border-[#D7D7D7]">
                  <div className="flex items-center space-x-2.5">
                    <Image
                      src="/images/logo.svg"
                      alt="map"
                      width={95}
                      height={26}
                      className="object-contain xl:w-[95px] xl:h-[26px] md:h-[18.28px] md:w-[66.81px] h-[13.9px] w-[50.78px]"
                    />
                  </div>
                  <p className="text-dark_2 text-xs xl:text-base">
                    – Diverse selection
                  </p>
                  <p className="text-dark_2 font-medium text-xs xl:text-base">
                    Our catalog is always expanding, from photography gear to
                    everyday essentials.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </section>
  );
}
