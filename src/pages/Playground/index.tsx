import { Users } from 'phosphor-react';
import { useState } from 'react';
import { Autocomplete, Option } from '../../components/Autocomplete';
import { Button } from '../../components/Button';
import { Paper } from '../../components/Paper';
import { Text } from '../../components/Text';
import TextField from '../../components/TextField';

const autocompleteOptions = [
  { id: 1, label: 'Option 1' },
  { id: 2, label: 'Option 2' },
  { id: 3, label: 'Option 3' },
  { id: 4, label: 'Option 4' },
  { id: 5, label: 'Option 5' },
];

function Playground() {
  const [autocompleteValue, setAutocompleteValue] = useState<Option>(
    autocompleteOptions[0]
  );

  return (
    <div className="mx-auto flex max-w-[700px] flex-col">
      <Paper className="flex flex-col gap-2">
        <Text>Hello</Text>
        <Button>Test</Button>
        <Button secondary>Test</Button>

        <Autocomplete
          options={autocompleteOptions}
          value={autocompleteValue}
          onChange={setAutocompleteValue}
        />

        <TextField>
          <TextField.Input
            type="number"
            min={1}
            id="numberOfPassengers"
            placeholder="Number of passengers"
          />

          <TextField.Icon>
            <Users />
          </TextField.Icon>
        </TextField>
      </Paper>
    </div>
  );
}

export default Playground;
