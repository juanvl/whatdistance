import { Users } from 'phosphor-react';
import { FormEvent, useEffect, useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { AutocompleteAsync, Option } from '../../components/AutocompleteAsync';
import { Button } from '../../components/Button';
import { Paper } from '../../components/Paper';
import TextField from '../../components/TextField';
import { getCitiesByKeyword } from '../../server/fakeApi';

export function Home() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams({});

  const [cityOfOrigin, setCityOfOrigin] = useState<Option | null>(() => {
    const param = searchParams.get('cityOfOrigin');
    return param ? { id: param, label: param } : null;
  });
  const [intermediateCities, setIntermediateCities] = useState<Option[]>(() => {
    const param = searchParams.get('intermediateCities');
    return param ? param.split(',').map((c) => ({ id: c, label: c })) : [];
  });
  const [cityOfDestination, setCityOfDestination] = useState<Option | null>(
    () => {
      const param = searchParams.get('cityOfDestination');
      return param ? { id: param, label: param } : null;
    }
  );
  const [dateOfTheTrip, setDateOfTheTrip] = useState(() => {
    const param = searchParams.get('dateOfTheTrip');
    return param || '';
  });
  const [numberOfPassengers, setNumberOfPassengers] = useState(() => {
    const param = searchParams.get('numberOfPassengers');
    return param || '';
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    navigate({
      pathname: '/search',
      search: location.search,
    });
  };

  const handleChangeIntermediateCities = ({
    option,
    idx,
  }: {
    option: Option;
    idx: number;
  }) => {
    const newIntermediateCities = intermediateCities.map((city, i) => {
      if (i === idx) {
        return option;
      }
      return city;
    });

    setIntermediateCities(newIntermediateCities);
  };

  const handleAddIntermediateCity = () => {
    setIntermediateCities((current) => [...current, { id: '', label: '' }]);
  };

  const handleRemoveIntermediateCity = (idx: number) => {
    const newIntermediateCities = [...intermediateCities];
    newIntermediateCities.splice(idx, 1);
    setIntermediateCities(newIntermediateCities);
  };

  useEffect(() => {
    const serializedFields = {
      cityOfOrigin: cityOfOrigin?.id || '',
      intermediateCities: intermediateCities.map((c) => c.id).join(','),
      cityOfDestination: cityOfDestination?.id || '',
      dateOfTheTrip,
      numberOfPassengers,
    };

    setSearchParams(new URLSearchParams(serializedFields));
  }, [
    cityOfDestination,
    intermediateCities,
    cityOfOrigin,
    dateOfTheTrip,
    numberOfPassengers,
    setSearchParams,
  ]);

  return (
    <Paper className="mx-auto flex max-w-[600px] flex-col">
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <AutocompleteAsync
          label="City of origin*"
          getOptions={getCitiesByKeyword}
          value={cityOfOrigin}
          onChange={setCityOfOrigin}
        />

        {intermediateCities.map((_, idx) => (
          <div key={idx} className="flex w-full items-end gap-2">
            <AutocompleteAsync
              label="Intermediate city"
              getOptions={getCitiesByKeyword}
              value={intermediateCities[idx]}
              onChange={(option) => {
                handleChangeIntermediateCities({ option, idx });
              }}
            />

            <button
              type="button"
              onClick={() => {
                handleRemoveIntermediateCity(idx);
              }}
              className="align-baseline text-xs font-bold text-green2 hover:underline"
            >
              Remove
            </button>
          </div>
        ))}

        <button
          type="button"
          onClick={handleAddIntermediateCity}
          className="self-start text-xs font-bold text-green2 hover:underline"
        >
          Add intermediate city
        </button>

        <AutocompleteAsync
          label="City of destination*"
          getOptions={getCitiesByKeyword}
          value={cityOfDestination}
          onChange={setCityOfDestination}
        />

        <TextField label="Date of the trip*">
          <TextField.Input
            type="date"
            id="dateOfTheTrip"
            placeholder="Date of the trip"
            value={dateOfTheTrip}
            onChange={(e) => {
              setDateOfTheTrip(e.target.value);
            }}
          />
        </TextField>

        <TextField label="Number of passengers*">
          <TextField.Input
            type="number"
            min={1}
            id="numberOfPassengers"
            placeholder="Number of passengers"
            value={numberOfPassengers}
            onChange={(e) => {
              setNumberOfPassengers(e.target.value);
            }}
          />

          <TextField.Icon>
            <Users />
          </TextField.Icon>
        </TextField>

        <Button type="submit" fullWidth>
          Search
        </Button>
      </form>
    </Paper>
  );
}
