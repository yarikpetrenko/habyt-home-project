"use client";

import { FC } from "react";
import { useListings } from "@/hooks";
import { ListingCard } from "../listing-card";

const ListingsGrid: FC = () => {
  const { listings, error, isLoading } = useListings();

  return (
    <>
      {/* Loading state */}
      {isLoading && (
        <div className="flex items-center justify-center py-12">
          <div className="h-12 w-12 animate-spin rounded-full border-t-2 border-b-2 border-blue-500"></div>
        </div>
      )}

      {/* Error state */}
      {error && !isLoading && (
        <div className="mb-6 rounded-md bg-red-100 p-4 text-red-500">
          {error}
        </div>
      )}

      {/* Empty state */}
      {!isLoading && !error && listings && listings.length === 0 && (
        <div className="rounded-lg bg-gray-50 py-12 text-center">
          <h3 className="mb-2 text-xl font-medium text-gray-600">
            No listings found
          </h3>
          <p className="text-gray-500">
            Try adjusting your filters to find more results.
          </p>
        </div>
      )}

      {/* Listings grid */}
      {!isLoading && !error && listings && listings.length > 0 && (
        <>
          <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {listings.map((listing) => (
              <ListingCard key={listing.referenceId} listing={listing} />
            ))}
          </div>
        </>
      )}
    </>
  );
};

export { ListingsGrid };
