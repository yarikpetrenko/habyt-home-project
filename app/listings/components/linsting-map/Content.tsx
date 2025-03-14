"use client";

import { FC, useEffect, useMemo } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import { Marker } from "@adamscybot/react-leaflet-component-marker";
import { useListings } from "@/hooks";
import { getPointsCentroid } from "@/utils";
import { Listing } from "@/actions/listings";
import { LatLngTuple } from "leaflet";

const Content: FC = () => {
  const { listings } = useListings();

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

  return (
    <div className="mt-4 mb-10 h-[250px] w-full">
      <MapContainer
        center={markersCentroid}
        zoom={12}
        scrollWheelZoom={false}
        className="z-10 h-full w-full"
      >
        <Recenter centroid={markersCentroid} />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {(listings ?? []).map((listing) => (
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

interface RecenterProps {
  centroid: LatLngTuple;
}

const Recenter: FC<RecenterProps> = ({ centroid }) => {
  const map = useMap();

  useEffect(() => {
    map.setView(centroid);
  }, [map, centroid]);

  return null;
};

export { Content };
