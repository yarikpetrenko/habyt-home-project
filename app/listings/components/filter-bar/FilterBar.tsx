import { PropertyTypeFilter } from "./PropertyTypeFilter";
import { MoveInDateFilter } from "./MoveInDateFilter";
import { PriceRangeFilter } from "./PriceRangeFilter";

function FilterBar() {
  return (
    <div className="mb-6 rounded-lg bg-white p-4 shadow">
      <h2 className="mb-4 text-lg font-semibold">Filter Listings</h2>
      <div className="flex w-full items-center">
        <MoveInDateFilter />
        <PropertyTypeFilter />
        <PriceRangeFilter />
      </div>
    </div>
  );
}

export { FilterBar };
