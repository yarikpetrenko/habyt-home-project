import {
  PropertyTypeFilter,
  PropertyTypeFilterFallback,
} from "./PropertyTypeFilter";
import { MoveInDateFilter, MoveInDateFilterFallback } from "./MoveInDateFilter";
import { PriceRangeFilter, PriceRangeFilterFallback } from "./PriceRangeFilter";
import { AdvancedFilters, AdvancedFiltersFallback } from "./AdvancedFilters";
import { Suspense } from "react";

function FilterBar() {
  return (
    <div className="mb-6 rounded-lg bg-white py-4">
      <h2 className="mb-4 text-lg font-semibold">Filter Listings</h2>
      <div className="flex w-full flex-col items-center gap-x-2 gap-y-4 md:flex-row">
        <div className="grid w-full grid-cols-1 grid-rows-3 gap-y-4 sm:grid-cols-2 sm:grid-rows-2 md:grid-cols-3 md:grid-rows-1">
          <Suspense fallback={<MoveInDateFilterFallback />}>
            <MoveInDateFilter />
          </Suspense>
          <Suspense fallback={<PropertyTypeFilterFallback />}>
            <PropertyTypeFilter />
          </Suspense>
          <Suspense fallback={<PriceRangeFilterFallback />}>
            <PriceRangeFilter />
          </Suspense>
        </div>
        <Suspense fallback={<AdvancedFiltersFallback />}>
          <AdvancedFilters />
        </Suspense>
      </div>
    </div>
  );
}

export { FilterBar };
