import { FC } from "react";
import { CitySelectContent } from "./CitySelectContent";
import { Skeleton } from "@/components/ui/skeleton";
import { getCities } from "@/actions/cities";

const CitySelect: FC = async () => {
  const res = await getCities();

  if (!res.ok) {
    return null;
  }

  const cities = res.data;

  const cityNames = cities.map((city) => city.name);

  return <CitySelectContent cities={cityNames} />;
};

const CitySelectFallback: FC = () => {
  return <Skeleton className="h-10 w-32" />;
};

export { CitySelect, CitySelectFallback };
