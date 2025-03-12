import { FC } from "react";
import { getListings } from "@/actions/listings";
import { CitySelectContent } from "./CitySelectContent";

const CitySelect: FC = async () => {
  const res = await getListings({});

  if (!res.ok) {
    return null;
  }

  const listings = res.data;

  const cities = Array.from(
    new Set(listings.map((listing) => listing.city)),
  ).sort();

  return <CitySelectContent cities={cities} />;
};

export { CitySelect };
