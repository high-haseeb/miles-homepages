import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import Navbar from "@/components/Navbar";
import Dot from "@/components/vectors/Dot";
import PlayIcon from "@/components/vectors/PlayIcon";
import Footer from "@/components/Footer";
import YellowStar from "@/components/vectors/YellowStar";
import CheckboxIcon from "@/components/vectors/CheckboxIcon";
import ShortRightArrow from "@/components/vectors/ShortRightArrow";
import ConnectLine from "@/components/vectors/ConnectLine";

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
        <section className="pt-[88px] pb-[100px] flex flex-col space-y-[34px] md:space-y-[50px] xl:space-y-[60px]">
          <div className="desc-chip">How it works / So how do we do it?</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:gap-[38.68px] xl:gap-[55px]">
            <div className="xl:rounded-3xl md:rounded-2xl border"></div>
            <div className="xl:py-[60px] xl:px-[75px] md:py-[42.2px] md:px-[52.74px] py-[36.95px] px-[46.19px] flex flex-col xl:rounded-3xl md:rounded-2xl bg-orange-50">
              <div className="flex flex-col xl:space-y-[55px] md:space-y-[38.68px] space-y-5 mb-auto">
                <div className="flex items-start space-x-[4.98px] md:space-x-[5.63px] xl:space-x-2">
                  <CheckboxIcon />
                  <p className="body-regular-16 text-slate-900">
                    Effortlessly find the item you&apos;re looking to rent with
                    a quick search on Miles
                  </p>
                </div>
                <div className="flex items-start space-x-[4.98px] md:space-x-[5.63px] xl:space-x-2">
                  <CheckboxIcon />
                  <p className="body-regular-16 text-slate-900">
                    Navigate through the process in just a couples of minutes.
                  </p>
                </div>
                <div className="flex items-start space-x-[4.98px] md:space-x-[5.63px] xl:space-x-2">
                  <CheckboxIcon />
                  <p className="body-regular-16 text-slate-900">
                    Pay seamlessly, pick up quickly, and start enjoying your
                    rental in no time.
                  </p>
                </div>
                <div className="flex items-start space-x-[4.98px] md:space-x-[5.63px] xl:space-x-2">
                  <CheckboxIcon />
                  <p className="body-regular-16 text-slate-900">
                    Revel in your savings and make the most of every rental with
                    Miles
                  </p>
                </div>
              </div>
              <Link
                href="/listing"
                className="mt-11 md:mt-14 xl:mt-[60px] flex items-center max-sm:self-center gap-x-4 text-white rounded-[38px] bg-green-500 hover:bg-green-700 p-4 pl-6 w-fit"
              >
                Start Renting
                <ShortRightArrow />
              </Link>
            </div>
            <div className="xl:rounded-3xl md:rounded-2xl border"></div>
            <div className="xl:py-[60px] xl:px-[75px] md:py-[42.2px] md:px-[52.74px] py-[36.95px] px-[46.19px] flex flex-col xl:rounded-3xl md:rounded-2xl bg-green-50">
              <div className="flex flex-col xl:space-y-[55px] md:space-y-[38.68px] space-y-5 mb-auto">
                <div className="flex items-start space-x-[4.98px] md:space-x-[5.63px] xl:space-x-2">
                  <CheckboxIcon color="#019D45" />
                  <p className="body-regular-16 text-slate-900">
                    Take some pictures of what you want to rent and fill out
                    basic details about it.
                  </p>
                </div>
                <div className="flex items-start space-x-[4.98px] md:space-x-[5.63px] xl:space-x-2">
                  <CheckboxIcon color="#019D45" />
                  <p className="body-regular-16 text-slate-900">
                    Freedom to accept any booking request of your choice.
                  </p>
                </div>
                <div className="flex items-start space-x-[4.98px] md:space-x-[5.63px] xl:space-x-2">
                  <CheckboxIcon color="#019D45" />
                  <p className="body-regular-16 text-slate-900">
                    Freedom to accept any booking request of your choice.
                  </p>
                </div>
                <div className="flex items-start space-x-[4.98px] md:space-x-[5.63px] xl:space-x-2">
                  <CheckboxIcon color="#019D45" />
                  <p className="body-regular-16 text-slate-900">
                    Take some pictures of what you want to rent and fill out
                    basic details about it.
                  </p>
                </div>
              </div>
              <Link
                href="/manage-listings/list-item"
                className="mt-11 md:mt-14 xl:mt-[60px] flex items-center max-sm:self-center gap-x-4 text-white rounded-[38px] bg-green-500 hover:bg-green-700 p-4 pl-6 w-fit"
              >
                List an item
                <ShortRightArrow />
              </Link>
            </div>
          </div>
        </section>
        <section className="pt-[88px] pb-[100px] flex flex-col">
          <div className="desc-chip mb-1.5 md:mb-5 xl:mb-[30px]">
            YOU’VE GOT OPTIONS
          </div>
          <h3 className="heading-sm-26 mb-[30px] md:mb-[50px] xl:mb-[60px] text-[#111111]">
            A diverse and growing
            <br /> range of items
          </h3>
          <div className="flex flex-col gap-y-4 md:flex-row md:items-stretch xl:gap-x-[30px] md:gap-x-5">
            <div className="relative shrink-0 bg-cover bg-center bg-no-repeat bg-[url('/images/drone.jpg')] bg-blend-multiply md:basis-1/2 xl:rounded-[15px] md:rounded-[10.55px] rounded-md max-sm:h-[214.31px] py-4.5 px-6 flex flex-col justify-between xl:py-[35px] xl:px-[45px] md:py-6 md:px-8">
              <div className="absolute bottom-0 left-0 h-1/4 w-full bg-gradient-to-t from-white backdrop-blur-[20px] xl:rounded-b-[15px] md:rounded-b-[10.55px] rounded-b-md"></div>
              <div className="bg-[#305FD8] px-[7.44px] py-[5.58px] text-[4.65px] md:text-[7.03px] md:py-[7.49px] md:px-[9.98px] rounded-[44px] xl:py-[10.65px] xl:px-[14.2px] text-white xl:text-[10px] font-medium w-fit">
                1K+ Active Listers
              </div>
              <div className="flex items-center justify-between z-10">
                <div>
                  <p className="body-medium-16 text-black">
                    Film & Photography
                  </p>
                  <p className="body-regular-14 !text-slate-300">
                    DSLR Cameras, Audio Recorders & More..
                  </p>
                </div>
                <button className="rounded-full p-[5.24px] md:p-[7.03px] xl:p-2.5 size-6 md:size-8 xl:size-11 bg-white">
                  <ArrowUpRight className="text-green-500 hover:rotate-45 transition-all size-[12.58px] md:size-[16.88px]" />
                </button>
              </div>
            </div>
            <div className="flex xl:space-x-[30px] md:space-x-5 space-x-2.5 md:basis-1/2 shrink-0">
              <Image
                src="/images/scooter.jpg"
                width={280}
                height={409}
                alt="scooter"
                className="xl:rounded-[15px] basis-1/2 md:rounded-[10.55px] rounded-md w-[157px] h-[113px] md:h-[287.62px] xl:w-[280px] xl:h-[409px] object-cover"
              />
              <Image
                src="/images/drumset.jpg"
                width={280}
                height={409}
                alt="scooter"
                className="xl:rounded-[15px] basis-1/2 md:rounded-[10.55px] rounded-md w-[157px] h-[113px] md:h-[287.62px] xl:w-[280px] xl:h-[409px] object-cover"
              />
            </div>
          </div>
        </section>
        <section className="pt-[88px] pb-[100px] flex flex-col">
          <div className="flex flex-col self-center text-center xl:mb-[55px] md:mb-10 mb-6">
            <div className="desc-chip self-center xl:mb-[37.5px] md:mb-5 mb-1.5">
              KEEPING YOU FRONT & CENTER
            </div>
            <h3 className="heading-sm-26 mb-4">Trust & Safety</h3>
            <p className="xl:text-lg text-[13.17px] text-slate-900 md:max-w-[408px] xl:max-w-[558px]">
              Ensuring peace of mind with every rental through secure and
              reliable practices
            </p>
          </div>
          <div className="flex flex-col sm:flex-row sm:justify-between gap-y-10 relative">
            <div className="flex flex-col items-center text-center">
              <Image
                src="/icons/identity-verif.svg"
                width={154}
                height={150}
                alt="identity-verification"
                className="size-[90.31px] md:size-[109.72px] xl:size-[150px] mb-5 md:mb-6"
              />
              <h4 className="body-sm-20 mb-2.5 md:mb-3 xl:mb-4">
                Identity Verification
              </h4>
              <p className="body-regular-16">
                Ensuring data accuracy is crucial for making informed decisions
                and ensuring the reliability.
              </p>
            </div>
            <ConnectLine className="relative xl:top-16 md:top-12 max-sm:left-1/2 max-sm:-translate-x-1/2" />
            <div className="flex flex-col items-center text-center">
              <Image
                src="/icons/insurance-cover.svg"
                width={154}
                height={150}
                alt="insurance-coverage"
                className="size-[90.31px] md:size-[109.72px] xl:size-[150px] mb-5 md:mb-6"
              />
              <h4 className="body-sm-20 mb-2.5 md:mb-3 xl:mb-4">
                Insurance Coverage
              </h4>
              <p className="body-regular-16">
                Ensuring data accuracy is crucial for making informed decisions
                and ensuring the reliability.
              </p>
            </div>
            <ConnectLine
              color="#FF8C2F"
              className="relative xl:top-16 md:top-12 max-sm:left-1/2 max-sm:-translate-x-1/2"
            />
            <div className="flex flex-col items-center text-center">
              <Image
                src="/icons/secure-trans.svg"
                width={154}
                height={150}
                alt="Secure Transactions"
                className="size-[90.31px] md:size-[109.72px] xl:size-[150px] mb-5 md:mb-6"
              />
              <h4 className="body-sm-20 mb-2.5 md:mb-3 xl:mb-4">
                Secure Transactions
              </h4>
              <p className="body-regular-16">
                Ensuring data accuracy is crucial for making informed decisions
                and ensuring the reliability.
              </p>
            </div>
          </div>
        </section>
        <section className="pt-[88px] pb-[100px] flex flex-col">
          <div className="desc-chip self-center sm:self-start md:mb-[30px] mb-1.5">
            ADDRESSING YOUR CONCERNS
          </div>
          <div className="flex flex-com sm:flex-row xl:space-x-[130px] md:space-x-12">
            <h3 className="heading-sm-26 md:max-w-[288px] w-full shrink-0">
              Frequently Asked Questions
            </h3>
            <div className="flex flex-col space-y-5 flex-1">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>Is Miles safe?</AccordionTrigger>
                  <AccordionContent>
                    Yes. It adheres to the WAI-ARIA design pattern.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>
                    Who controls my account logins?
                  </AccordionTrigger>
                  <AccordionContent>
                    Yes. It adheres to the WAI-ARIA design pattern.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>
                    Can I use the same email to switch to lister and renter ?
                  </AccordionTrigger>
                  <AccordionContent>
                    It is almost completely automated as a system . You can
                    easily switch from your rental side to your listed side.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                  <AccordionTrigger>
                    Does Miles support multiple cards?
                  </AccordionTrigger>
                  <AccordionContent>
                    Yes. It adheres to the WAI-ARIA design pattern.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </section>
  );
}
