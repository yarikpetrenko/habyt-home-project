import { ResponseDTO } from "@/actions/common";
import { City } from "./city-schema";

export type GetCitiesResponse = ResponseDTO<City[], null>;
