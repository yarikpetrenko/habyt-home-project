import {
  RequestSortOrder,
  ResponseDTO,
  ResponsePagination,
} from "@/actions/common";
import { Listing } from "./listings-schema";

export interface GetListingsProps {
  page?: number;
  pageSize?: number;
  filter?: {
    bookable?: string | null;
    bookableOn?: string | null;
    bookableFrom?: string | null;
    bookableTo?: string | null;
    referenceId?: string | null;
    countryCodes?: string[] | null;
    cities?: string[] | null;
    shareTypes?: string[] | null;
    postalCode?: string | null;
    bedroomsFrom?: number | null;
    bedroomsTo?: number | null;
    rentFrom?: number | null;
    rentTo?: number | null;
  };
  sort?: {
    price?: RequestSortOrder;
  };
}

type GetListingsResponseMetadata = {
  pagination: ResponsePagination;
  filters?: {
    referenceId?: string;
  };
};

export type GetListingsResponse = ResponseDTO<
  Listing[],
  GetListingsResponseMetadata
>;
