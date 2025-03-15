"use client";

import { FC, useCallback, useMemo, useState } from "react";
import { useListingsParams } from "@/hooks";
import { RequestSortOrder } from "@/actions/common";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { cn } from "@/utils";

const OPTIONS = [
  {
    value: "price-desc",
    label: "Price: High to low",
  },
  {
    value: "price-asc",
    label: "Price: Low to High",
  },
] as const;

type SortValue = (typeof OPTIONS)[number]["value"];

const ListingsSort: FC = () => {
  const { sort, applySort } = useListingsParams();
  const [open, setOpen] = useState<boolean>(false);

  const initValue = useMemo((): SortValue => {
    if (sort.price === RequestSortOrder.ASC) {
      return "price-asc";
    }
    return "price-desc";
  }, [sort.price]);

  const [value, setValue] = useState<SortValue>(initValue);

  const label = useMemo(() => {
    const option = OPTIONS.find((v) => v.value === value);
    if (!option) {
      return "";
    }
    return option.label;
  }, [value]);

  const handleSelect = useCallback(
    (event: Event, value: SortValue) => {
      setValue(value);
      switch (value) {
        case "price-desc":
          applySort({ page: null, price: null });
          break;
        case "price-asc":
          applySort({ page: null, price: RequestSortOrder.ASC });
          break;
        default:
          break;
      }
    },
    [applySort],
  );

  return (
    <div className="mb-6 flex w-full items-center justify-end">
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            label="Sort"
            className="justify-between rounded-none"
          >
            <span>{label}</span>
            <ChevronDown
              className={cn(
                "opacity-50 transition-transform",
                open && "rotate-180",
              )}
            />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {OPTIONS.map((option) => (
            <DropdownMenuItem
              key={option.value}
              onSelect={(e) => handleSelect(e, option.value)}
            >
              {option.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export { ListingsSort };
