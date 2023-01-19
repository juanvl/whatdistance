import { Users } from 'phosphor-react';
import { Button } from '../../components/Button';
import { Paper } from '../../components/Paper';
import { Text } from '../../components/Text';
import TextField from '../../components/TextField';

function Playground() {
  return (
    <div className="mx-auto flex max-w-[700px] flex-col">
      <Paper className="flex flex-col gap-2">
        <Text>Hello</Text>
        <Button>Test</Button>
        <Button secondary>Test</Button>

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
