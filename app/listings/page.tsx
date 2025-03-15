import { Suspense } from "react";
import { FilterBar } from "./components/filter-bar";
import { LinstingMap } from "./components/linsting-map";
import { ListingsGrid } from "./components/listings-grid";
import { ListingsPagination } from "./components/listings-pagination";
import { ListingsSort } from "./components/listings-sort";

export default function Listings() {
  return (
    <main className="mx-auto max-w-7xl p-4">
      <FilterBar />
      <LinstingMap />
      <Suspense>
        <ListingsSort />
      </Suspense>
      <Suspense>
        <ListingsGrid />
      </Suspense>
      <Suspense>
        <ListingsPagination />
      </Suspense>
    </main>
  );
}
