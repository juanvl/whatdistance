import haversine from 'haversine-distance';

interface Point {
  lat: number;
  lng: number;
}

export function getDistanceInKilometers(pointA: Point, pointB: Point) {
  const result = haversine(pointA, pointB) / 1000;

  return result;
}

export function roundToTwo(num: number) {
  const result = Math.round((num + Number.EPSILON) * 100) / 100;
  return result;
}
