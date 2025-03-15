import { Skeleton } from "@/components/ui/skeleton";
import { FC } from "react";

const ListingsPaginationFallback: FC = () => {
  return (
    <div className="my-6 flex justify-center">
      <Skeleton className="h-[42px] w-96 max-w-full" />
    </div>
  );
};

export { ListingsPaginationFallback };
