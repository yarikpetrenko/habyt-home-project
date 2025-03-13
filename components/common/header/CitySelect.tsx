import { FC } from "react";
import { getListings } from "@/actions/listings";
import { CitySelectContent } from "./CitySelectContent";
import { Skeleton } from "@/components/ui/skeleton";

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

const CitySelectFallback: FC = () => {
  return <Skeleton className="h-10 w-32" />;
};

export { CitySelect, CitySelectFallback };
