"use server";

import fs from "fs";
import path from "path";
import { Listing } from "../listings";
import { City, GetCitiesResponse } from "./schemas";

export const getCities = async (): Promise<GetCitiesResponse> => {
  // Read the JSON file
  const filePath = path.join(process.cwd(), "public", "data.json");
  const fileContents = fs.readFileSync(filePath, "utf8");
  const data: { data: Listing[] } = JSON.parse(fileContents);

  const listings = data.data;

  // Get unique city names
  const cities = Array.from(
    new Set(listings.map((listing) => listing.city)),
  ).sort();

  // Build response cities objects
  const citiesData = cities.map((v): City => ({ name: v }));

  return {
    ok: true,
    data: citiesData,
    metadata: null,
  };
};
