"use client";

import { FC, useCallback, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useListingsParams } from "@/hooks";
import { RequestSortOrder } from "@/actions/common";

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
  const { applySort } = useListingsParams();
  const [value, setValue] = useState<SortValue>(OPTIONS[0].value);

  const handleSelect = useCallback(
    (value: SortValue) => {
      setValue(value);
      switch (value) {
        case "price-desc":
          applySort({ price: null });
          break;
        case "price-asc":
          applySort({ price: RequestSortOrder.ASC });
          break;
        default:
          break;
      }
    },
    [applySort],
  );

  return (
    <div className="mb-6 flex w-full items-center justify-end">
      <Select value={value} onValueChange={handleSelect}>
        <SelectTrigger>
          <SelectValue placeholder="Sort" />
        </SelectTrigger>
        <SelectContent>
          {OPTIONS.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export { ListingsSort };
