"use client";

import { FC, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const OPTIONS = [
  {
    value: "price-desc",
    label: "Price: High to low",
  },
  {
    value: "price-asc",
    label: "Price: Low to High",
  },
];

const ListingsSort: FC = () => {
  const [value, setValue] = useState<string>(OPTIONS[0].value);

  return (
    <div className="mb-6 flex w-full items-center justify-end">
      <Select value={value} onValueChange={setValue}>
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
