import { FC } from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { getListings } from "@/actions/listings";

const CitySelect: FC = async () => {
  const res = await getListings({});

  if (!res.ok) {
    return null;
  }

  const listings = res.data;

  const cities = Array.from(
    new Set(["All Cities", ...listings.map((listing) => listing.city)]),
  ).sort();

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>City</NavigationMenuTrigger>
          <NavigationMenuContent>
            {cities.map((city) => (
              <NavigationMenuLink key={city}>{city}</NavigationMenuLink>
            ))}
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export { CitySelect };
