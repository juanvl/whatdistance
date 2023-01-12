import { Autocomplete } from '../../components/Autocomplete';
import { Button } from '../../components/Button';
import { Paper } from '../../components/Paper';
import { Text } from '../../components/Text';

function Playground() {
  return (
    <div className="fixed h-full w-full bg-gradient-to-t from-gray2 to-background p-4">
      <div className="mx-auto flex max-w-[700px] flex-col">
        <Paper className="flex flex-col">
          <Text>Hello</Text>
          <Button>Test</Button>

          <Autocomplete />
        </Paper>
      </div>
    </div>
  );
}

export default Playground;
