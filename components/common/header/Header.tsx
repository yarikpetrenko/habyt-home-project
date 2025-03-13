import { FC, Suspense } from "react";
import { CitySelect, CitySelectFallback } from "./CitySelect";

const Header: FC = () => {
  return (
    <header className="bg-background sticky top-0 z-10 border-b">
      <div className="mx-auto max-w-7xl p-4">
        <div className="flex items-center gap-x-8">
          <h1 className="text-3xl font-bold">Available Listings</h1>
          <Suspense fallback={<CitySelectFallback />}>
            <CitySelect />
          </Suspense>
        </div>
      </div>
    </header>
  );
};

export { Header };
