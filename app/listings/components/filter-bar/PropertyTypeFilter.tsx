"use client";

import { FC, useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { PROPERTY_TYPES } from "@/constants";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/utils";
import { useFilterListings } from "@/hooks";
import { useDebouncedCallback } from "use-debounce";

type Option = {
  label: string;
  value: string;
};

const PropertyTypeFilter: FC = () => {
  const { applyFilter } = useFilterListings();

  const [open, setOpen] = useState<boolean>(false);
  const [value, setValue] = useState<Option[]>([]);

  const debounced = useDebouncedCallback((propertyType: string[]) => {
    applyFilter({ propertyType });
  }, 400);

  useEffect(() => {
    debounced(value.map((v) => v.value));
  }, [value, debounced]);

  const handleReset = useCallback((event: Event) => {
    event.preventDefault();
    setValue([]);
  }, []);

  const handleSelect = useCallback((event: Event, newValue: Option) => {
    event.preventDefault();
    setValue((oldValue) => {
      const candidateIndex = oldValue.some((v) => v.value === newValue.value);

      if (candidateIndex) {
        return oldValue.filter((v) => v.value !== newValue.value);
      }
      return [...oldValue, newValue];
    });
  }, []);

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          label="Property Type"
          className="w-[200px] justify-between rounded-none"
        >
          <span className="truncate">
            {value.length
              ? value.map((v) => v.label).join(", ")
              : "All Types Of Stay"}
          </span>
          <ChevronDown
            className={cn(
              "opacity-50 transition-transform",
              open && "rotate-180",
            )}
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[200px]">
        <DropdownMenuItem onSelect={handleReset}>
          All Types Of Stay
        </DropdownMenuItem>
        {PROPERTY_TYPES.map((propertyType) => (
          <DropdownMenuItem
            key={propertyType.value}
            onSelect={(e) => handleSelect(e, propertyType)}
          >
            <Checkbox
              className="pointer-events-none"
              checked={value.some((v) => v.value === propertyType.value)}
            />
            {propertyType.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export { PropertyTypeFilter };
