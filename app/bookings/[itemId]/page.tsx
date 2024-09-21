import { cookies } from "next/headers";
import { DetailListType } from "@/types";
import BookingsItem from "./BookingsItem";
import { getListerBookings } from "@/services/general.api";

export async function generateStaticParams() {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("token")?.value;
    const listings = await getListerBookings({}, token);
    return (
      listings?.data?.map((item: DetailListType) => ({
        itemId: item?.listing_id.toString(),
      })) || []
    );
  } catch (error) {
    console.log(error);
    return [];
  }
}

export default function Item({ params }: { params: { itemId: string } }) {
  const { itemId } = params;
  return <BookingsItem itemId={itemId} />;
}
