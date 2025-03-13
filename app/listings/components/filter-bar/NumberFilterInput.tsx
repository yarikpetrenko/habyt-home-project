import { Input } from "@/components/ui/input";
import { clamp } from "@/utils";
import { ChangeEventHandler, FC, useCallback } from "react";

interface Props {
  value: number | null;
  setValue: (value: number | null) => void;
  label: string;
}

const NumberFilterInput: FC<Props> = ({ value, setValue, label }) => {
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

export { NumberFilterInput };
