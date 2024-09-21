import { cookies } from "next/headers";
import { DetailListType } from "@/types";
import { getRenterBookings } from "@/services/general.api";
import ListingsItem from "./ListingsItem";

export async function generateStaticParams() {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("token")?.value;
    const listings = await getRenterBookings({}, token);
    return (
      listings?.data?.map((item: DetailListType) => ({
        itemId: item?.booking_id.toString(),
      })) || []
    );
  } catch (error) {
    console.log(error);
    return [];
  }
}

export default function Item({ params }: { params: { itemId: string } }) {
  const { itemId } = params;
  return <ListingsItem itemId={itemId} />;
}
