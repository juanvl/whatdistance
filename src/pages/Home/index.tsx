import { Users } from 'phosphor-react';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { AutocompleteAsync, Option } from '../../components/AutocompleteAsync';
import { Button } from '../../components/Button';
import { Paper } from '../../components/Paper';
import { Text } from '../../components/Text';
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
  const [formErrors, setFormErrors] = useState<any>();

  const validateForm = () => {
    const errors: any = {};
    const requiredMessage = 'This field is required';

    if (!cityOfOrigin) errors.cityOfOrigin = requiredMessage;
    if (!cityOfDestination) errors.cityOfDestination = requiredMessage;
    if (!dateOfTheTrip) errors.dateOfTheTrip = requiredMessage;
    if (!numberOfPassengers) errors.numberOfPassengers = requiredMessage;

    const intermediateCitiesErrors = [];
    for (let i = 0; i < intermediateCities.length; i++) {
      if (!intermediateCities[i].id)
        intermediateCitiesErrors[i] = requiredMessage;
    }

    if (intermediateCitiesErrors.length > 0) {
      errors.intermediateCities = intermediateCitiesErrors;
    }

    const date = new Date(dateOfTheTrip);
    if (date && date <= new Date()) {
      errors.dateOfTheTrip = 'Must be a future date';
    }

    if (Object.keys(errors).length) {
      return errors;
    }

    return null;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const errors = validateForm();

    if (errors) {
      console.log(errors);
      setFormErrors(errors);
      return;
    }

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
          label="City of origin"
          getOptions={getCitiesByKeyword}
          value={cityOfOrigin}
          onChange={setCityOfOrigin}
        />
        {formErrors?.cityOfOrigin ? (
          <Text size="sm" className="text-error">
            {formErrors.cityOfOrigin}
          </Text>
        ) : (
          <></>
        )}

        {intermediateCities.map((item, idx) => (
          <div key={`${item.id}${idx}`}>
            <div className="flex w-full items-end gap-2">
              <AutocompleteAsync
                label={`Intermediate city ${idx + 1}`}
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

            {formErrors?.intermediateCities &&
            formErrors?.intermediateCities[idx] ? (
              <Text size="sm" className="text-error">
                {formErrors.intermediateCities[idx]}
              </Text>
            ) : (
              <></>
            )}
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
          label="City of destination"
          getOptions={getCitiesByKeyword}
          value={cityOfDestination}
          onChange={setCityOfDestination}
        />
        {formErrors?.cityOfDestination ? (
          <Text size="sm" className="text-error">
            {formErrors.cityOfDestination}
          </Text>
        ) : (
          <></>
        )}

        <TextField label="Date of the trip">
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
        {formErrors?.dateOfTheTrip ? (
          <Text size="sm" className="text-error">
            {formErrors.dateOfTheTrip}
          </Text>
        ) : (
          <></>
        )}

        <TextField label="Number of passengers">
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
        {formErrors?.numberOfPassengers ? (
          <Text size="sm" className="text-error">
            {formErrors.numberOfPassengers}
          </Text>
        ) : (
          <></>
        )}

        <Button type="submit" fullWidth>
          Search
        </Button>
      </form>
    </Paper>
  );
}
