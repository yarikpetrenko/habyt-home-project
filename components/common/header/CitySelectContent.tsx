"use client";

import { FC, useCallback, useMemo } from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { useSearchParams } from "next/navigation";
import { useFilterListings } from "@/hooks";

const ALL_CITIES_OPTION = "All Cities";

interface Props {
  cities: string[];
}

const CitySelectContent: FC<Props> = ({ cities }) => {
  const searchParams = useSearchParams();

  const { applyFilter } = useFilterListings();

  const currentCity = useMemo(
    (): string | null => searchParams.get("city"),
    [searchParams],
  );

  const handleSelect = useCallback(
    (city: string) => {
      applyFilter({ city: city === ALL_CITIES_OPTION ? null : city });
    },
    [applyFilter],
  );

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="cursor-pointer text-base font-medium">
            {currentCity ? currentCity : "Find A Home"}
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="grid gap-y-2 p-2">
              {[ALL_CITIES_OPTION, ...cities].map((city) => (
                <button
                  key={city}
                  className="cursor-pointer font-medium hover:underline hover:underline-offset-2"
                  onClick={() => handleSelect(city)}
                >
                  {city}
                </button>
              ))}
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export { CitySelectContent };
