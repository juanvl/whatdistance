import { Users } from 'phosphor-react';
import { useState } from 'react';
import { AutocompleteAsync, Option } from '../../components/AutocompleteAsync';
import { Paper } from '../../components/Paper';
import TextField from '../../components/TextField';
import { getCitiesByKeyword } from '../../server/fakeApi';

export function Home() {
  const [cityOfOrigin, setCityOfOrigin] = useState<Option>();
  const [intermediateCity, setIntermediateCity] = useState<Option>();
  const [cityOfDestination, setCityOfDestination] = useState<Option>();
  const [dateOfTheTrip, setDateOfTheTrip] = useState('');
  const [numberOfPassengers, setNumberOfPassengers] = useState('');

  return (
    <div className="mx-auto flex max-w-[600px] flex-col">
      <Paper className="flex flex-col gap-2">
        <AutocompleteAsync
          label="City of origin*"
          getOptions={getCitiesByKeyword}
          value={cityOfOrigin}
          onChange={setCityOfOrigin}
        />

        <AutocompleteAsync
          label="Intermediate city"
          getOptions={getCitiesByKeyword}
          value={intermediateCity}
          onChange={setIntermediateCity}
        />

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
      </Paper>
    </div>
  );
}
