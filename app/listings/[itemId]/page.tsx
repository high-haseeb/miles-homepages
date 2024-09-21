import { getListings } from "@/services/general.api";
import ListingsItem from "./ListingsItem";
import { ItemProps } from "@/types";

export async function generateStaticParams() {
  try {
    const listings = await getListings({});
    return (
      listings?.data?.map((item: ItemProps) => ({
        itemId: item?.listing_id.toString(),
      })) || []
    );
  } catch (error) {
    console.log(error);
    return [];
  }
}

export default function ListedItem({ params }: { params: { itemId: string } }) {
  const { itemId } = params;
  return <ListingsItem itemId={itemId} />;
}
