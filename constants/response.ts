import { ResponsePagination } from "@/actions/common";

export const DEFAULT_RESPONSE_PAGINATION: ResponsePagination = {
  currentPage: 0,
  currentPageSize: 0,
  totalPages: 0,
  hasNextPage: false,
  hasPrevPage: false,
};
