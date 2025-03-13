"use client";

import { FC, useCallback, useMemo, useState } from "react";
import { Calendar as CalendarIcon } from "lucide-react";
import moment, { Moment } from "moment";
import { cn } from "@/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useFilterListings } from "@/hooks";

const MoveInDateFilter: FC = () => {
  const { filter, applyFilter } = useFilterListings();

  const isDateDisabled = useCallback((date: Date | Moment) => {
    const momentDate = date instanceof Date ? moment(date) : date;
    return momentDate.isBefore(moment().subtract(1, "day"));
  }, []);

  const initDate = useMemo((): Date => {
    try {
      const value = moment(filter.moveInDate);
      if (isDateDisabled(value) || !value.isValid()) {
        throw new Error("Invalid date");
      }
      return value.toDate();
    } catch {
      return new Date();
    }
  }, [filter.moveInDate, isDateDisabled]);

  const [open, setOpen] = useState<boolean>(false);
  const [date, setDate] = useState<Date>(initDate);

  const handleSelect = useCallback(
    (day: Date | undefined) => {
      const newDate = day ?? new Date();
      setDate(newDate);
      setOpen(false);
      applyFilter({ moveInDate: moment(newDate).format("YYYY-MM-DD") });
    },
    [applyFilter],
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          label="Move-in Date"
          variant={"outline"}
          className={cn("justify-start rounded-none text-left font-normal")}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? (
            moment(date).format("MMMM Do, YYYY")
          ) : (
            <span>Pick a date</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleSelect}
          initialFocus
          disabled={isDateDisabled}
        />
      </PopoverContent>
    </Popover>
  );
};

export { MoveInDateFilter };
