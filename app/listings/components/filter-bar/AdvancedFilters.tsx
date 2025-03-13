"use client";

import { FC, useCallback, useMemo, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { SlidersHorizontal } from "lucide-react";
import { VisuallyHidden } from "@/components/ui/visually-hidden";
import { NumberFilterInput } from "./NumberFilterInput";
import { useDebouncedCallback } from "use-debounce";
import { useFilterListings } from "@/hooks";
import { clamp } from "@/utils";

const AdvancedFilters: FC = () => {
  const { filter, applyFilter } = useFilterListings();

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
      roomsFrom: parse(filter.bedroomsFrom),
    };
  }, [filter.bedroomsFrom]);

  const [open, setOpen] = useState<boolean>(false);
  const [roomsFrom, setRoomsFrom] = useState<number | null>(init.roomsFrom);

  const debounced = useDebouncedCallback((bedroomsFrom: string | null) => {
    applyFilter({ bedroomsFrom });
  }, 400);

  const handleApply = useCallback(() => {
    setOpen(false);
  }, []);

  const handleRoomsFrom = useCallback(
    (value: number | null) => {
      setRoomsFrom(value);
      debounced(!value ? null : value.toString());
    },
    [debounced],
  );

  const handleClearAll = useCallback(() => {
    handleRoomsFrom(null);
    debounced.flush();
    handleApply();
  }, [debounced, handleRoomsFrom, handleApply]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="text-base font-medium max-md:w-full"
        >
          Filters
          <SlidersHorizontal />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-2xl">Filters</DialogTitle>
          <VisuallyHidden asChild>
            <DialogDescription>
              Here you can set advanced filters
            </DialogDescription>
          </VisuallyHidden>
        </DialogHeader>
        <div className="pt-2">
          <div className="grid gap-y-4">
            <span className="text-base font-bold">Number of rooms</span>
            <NumberFilterInput
              value={roomsFrom}
              setValue={handleRoomsFrom}
              label="Rooms Min"
            />
          </div>
        </div>
        <DialogFooter className="!justify-between">
          <Button variant="link" onClick={handleClearAll}>
            Clear All
          </Button>
          <Button onClick={handleApply}>Apply</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export { AdvancedFilters };
