"use server";

import { GetListingsProps, GetListingsResponse, Listing } from "./schemas";
import fs from "fs";
import path from "path";

export const getListings = async ({
  page = 0,
  pageSize = 100,
  filter = {},
}: GetListingsProps): Promise<GetListingsResponse> => {
  try {
    // Read the JSON file
    const filePath = path.join(process.cwd(), "public", "data.json");
    const fileContents = fs.readFileSync(filePath, "utf8");
    const data: { data: Listing[] } = JSON.parse(fileContents);

    const {
      bookable,
      bookableOn,
      bookableFrom,
      bookableTo,
      referenceId,
      countryCodes,
      cities,
      shareTypes,
      postalCode,
      bedroomsFrom,
      bedroomsTo,
      rentFrom,
      rentTo,
    } = filter;

    // Apply filters to the data
    let filteredData = [...data.data];

    if (bookable === "true") {
      filteredData = filteredData.filter((listing) => listing.bookable);
    } else if (bookable === "false") {
      filteredData = filteredData.filter((listing) => !listing.bookable);
    }

    if (bookableOn) {
      filteredData = filteredData.filter((listing) => {
        const bookableDate = new Date(bookableOn);
        const from = new Date(listing.bookingWindow.bookableFrom);
        const to = new Date(listing.bookingWindow.bookableTo);
        return bookableDate >= from && bookableDate <= to;
      });
    }

    if (bookableFrom) {
      filteredData = filteredData.filter((listing) => {
        const date = new Date(bookableFrom);
        const to = new Date(listing.bookingWindow.bookableTo);
        return date <= to;
      });
    }

    if (bookableTo) {
      filteredData = filteredData.filter((listing) => {
        const date = new Date(bookableTo);
        const from = new Date(listing.bookingWindow.bookableFrom);
        return date >= from;
      });
    }

    if (referenceId) {
      filteredData = filteredData.filter(
        (listing) => listing.referenceId === referenceId,
      );
    }

    if (countryCodes && countryCodes.length > 0) {
      filteredData = filteredData.filter((listing) =>
        countryCodes.includes(listing.countryCode),
      );
    }

    if (cities && cities.length > 0) {
      filteredData = filteredData.filter((listing) =>
        cities.includes(listing.city),
      );
    }

    if (shareTypes && shareTypes.length > 0) {
      filteredData = filteredData.filter((listing) =>
        shareTypes.includes(listing.shareType),
      );
    }

    if (postalCode) {
      filteredData = filteredData.filter(
        (listing) => listing.propertyPostalCode === postalCode,
      );
    }

    if (bedroomsFrom !== undefined && bedroomsFrom !== null) {
      filteredData = filteredData.filter(
        (listing) => listing.apartmentBedroomCount >= bedroomsFrom,
      );
    }

    if (bedroomsTo !== undefined && bedroomsTo !== null) {
      filteredData = filteredData.filter(
        (listing) => listing.apartmentBedroomCount <= bedroomsTo,
      );
    }

    if (rentFrom !== undefined && rentFrom !== null) {
      filteredData = filteredData.filter(
        (listing) => listing.rentNet >= rentFrom,
      );
    }

    if (rentTo !== undefined && rentTo !== null) {
      filteredData = filteredData.filter(
        (listing) => listing.rentNet <= rentTo,
      );
    }

    // Apply pagination
    const startIndex = page * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedData = filteredData.slice(startIndex, endIndex);

    // Build response with metadata and paginated data
    const response: GetListingsResponse = {
      ok: true,
      data: paginatedData,
      metadata: {
        pagination: {
          currentPage: page,
          currentPageSize: paginatedData.length,
          totalPages: Math.ceil(filteredData.length / pageSize),
          hasNextPage: endIndex < filteredData.length,
          hasPrevPage: page > 0,
        },
        filters: referenceId ? { referenceId } : {},
      },
    };

    return response;
  } catch (error) {
    console.error("Error fetching listings data:", error);
    return {
      ok: false,
      error: "Failed to fetch listings data",
    };
  }
};
