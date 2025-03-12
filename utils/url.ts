import { ReadonlyURLSearchParams } from "next/navigation";

export const createUrl = (
  pathname: string,
  params: URLSearchParams | ReadonlyURLSearchParams,
): string => {
  const paramsString = params.toString();
  const queryString = `${paramsString.length ? "?" : ""}${paramsString}`;

  return `${pathname}${queryString}`;
};
