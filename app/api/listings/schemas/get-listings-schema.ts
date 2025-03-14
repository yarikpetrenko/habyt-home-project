import { RequestSortOrder } from "@/actions/common";
import { z } from "zod";

export const getListingsRequestSortParametersSchema = z.object({
  price: z.nativeEnum(RequestSortOrder).nullish(),
});
