import { useState } from 'react';
import { Autocomplete, Option } from '../../components/Autocomplete';
import { Button } from '../../components/Button';
import { Paper } from '../../components/Paper';
import { Text } from '../../components/Text';

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
    <div className="fixed h-full w-full bg-gradient-to-t from-gray2 to-background p-4">
      <div className="mx-auto flex max-w-[700px] flex-col">
        <Paper className="flex flex-col">
          <Text>Hello</Text>
          <Button>Test</Button>

          <Autocomplete
            options={autocompleteOptions}
            value={autocompleteValue}
            onChange={setAutocompleteValue}
          />
        </Paper>
      </div>
    </div>
  );
}

export default Playground;
