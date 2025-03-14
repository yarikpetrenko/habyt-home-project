"use client";

import { Skeleton } from "@/components/ui/skeleton";
import dynamic from "next/dynamic";
import { FC } from "react";
const Content = dynamic(() => import("./Content").then((mod) => mod.Content), {
  ssr: false,
  loading: () => <LinstingMapFallback />,
});

const LinstingMap: FC = () => {
  return <Content />;
};

const LinstingMapFallback: FC = () => {
  return <Skeleton className="mt-4 mb-10 h-[250px] w-full" />;
};

export { LinstingMap, LinstingMapFallback };
