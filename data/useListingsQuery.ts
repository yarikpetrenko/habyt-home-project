import { GetListingsResponse } from "@/actions/listings";
import { createUrl } from "@/utils";
import { useSearchParams } from "next/navigation";
import useSWR, { Fetcher } from "swr";

const useListingsQuery = () => {
  const searchParams = useSearchParams();
  const { data, error, isLoading, isValidating, mutate } = useSWR(
    createUrl("/api/listings", searchParams),
    fetcher,
  );
  return { data, error, isLoading, isValidating, mutate };
};

const fetcher: Fetcher<GetListingsResponse, string> = async (url) => {
  const res = await fetch(url, {
    cache: "force-cache",
    next: { revalidate: 60 },
  });
  const resJson = await res.json();
  return resJson;
};

export { useListingsQuery };
