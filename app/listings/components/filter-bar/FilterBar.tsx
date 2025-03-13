import { PropertyTypeFilter } from "./PropertyTypeFilter";
import { MoveInDateFilter } from "./MoveInDateFilter";
import { PriceRangeFilter } from "./PriceRangeFilter";
import { AdvancedFilters } from "./AdvancedFilters";

function FilterBar() {
  return (
    <div className="mb-6 rounded-lg bg-white py-4">
      <h2 className="mb-4 text-lg font-semibold">Filter Listings</h2>
      <div className="flex w-full items-center gap-x-2">
        <div className="grid flex-1 grid-cols-3">
          <MoveInDateFilter />
          <PropertyTypeFilter />
          <PriceRangeFilter />
        </div>
        <AdvancedFilters />
      </div>
    </div>
  );
}

export { FilterBar };
