import { ArrowDown, ArrowLeft } from 'phosphor-react';
import { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { Heading } from '../../components/Heading';
import { Paper } from '../../components/Paper';
import { Spinner } from '../../components/Spinner';
import { Text } from '../../components/Text';
import {
  getDistancesBetweenCities,
  RouteDistancesResult,
} from '../../server/fakeApi';

export function SearchResults() {
  const location = useLocation();
  const [searchParams] = useSearchParams({});

  const [distancesResult, setDistancesResult] =
    useState<RouteDistancesResult>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const firstLoaded = useRef<boolean>(false);

  const getDateOfTheTrip = () => {
    const date = searchParams.get('dateOfTheTrip');

    if (date) {
      return new Date(date + 'T00:00').toLocaleDateString();
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

    getDistancesBetweenCities(cities)
      .then((res) => {
        setDistancesResult(res);
        firstLoaded.current = true;
      })
      .catch((err) => {
        setError(
          'We are sorry but it was not possible to calculate your trip with the data provided.'
        );
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [distancesResult, searchParams]);

  return (
    <Paper className="mx-auto flex max-w-[600px] flex-col">
      <Link
        to={{
          pathname: '/',
          search: location.search,
        }}
      >
        <Text className="flex items-center gap-1">
          <ArrowLeft /> Go back
        </Text>
      </Link>

      <div className="p-2" />

      {isLoading ? (
        <div className="flex flex-col items-center">
          <Heading>Calculating distances...</Heading>
          <div className="p-32">
            <Spinner size="lg" />
          </div>
        </div>
      ) : error ? (
        <div className="flex flex-col items-center">
          <Heading>We had problems ;(</Heading>
          <div className="p-32">
            <Text>{error}</Text>
          </div>
        </div>
      ) : (
        <>
          <Heading size="lg" className="text-center">
            Your trip
          </Heading>

          <div className="p-4" />

          <div className="mx-auto">
            <div className="flex flex-col gap-2 text-center">
              <Text className="text-xs font-bold text-gray1">
                Date of the trip
              </Text>
              <Text>{getDateOfTheTrip()}</Text>

              <Text className="text-xs font-bold text-gray1">
                Number of passengers
              </Text>
              <Text>{searchParams.get('numberOfPassengers') || '---'}</Text>

              <Text className="py-4 text-lg font-bold">Route</Text>

              {distancesResult?.routeDistances.map((item, idx) => (
                <div key={idx}>
                  <Text>{item.start}</Text>
                  <div className="flex items-center justify-end">
                    <ArrowDown size={30} />
                    <Text size="sm">{item.distanceInKilometers} km</Text>
                  </div>
                  {distancesResult.routeDistances.length - 1 === idx ? (
                    <Text>{item.end}</Text>
                  ) : (
                    <></>
                  )}
                </div>
              ))}

              <div className="p-2" />

              <Text size="lg">
                Total:{' '}
                <Text size="lg" className="font-bold">
                  {distancesResult?.totalDistanceInKilometers} km
                </Text>
              </Text>
            </div>
          </div>
        </>
      )}
    </Paper>
  );
}
