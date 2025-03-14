"use client";

import { FC, useMemo } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import { Marker } from "@adamscybot/react-leaflet-component-marker";
import { useListings } from "@/hooks";
import { LinstingMapFallback } from "./LinstingMap";
import { getPointsCentroid } from "@/utils";
import { Listing } from "@/actions/listings/schemas";

const Content: FC = () => {
  const { listings, isLoading } = useListings();

  const markersCentroid = useMemo(
    () =>
      getPointsCentroid(
        (listings ?? []).map((listing) => [
          listing.propertyLatitude,
          listing.propertyLongitude,
        ]),
      ),
    [listings],
  );

  if (!listings || isLoading) {
    return <LinstingMapFallback />;
  }

  return (
    <div className="mt-4 mb-10 h-[250px] w-full">
      <span className="bg-white px-2 py-1 text-nowrap" />
      <MapContainer
        center={markersCentroid}
        zoom={12}
        scrollWheelZoom={false}
        className="h-full w-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {listings.map((listing) => (
          <Marker
            key={listing.referenceId}
            position={[listing.propertyLatitude, listing.propertyLongitude]}
            icon={<MarkerIcon listing={listing} />}
          />
        ))}
      </MapContainer>
    </div>
  );
};

interface MarkerIconProps {
  listing: Listing;
}

const MarkerIcon: FC<MarkerIconProps> = ({ listing }) => {
  const text = useMemo(() => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: listing.currency || "EUR",
      maximumFractionDigits: 0,
      currencyDisplay: "narrowSymbol",
    }).format(listing.rentNet);
  }, [listing]);

  return (
    <div className="border border-black bg-white px-2 py-1 font-bold text-nowrap">
      {text}
    </div>
  );
};

export { Content };
