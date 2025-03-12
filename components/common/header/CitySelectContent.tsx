"use client";

import { FC, useCallback, useMemo } from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { createUrl } from "@/utils";

const ALL_CITIES_OPTION = "All Cities";

interface Props {
  cities: string[];
}

const CitySelectContent: FC<Props> = ({ cities }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentCity = useMemo(
    (): string | null => searchParams.get("city"),
    [searchParams],
  );

  const handleSelect = useCallback(
    (city: string) => {
      const newSearchParams = new URLSearchParams(searchParams);
      if (city === ALL_CITIES_OPTION) {
        newSearchParams.delete("city");
      } else {
        newSearchParams.set("city", city);
      }
      router.replace(createUrl(pathname, newSearchParams));
    },
    [router, pathname, searchParams],
  );

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="cursor-pointer">
            {currentCity ? currentCity : "Find A Home"}
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="grid gap-y-2 p-2">
              {[ALL_CITIES_OPTION, ...cities].map((city) => (
                <button
                  key={city}
                  className="cursor-pointer hover:underline hover:underline-offset-2"
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
