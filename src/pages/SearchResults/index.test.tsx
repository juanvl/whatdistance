import { BrowserRouter, MemoryRouter, Route, Routes } from 'react-router-dom';
import { SearchResults } from '.';
import { render, screen, waitFor } from '../../test/utils/test-utils';
import { DefaultLayout } from '../_layouts/DefaultLayout';

describe('Search Results page', () => {
  it('should render error if no params provided', async () => {
    render(
      <BrowserRouter>
        <SearchResults />
      </BrowserRouter>
    );

    const text = await screen.findByText('We had problems ;(');

    expect(text).toBeInTheDocument();
  });

  it('should render results according to the params provided', async () => {
    render(
      <MemoryRouter
        initialEntries={[
          '/search?cityOfOrigin=Paris&intermediateCities=Angers%2CMarseille&cityOfDestination=Strasbourg&dateOfTheTrip=2023-03-10&numberOfPassengers=2',
        ]}
      >
        <Routes>
          <Route
            path="/search"
            element={
              <DefaultLayout>
                <SearchResults />
              </DefaultLayout>
            }
          />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(
      async () => {
        const text = await screen.findByText('Your trip');
        const date = await screen.findByText('3/10/2023');
        const totalKm = await screen.findByText('1537.69 km');

        expect(text).toBeInTheDocument();
        expect(date).toBeInTheDocument();
        expect(totalKm).toBeInTheDocument();
      },
      { timeout: 3000 }
    );
  });
});
