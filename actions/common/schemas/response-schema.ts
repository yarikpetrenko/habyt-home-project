type GoodRespons<T, U> = {
  ok: true;
  data: T;
  metadata: U;
};

type BadResponse = {
  ok: false;
  error: string;
};

export type ResponsePagination = {
  currentPage: number;
  currentPageSize: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
};

export type ResponseDTO<T, U> = GoodRespons<T, U> | BadResponse;
