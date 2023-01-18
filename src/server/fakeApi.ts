import { cities, cities as citiesData } from './data';
import { getDistanceInKilometers, roundToTwo } from './utils';

export async function getCitiesByKeyword(keyword: string) {
  const results: Array<{ id: string; label: string }> = [];

  cities.forEach((city) => {
    const cityName = city[0];
    const sanitizedCityName = cityName.toLowerCase().replace(/\s+/g, '');
    const sanitizedQuery = keyword.toLowerCase().replace(/\s+/g, '');

    if (sanitizedCityName.includes(sanitizedQuery)) {
      results.push({
        id: cityName,
        label: cityName,
      });
    }
  });

  await new Promise((resolve) => setTimeout(resolve, 2000));

  return results;
}

export interface RouteDistancesResult {
  routeDistances: RouteDistance[];
  totalDistanceInKilometers: number;
}
export interface RouteDistance {
  start: string;
  end: string;
  distanceInKilometers: number;
}

export function getDistancesBetweenCities(
  cities: string[]
): RouteDistancesResult {
  const routeDistances = [];

  for (let i = 0; i < cities.length; i++) {
    if (i === cities.length - 1) {
      break;
    }

    const currentCity = citiesData.filter((c) => c[0] === cities[i])[0];
    const nextCity = citiesData.filter((c) => c[0] === cities[i + 1])[0];
    const pointA = { lat: currentCity[1], lng: currentCity[2] };
    const pointB = { lat: nextCity[1], lng: nextCity[2] };

    const distanceInKilometers = getDistanceInKilometers(pointA, pointB);

    routeDistances.push({
      start: currentCity[0],
      end: nextCity[0],
      distanceInKilometers: roundToTwo(distanceInKilometers),
    });
  }

  const totalDistanceInKilometers = routeDistances.reduce(
    (prev, current) => prev + current.distanceInKilometers,
    0
  );
  const totalRounded = roundToTwo(totalDistanceInKilometers);

  return {
    routeDistances,
    totalDistanceInKilometers: totalRounded,
  };
}
