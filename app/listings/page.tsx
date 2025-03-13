"use client";

import { useSearchParams } from "next/navigation";
import { FilterBar } from "./components/filter-bar";
import { ListingCard } from "./components/listing-card";
import { useListings } from "@/hooks";

export default function Listings() {
  const searchParams = useSearchParams();
  const { listings, pagination, error, isLoading } = useListings();

  const handlePageChange = (page: number) => {
    // Create a new URLSearchParams object from the current one
    const params = new URLSearchParams(searchParams);
    // Update or add the page parameter
    params.set("page", page.toString());

    // Update the URL without reloading the page
    window.history.pushState(
      {},
      "",
      `${window.location.pathname}?${params.toString()}`,
    );

    // Manually trigger a new fetch since we're not using Next.js router to navigate
    const event = new Event("popstate");
    window.dispatchEvent(event);
  };

  return (
    <main className="mx-auto max-w-7xl p-4">
      {/* Filter section */}
      <FilterBar />

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

          {/* Pagination */}
          {pagination.totalPages > 1 && (
            <div className="my-6 flex justify-center">
              <div className="flex space-x-1">
                <button
                  onClick={() => handlePageChange(pagination.currentPage - 1)}
                  disabled={!pagination.hasPrevPage}
                  className={`rounded-md px-4 py-2 ${
                    pagination.hasPrevPage
                      ? "border border-gray-300 bg-white text-gray-800 hover:bg-gray-100"
                      : "cursor-not-allowed bg-gray-100 text-gray-400"
                  }`}
                >
                  Previous
                </button>

                {/* Page numbers */}
                {Array.from({ length: pagination.totalPages }, (_, i) => (
                  <button
                    key={i}
                    onClick={() => handlePageChange(i)}
                    className={`rounded-md px-4 py-2 ${
                      pagination.currentPage === i
                        ? "border border-blue-600 bg-blue-600 text-white"
                        : "border border-gray-300 bg-white text-gray-800 hover:bg-gray-100"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}

                <button
                  onClick={() => handlePageChange(pagination.currentPage + 1)}
                  disabled={!pagination.hasNextPage}
                  className={`rounded-md px-4 py-2 ${
                    pagination.hasNextPage
                      ? "border border-gray-300 bg-white text-gray-800 hover:bg-gray-100"
                      : "cursor-not-allowed bg-gray-100 text-gray-400"
                  }`}
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </main>
  );
}
