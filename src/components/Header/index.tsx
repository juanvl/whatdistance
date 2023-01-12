import { Link } from 'react-router-dom';
import { Heading } from '../Heading';

export function Header() {
  return (
    <div className="flex h-[69px] w-full items-center justify-center bg-white px-12 py-6">
      <Link to="/">
        <Heading size="sm">
          What
          <b className="text-green2">Distance</b>
        </Heading>
      </Link>
    </div>
  );
}
