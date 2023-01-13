import { cities } from './data';

export async function getCitiesByKeyword(keyword: string) {
  const results: Array<{ id: string; label: string }> = [];

  cities.forEach((city) => {
    const cityName = city[0] as string;
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

export function getDistancesBetweenCities(cities: string[]) {
  return [];
}
