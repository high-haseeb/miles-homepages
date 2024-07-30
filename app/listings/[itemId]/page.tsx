import DashboardLayout2 from "@/components/Layouts/DashboardLayout2";
import { CarouselCard } from "@/components/ListedItemCard";

export function generateStaticParams() {
  return [{ itemId: "1a2b3c" }, { itemId: "4d5e6f" }, { itemId: "7g8h9i" }];
}

export default function ListedItem() {
  return (
    <DashboardLayout2>
      <div className="flex flex-col md:px-[155px]">
        <div className="flex items-stretch justify-between sm:gap-x-20 mb-10">
          <div className="flex flex-col max-w-[632px]">
            <CarouselCard />
            <div className="mt-5 mb-4.5">
              <p className="mb-[5px] text-slate-400">
                Listed by{" "}
                <span className="text-orange-500 font-medium">
                  Femi . Lawal
                </span>
              </p>
              <p className="text-slate-500">Lagos 1.5 km away</p>
            </div>
            <div className="flex flex-col">
              <p className="text-xl text-slate-900 mb-2.5">Description</p>
              <p className="text-slate-400">
                EOS R5 is a powerhouse mirrorless camera, boasting
                groundbreaking features like 8K video recording and a
                high-resolution sensor for exceptional image quality. With
                advanced autofocus and in-body image stabilization...{" "}
                <span className="text-orange-600">Read More</span>
              </p>
            </div>
          </div>
          <div className="border border-slate-100 rounded-[14px] py-4.5 px-6 flex flex-col gap-y-[15px]"></div>
        </div>
      </div>
    </DashboardLayout2>
  );
}
