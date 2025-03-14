import { FilterBar } from "./components/filter-bar";
import { LinstingMap } from "./components/linsting-map";
import { ListingsGrid } from "./components/listings-grid";
import { ListingsSort } from "./components/listings-sort/ListingsSort";
import { Pagination } from "./components/pagination";

export default function Listings() {
  return (
    <main className="mx-auto max-w-7xl p-4">
      <FilterBar />
      <LinstingMap />
      <ListingsSort />
      <ListingsGrid />
      <Pagination />
    </main>
  );
}
