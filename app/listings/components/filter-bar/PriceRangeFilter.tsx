"use client";

import { useListingsParams } from "@/hooks";
import { clamp } from "@/utils";
import { FC, useCallback, useMemo, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { NumberFilterInput } from "./NumberFilterInput";

const PriceRangeFilter: FC = () => {
  const { filter, applyFilter } = useListingsParams();

  const init = useMemo(() => {
    const parse = (value: string | null): number | null => {
      const newValue: number = value ? parseInt(value) : 0;
      if (!isFinite(newValue)) {
        return null;
      }
      const clampedValue: number = clamp(newValue, 0, Infinity);
      if (clampedValue === 0) {
        return null;
      }
      return clampedValue;
    };

    return {
      min: parse(filter.rentFrom),
      max: parse(filter.rentTo),
    };
  }, [filter.rentFrom, filter.rentTo]);

  const [min, setMin] = useState<number | null>(init.min);
  const [max, setMax] = useState<number | null>(init.max);

  const debounced = useDebouncedCallback(
    ({
      rentFrom,
      rentTo,
    }: {
      rentFrom?: string | null;
      rentTo?: string | null;
    }) => {
      applyFilter({ page: null, rentFrom, rentTo });
    },
    400,
  );

  const handleMin = useCallback(
    (value: number | null) => {
      setMin(value);
      debounced({ rentFrom: !value ? null : value.toString() });
    },
    [debounced],
  );

  const handleMax = useCallback(
    (value: number | null) => {
      setMax(value);
      debounced({ rentTo: !value ? null : value.toString() });
    },
    [debounced],
  );

  return (
    <div className="flex w-full sm:max-md:col-span-2">
      <NumberFilterInput value={min} setValue={handleMin} label="Price Min" />
      <NumberFilterInput value={max} setValue={handleMax} label="Price Max" />
    </div>
  );
};

export { PriceRangeFilter };
