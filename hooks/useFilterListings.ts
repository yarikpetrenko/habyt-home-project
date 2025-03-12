"use client";

import { useCallback } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { createUrl } from "@/utils";

const useFilterListings = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleFilter = useCallback(
    (
      label: string,
      value: string | string[] | null | undefined,
      searchParams: URLSearchParams,
    ) => {
      if (value === undefined) {
        return searchParams;
      }

      searchParams.delete(label);

      if (value === null) {
        return searchParams;
      }

      if (Array.isArray(value)) {
        value.forEach((v) => searchParams.append(label, v));
      } else {
        searchParams.append(label, value);
      }
    },
    [],
  );

  const applyFilter = useCallback(
    ({
      city,
      propertyType,
    }: {
      city?: string | null;
      propertyType?: string[] | null;
    }) => {
      const newSearchParams = new URLSearchParams(searchParams);

      handleFilter("city", city, newSearchParams);
      handleFilter("shareType", propertyType, newSearchParams);

      router.replace(createUrl(pathname, newSearchParams));
    },
    [router, pathname, searchParams, handleFilter],
  );

  return { applyFilter };
};

export { useFilterListings };
