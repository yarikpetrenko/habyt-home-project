import { FilterBar } from "./components/filter-bar";
import { LinstingMap } from "./components/linsting-map";
import { ListingsGrid } from "./components/listings-grid";
import { ListingsPagination } from "./components/listings-pagination";
import { ListingsSort } from "./components/listings-sort/ListingsSort";

export default function Listings() {
  return (
    <main className="mx-auto max-w-7xl p-4">
      <FilterBar />
      <LinstingMap />
      <ListingsSort />
      {/* <ListingsGrid /> */}
      <ListingsPagination />
    </main>
  );
}
