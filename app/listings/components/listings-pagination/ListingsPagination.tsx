"use client";

import { FC, useCallback, useMemo } from "react";
import { useListings } from "@/hooks";
import { useSearchParams } from "next/navigation";
import { generatePaginationPages } from "@/utils";

const ListingsPagination: FC = () => {
  const searchParams = useSearchParams();
  const { pagination } = useListings();

  const pages = useMemo(
    () =>
      generatePaginationPages(
        pagination.currentPage + 1,
        pagination.totalPages,
        1,
      ),
    [pagination.currentPage, pagination.totalPages],
  );

  const handlePageChange = useCallback(
    (page: number) => {
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
    },
    [searchParams],
  );

  return (
    <>
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
            {pages.map((page, i) => (
              <button
                key={i}
                onClick={() => handlePageChange(Math.abs(page) - 1)}
                className={`rounded-md px-4 py-2 ${
                  pagination.currentPage === page - 1
                    ? "border border-blue-600 bg-blue-600 text-white"
                    : "border border-gray-300 bg-white text-gray-800 hover:bg-gray-100"
                }`}
              >
                {page < 0 ? "..." : page}
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
  );
};

export { ListingsPagination };
