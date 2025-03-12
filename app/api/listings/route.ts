import { NextRequest, NextResponse } from "next/server";
import { GetListingsResponse } from "@/actions/listings/schemas";
import { getListings } from "@/actions/listings";

export async function GET(
  request: NextRequest,
): Promise<NextResponse<GetListingsResponse>> {
  // Get URL search parameters for filtering
  const searchParams = request.nextUrl.searchParams;

  // Filter parameters based on OpenAPI spec
  const page = parseInt(searchParams.get("page") || "0");
  const pageSize = parseInt(searchParams.get("pageSize") || "100");
  const bookable = searchParams.get("bookable");
  const bookableOn = searchParams.get("bookableOn");
  const bookableFrom = searchParams.get("bookableFrom");
  const bookableTo = searchParams.get("bookableTo");
  const referenceId = searchParams.get("referenceId");
  const countryCodes = searchParams.getAll("countryCode");
  const cities = searchParams.getAll("city");
  const shareTypes = searchParams.getAll("shareType");
  const postalCode = searchParams.get("postalCode");
  const bedroomsFrom = searchParams.get("bedroomsFrom")
    ? parseInt(searchParams.get("bedroomsFrom")!)
    : null;
  const bedroomsTo = searchParams.get("bedroomsTo")
    ? parseInt(searchParams.get("bedroomsTo")!)
    : null;
  const rentFrom = searchParams.get("rentFrom")
    ? parseFloat(searchParams.get("rentFrom")!)
    : null;
  const rentTo = searchParams.get("rentTo")
    ? parseFloat(searchParams.get("rentTo")!)
    : null;

  // Get listings using action
  const res = await getListings({
    page,
    pageSize,
    filter: {
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
    },
  });

  // Return the filtered data as JSON
  return NextResponse.json(res);
}
