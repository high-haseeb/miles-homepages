import { DetailListType } from "@/types";
import BookingsItem from "./BookingsItem";
import { getListerBookings } from "@/services/general.api";

export async function generateStaticParams() {
  try {
    const listings = await getListerBookings({});
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
