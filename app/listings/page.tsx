import { Suspense } from "react";
import { FilterBar } from "./components/filter-bar";
import { LinstingMap } from "./components/linsting-map";
import { ListingsGrid, ListingsGridFallback } from "./components/listings-grid";
import {
  ListingsPagination,
  ListingsPaginationFallback,
} from "./components/listings-pagination";
import { ListingsSort, ListingsSortFallback } from "./components/listings-sort";

export default function Listings() {
  return (
    <main className="mx-auto max-w-7xl p-4">
      <FilterBar />
      <LinstingMap />
      <Suspense fallback={<ListingsSortFallback />}>
        <ListingsSort />
      </Suspense>
      <Suspense fallback={<ListingsGridFallback />}>
        <ListingsGrid />
      </Suspense>
      <Suspense fallback={<ListingsPaginationFallback />}>
        <ListingsPagination />
      </Suspense>
    </main>
  );
}
