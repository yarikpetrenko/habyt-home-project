"use client";

import { useCallback, useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { createUrl } from "@/utils";

const useFilterListings = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const filter = useMemo((): {
    page: string | null;
    city: string | null;
    propertyType: string[];
    moveInDate: string | null;
    rentFrom: string | null;
    rentTo: string | null;
    bedroomsFrom: string | null;
  } => {
    return {
      page: searchParams.get("page"),
      city: searchParams.get("city"),
      propertyType: searchParams.getAll("shareType"),
      moveInDate: searchParams.get("bookableOn"),
      rentFrom: searchParams.get("rentFrom"),
      rentTo: searchParams.get("rentTo"),
      bedroomsFrom: searchParams.get("bedroomsFrom"),
    };
  }, [searchParams]);

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
      page,
      city,
      propertyType,
      moveInDate,
      rentFrom,
      rentTo,
      bedroomsFrom,
    }: {
      page?: string | null;
      city?: string | null;
      propertyType?: string[] | null;
      moveInDate?: string | null;
      rentFrom?: string | null;
      rentTo?: string | null;
      bedroomsFrom?: string | null;
    }) => {
      const newSearchParams = new URLSearchParams(searchParams);

      handleFilter("page", page, newSearchParams);
      handleFilter("city", city, newSearchParams);
      handleFilter("shareType", propertyType, newSearchParams);
      handleFilter("bookableOn", moveInDate, newSearchParams);
      handleFilter("rentFrom", rentFrom, newSearchParams);
      handleFilter("rentTo", rentTo, newSearchParams);
      handleFilter("bedroomsFrom", bedroomsFrom, newSearchParams);

      router.replace(createUrl(pathname, newSearchParams));
    },
    [router, pathname, searchParams, handleFilter],
  );

  return { filter, applyFilter };
};

export { useFilterListings };
