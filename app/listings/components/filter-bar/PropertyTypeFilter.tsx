"use client";

import { FC, useCallback, useMemo, useState } from "react";
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
import { useListingsParams } from "@/hooks";
import { useDebouncedCallback } from "use-debounce";
import { Skeleton } from "@/components/ui/skeleton";

type Option = {
  label: string;
  value: string;
};

const PropertyTypeFilter: FC = () => {
  const { filter, applyFilter } = useListingsParams();

  const initValue = useMemo((): Option[] => {
    const arr: Option[] = [];

    filter.propertyType.forEach((value) => {
      const candidate = PROPERTY_TYPES.find((v) => v.value === value);
      if (!candidate) {
        return;
      }
      arr.push(candidate);
    });

    return arr;
  }, [filter.propertyType]);

  const [open, setOpen] = useState<boolean>(false);
  const [value, setValue] = useState<Option[]>(initValue);

  const debounced = useDebouncedCallback((propertyType: string[]) => {
    applyFilter({ page: null, propertyType });
  }, 400);

  const handleReset = useCallback(
    (event: Event) => {
      event.preventDefault();
      setValue([]);
      debounced([]);
      debounced.flush();
    },
    [debounced],
  );

  const handleSelect = useCallback(
    (event: Event, newValue: Option) => {
      event.preventDefault();
      setValue((oldValue) => {
        const result = [...oldValue];

        const candidateIndex = result.findIndex(
          (v) => v.value === newValue.value,
        );

        if (candidateIndex === -1) {
          result.push(newValue);
        } else {
          result.splice(candidateIndex, 1);
        }

        debounced(result.map((v) => v.value));

        return result;
      });
    },
    [debounced],
  );

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          label="Property Type"
          className="justify-between rounded-none"
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
      <DropdownMenuContent>
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

const PropertyTypeFilterFallback: FC = () => {
  return <Skeleton className="h-10 w-full" />;
};

export { PropertyTypeFilter, PropertyTypeFilterFallback };
