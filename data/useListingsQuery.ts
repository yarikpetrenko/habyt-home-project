import { GetListingsResponse } from "@/actions/listings/schemas";
import { createUrl } from "@/utils";
import { useSearchParams } from "next/navigation";
import useSWR, { Fetcher } from "swr";

const useListingsQuery = () => {
  const searchParams = useSearchParams();
  const { data, error, isLoading, isValidating, mutate } = useSWR(
    ["/api/listings", searchParams],
    fetcher,
  );
  return { data, error, isLoading, isValidating, mutate };
};

const fetcher: Fetcher<
  GetListingsResponse,
  [string, URLSearchParams]
> = async ([path, params]) => {
  const res = await fetch(createUrl(path, params));
  const resJson = await res.json();
  return resJson;
};

export { useListingsQuery };
