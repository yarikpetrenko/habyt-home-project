"use client";

import { useCallback, useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { createUrl } from "@/utils";

const useListingsParams = () => {
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

  const handleParam = useCallback(
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

      handleParam("page", page, newSearchParams);
      handleParam("city", city, newSearchParams);
      handleParam("shareType", propertyType, newSearchParams);
      handleParam("bookableOn", moveInDate, newSearchParams);
      handleParam("rentFrom", rentFrom, newSearchParams);
      handleParam("rentTo", rentTo, newSearchParams);
      handleParam("bedroomsFrom", bedroomsFrom, newSearchParams);

      router.replace(createUrl(pathname, newSearchParams));
    },
    [router, pathname, searchParams, handleParam],
  );

  return { filter, applyFilter };
};

export { useListingsParams };
