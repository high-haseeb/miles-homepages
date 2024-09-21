import { cookies } from "next/headers";
import { DetailListType } from "@/types";
import { myListings } from "@/services/general.api";
import MyListingItem from "./MyListingItem";

export default async function Item({ params }: { params: { itemId: string } }) {
  const { itemId } = params;
  return <MyListingItem itemId={itemId} />;
}
