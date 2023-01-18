import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Heading } from '../../components/Heading';
import { Paper } from '../../components/Paper';
import { Spinner } from '../../components/Spinner';
import { Text } from '../../components/Text';
import {
  getDistancesBetweenCities,
  RouteDistancesResult,
} from '../../server/fakeApi';

export function SearchResults() {
  const [searchParams] = useSearchParams({});

  const [distancesResult, setDistancesResult] =
    useState<RouteDistancesResult>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const firstLoaded = useRef<boolean>(false);

  const getDateOfTheTrip = () => {
    const date = searchParams.get('dateOfTheTrip');

    if (date) {
      return new Date(date).toLocaleDateString();
    } else {
      return '---';
    }
  };

  useEffect(() => {
    if (firstLoaded.current) {
      return;
    }

    const cityOfOriginParam = searchParams.get('cityOfOrigin');
    const intermediateCitiesParam = searchParams.get('intermediateCities');
    const cityOfDestinationParam = searchParams.get('cityOfDestination');

    const cities = [];
    cities.push(cityOfOriginParam as string);
    if (intermediateCitiesParam) {
      const intermediateCities = intermediateCitiesParam.split(',');
      cities.push(...intermediateCities);
    }
    cities.push(cityOfDestinationParam as string);

    const result = getDistancesBetweenCities(cities);
    setDistancesResult(result);
    firstLoaded.current = true;
    setIsLoading(false);
  }, [distancesResult, searchParams]);

  return (
    <Paper className="mx-auto flex max-w-[600px] flex-col">
      {isLoading ? (
        <Spinner />
      ) : error ? (
        <Text>There was a problem calculating your trip ;(</Text>
      ) : (
        <>
          <Heading size="lg" className="text-center">
            Your trip
          </Heading>

          <div className="p-2" />

          <div className="flex flex-col gap-2">
            <div className="flex flex-col">
              <Text className="font-bold">Date of the trip</Text>
              <Text>{getDateOfTheTrip()}</Text>
            </div>

            <div className="flex flex-col">
              <Text className="font-bold">Number of passengers</Text>
              <Text>{searchParams.get('numberOfPassengers') || '---'}</Text>
            </div>

            <div className="flex flex-col">
              <Text className="font-bold">Route</Text>

              {distancesResult?.routeDistances.map((item, idx) => (
                <div key={idx}>
                  <Text>
                    {item.start} to {item.end}: {item.distanceInKilometers} KM
                  </Text>
                </div>
              ))}

              <Heading size="sm">
                Total: {distancesResult?.totalDistanceInKilometers} KM
              </Heading>
            </div>
          </div>
        </>
      )}
    </Paper>
  );
}
