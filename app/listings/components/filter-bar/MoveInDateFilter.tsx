"use client";

import { FC, useCallback, useEffect, useState } from "react";

import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import moment from "moment";
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
  const { applyFilter } = useFilterListings();

  const [open, setOpen] = useState<boolean>(false);
  const [date, setDate] = useState<Date>(new Date());

  useEffect(() => {
    applyFilter({ moveInDate: moment(date).format("YYYY-MM-DD") });
  }, [date, applyFilter]);

  const handleSelect = useCallback((day: Date | undefined) => {
    if (!day) {
      setDate(new Date());
      return;
    }
    setDate(day);
    setOpen(false);
  }, []);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          label="Move-in Date"
          variant={"outline"}
          className={cn("w-[280px] justify-start text-left font-normal")}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleSelect}
          initialFocus
          disabled={(date) => date < moment().subtract(1, "day").toDate()}
        />
      </PopoverContent>
    </Popover>
  );
};

export { MoveInDateFilter };
