import { ResponsePagination } from "@/actions/common";
import { Listing } from "@/actions/listings";
import { DEFAULT_RESPONSE_PAGINATION } from "@/constants";
import { useListingsQuery } from "@/data";
import { useEffect, useState } from "react";

const useListings = () => {
  const { data, error, isLoading, isValidating } = useListingsQuery();
  const [listings, setlistings] = useState<Listing[] | null>(null);
  const [pagination, setPagination] = useState<ResponsePagination>(
    DEFAULT_RESPONSE_PAGINATION,
  );

  useEffect(() => {
    if (isLoading || isValidating) {
      return;
    }
    if (data === undefined) {
      setlistings(null);
      setPagination(DEFAULT_RESPONSE_PAGINATION);
      return;
    }
    if (!data.ok) {
      setlistings(null);
      setPagination(DEFAULT_RESPONSE_PAGINATION);
      return;
    }
    setlistings(data.data);
    setPagination(data.metadata.pagination);
  }, [data, isLoading, isValidating]);

  return { listings, pagination, error, isLoading, isValidating };
};

export { useListings };
