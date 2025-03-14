import { LatLngTuple } from "leaflet";

export const getPointsCentroid = (points: LatLngTuple[]): LatLngTuple => {
  let latitude = 0;
  let longitude = 0;
  const n = points.length;

  if (n === 0) {
    return [0, 0];
  }

  for (const point of points) {
    latitude += point[0];
    longitude += point[1];
  }

  return [latitude / n, longitude / n];
};
