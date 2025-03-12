"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { PropertyTypeFilter } from "./PropertyTypeFilter";
import { MoveInDateFilter } from "./MoveInDateFilter";

function FilterBar() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Initialize state from URL parameters
  const [city, setCity] = useState<string>(searchParams.get("city") || "");
  const [rentFrom, setRentFrom] = useState<string>(
    searchParams.get("rentFrom") || "",
  );
  const [rentTo, setRentTo] = useState<string>(
    searchParams.get("rentTo") || "",
  );
  const [selectedShareTypes, setSelectedShareTypes] = useState<string[]>(() => {
    const params = searchParams.getAll("shareType");
    return params.length > 0 ? params : [];
  });
  const [bookableOn, setBookableOn] = useState<string>(
    searchParams.get("bookableOn") || "",
  );

  const applyFilters = () => {
    const params = new URLSearchParams();

    if (city) params.append("city", city);
    if (rentFrom) params.append("rentFrom", rentFrom);
    if (rentTo) params.append("rentTo", rentTo);
    if (bookableOn) params.append("bookableOn", bookableOn);

    // Add all selected share types
    selectedShareTypes.forEach((type) => {
      params.append("shareType", type);
    });

    router.push(`/listings?${params.toString()}`);
  };

  const resetFilters = () => {
    setCity("");
    setRentFrom("");
    setRentTo("");
    setSelectedShareTypes([]);
    setBookableOn("");
    router.push("/listings");
  };

  return (
    <div className="mb-6 rounded-lg bg-white p-4 shadow">
      <h2 className="mb-4 text-lg font-semibold">Filter Listings</h2>

      <div className="flex w-full items-center justify-between">
        <MoveInDateFilter />

        <PropertyTypeFilter />

        {/* Price range filter */}
        <div>
          <label
            htmlFor="rentFrom"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            Monthly Rent
          </label>
          <div className="flex items-center space-x-2">
            <input
              type="number"
              id="rentFrom"
              placeholder="Min"
              value={rentFrom}
              onChange={(e) => setRentFrom(e.target.value)}
              className="w-full rounded-md border border-gray-300 p-2"
            />
            <span>-</span>
            <input
              type="number"
              id="rentTo"
              placeholder="Max"
              value={rentTo}
              onChange={(e) => setRentTo(e.target.value)}
              className="w-full rounded-md border border-gray-300 p-2"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export { FilterBar };
