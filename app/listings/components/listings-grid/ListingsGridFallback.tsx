import { Skeleton } from "@/components/ui/skeleton";
import { FC } from "react";

const ListingsGridFallback: FC = () => {
  return <Skeleton className="h-[500px] w-full" />;
};

export { ListingsGridFallback };
