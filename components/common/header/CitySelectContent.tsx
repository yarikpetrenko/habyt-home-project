"use client";

import { FC, useCallback, useMemo, useState } from "react";
import { useFilterListings } from "@/hooks";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { cn } from "@/utils";

const ALL_CITIES_OPTION = "All Cities";

interface Props {
  cities: string[];
}

const CitySelectContent: FC<Props> = ({ cities }) => {
  const { filter, applyFilter } = useFilterListings();
  const [open, setOpen] = useState<boolean>(false);

  const currentCity = useMemo((): string | null => {
    const value = filter.city;
    if (!value || !cities.includes(value)) {
      return null;
    }
    return value;
  }, [cities, filter.city]);

  const handleSelect = useCallback(
    (city: string) => {
      applyFilter({
        page: null,
        city: city === ALL_CITIES_OPTION ? null : city,
      });
    },
    [applyFilter],
  );

  return (
    <HoverCard open={open} onOpenChange={setOpen} openDelay={100}>
      <HoverCardTrigger asChild>
        <Button variant="ghost" className="text-base font-medium">
          <span>{currentCity ? currentCity : "Find A Home"}</span>
          <ChevronDown
            className={cn("size-3 transition-transform", open && "rotate-180")}
          />
        </Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-46">
        <div className="grid gap-y-1">
          {[ALL_CITIES_OPTION, ...cities].map((city) => (
            <Button
              key={city}
              variant="link"
              onClick={() => handleSelect(city)}
              className="font-medium"
            >
              {city}
            </Button>
          ))}
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};

export { CitySelectContent };
