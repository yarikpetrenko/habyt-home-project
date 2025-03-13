import { Input } from "@/components/ui/input";
import { useFilterListings } from "@/hooks";
import { clamp } from "@/utils";
import {
  ChangeEventHandler,
  FC,
  useCallback,
  useEffect,
  useState,
} from "react";
import { useDebouncedCallback } from "use-debounce";

const PriceRangeFilter: FC = () => {
  const { applyFilter } = useFilterListings();

  const [min, setMin] = useState<number | null>(null);
  const [max, setMax] = useState<number | null>(null);

  const debounced = useDebouncedCallback(
    (rentFrom: string | null, rentTo: string | null) => {
      applyFilter({ rentFrom, rentTo });
    },
    400,
  );

  useEffect(() => {
    debounced(!min ? null : min.toString(), !max ? null : max.toString());
  }, [min, max, debounced]);

  return (
    <div className="flex">
      <PriceRangeFilterInput value={min} setValue={setMin} label="Price Min" />
      <PriceRangeFilterInput value={max} setValue={setMax} label="Price Max" />
    </div>
  );
};

interface PriceRangeFilterInputProps {
  value: number | null;
  setValue: (value: number | null) => void;
  label: string;
}

const PriceRangeFilterInput: FC<PriceRangeFilterInputProps> = ({
  value,
  setValue,
  label,
}) => {
  const handleInputChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      const targetValue = e.currentTarget.value.trim();
      const newValue: number = targetValue ? parseInt(targetValue) : 0;
      if (!isFinite(newValue)) {
        return;
      }
      const clampedValue: number = clamp(newValue, 0, Infinity);
      if (clampedValue === 0) {
        setValue(null);
        return;
      }
      setValue(clampedValue);
    },
    [setValue],
  );

  return (
    <Input
      label={label}
      className="rounded-none"
      value={value === null ? "" : value.toString()}
      onChange={handleInputChange}
    />
  );
};

export { PriceRangeFilter };
