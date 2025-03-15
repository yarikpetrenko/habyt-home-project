import { Skeleton } from "@/components/ui/skeleton";
import { FC } from "react";

const ListingsSortFallback: FC = () => {
  return (
    <div className="mb-6 flex w-full items-center justify-end">
      <Skeleton className="h-10 w-40" />
    </div>
  );
};

export { ListingsSortFallback };
