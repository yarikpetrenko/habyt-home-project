import { PropertyTypeFilter } from "./PropertyTypeFilter";
import { MoveInDateFilter } from "./MoveInDateFilter";
import { PriceRangeFilter } from "./PriceRangeFilter";
import { AdvancedFilters } from "./AdvancedFilters";

function FilterBar() {
  return (
    <div className="mb-6 rounded-lg bg-white py-4">
      <h2 className="mb-4 text-lg font-semibold">Filter Listings</h2>
      <div className="flex w-full flex-col items-center gap-x-2 gap-y-4 md:flex-row">
        <div className="grid w-full grid-cols-1 grid-rows-3 gap-y-4 sm:grid-cols-2 sm:grid-rows-2 md:grid-cols-3 md:grid-rows-1">
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
