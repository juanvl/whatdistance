import { BrowserRouter, MemoryRouter, Route, Routes } from 'react-router-dom';
import { Home } from '.';
import {
  fireEvent,
  render,
  screen,
  userEvent,
} from '../../test/utils/test-utils';
import { DefaultLayout } from '../_layouts/DefaultLayout';

describe('Home page', () => {
  afterEach(() => {
    window.history.pushState(null, document.title, '/');
  });

  it('should render', () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );

    const text = screen.getByText('City of origin');
    const button = screen.getByText('Search');

    expect(text).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  it('should be able to submit a valid form with only required fields filled in', async () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );

    const cityOfOrigin = screen.getByLabelText(/city of origin/i);
    await userEvent.type(cityOfOrigin, 'Paris');
    const parisOption = await screen.findByRole('option', {
      name: /paris/i,
    });
    await userEvent.click(parisOption);

    const cityOfDestination = screen.getByLabelText(/city of destination/i);
    await userEvent.type(cityOfDestination, 'Nantes');
    const nantesOption = await screen.findByRole('option', {
      name: /nantes/i,
    });
    await userEvent.click(nantesOption);

    const dateOfTheTrip = screen.getByPlaceholderText(/date of the trip/i);
    fireEvent.change(dateOfTheTrip, { target: { value: '2099-12-12' } });

    const numberOfPassengers =
      screen.getByPlaceholderText(/number of passengers/i);
    fireEvent.change(numberOfPassengers, { target: { value: 3 } });

    const submitButton = screen.getByRole('button', {
      name: /search/i,
    });

    expect(cityOfOrigin).toHaveValue('Paris');
    expect(cityOfDestination).toHaveValue('Nantes');
    expect(dateOfTheTrip).toHaveValue('2099-12-12');
    expect(numberOfPassengers).toHaveValue(3);

    await userEvent.click(submitButton);

    expect(global.window.location.pathname).toContain('/search');
    expect(global.window.location.search).toContain('cityOfOrigin=Paris');
    expect(global.window.location.search).toContain('cityOfDestination=Nantes');
    expect(global.window.location.search).toContain('dateOfTheTrip=2099-12-12');
    expect(global.window.location.search).toContain('numberOfPassengers=3');
  });

  it('should NOT be able to submit a INVALID form with only required fields filled in', async () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );

    const cityOfOrigin = screen.getByLabelText(/city of origin/i);
    await userEvent.type(cityOfOrigin, 'Paris');
    const parisOption = await screen.findByRole('option', {
      name: /paris/i,
    });
    await userEvent.click(parisOption);

    const cityOfDestination = screen.getByLabelText(/city of destination/i);
    await userEvent.type(cityOfDestination, 'Nantes');
    const nantesOption = await screen.findByRole('option', {
      name: /nantes/i,
    });
    await userEvent.click(nantesOption);

    const numberOfPassengers =
      screen.getByPlaceholderText(/number of passengers/i);
    fireEvent.change(numberOfPassengers, { target: { value: 3 } });

    const submitButton = screen.getByRole('button', {
      name: /search/i,
    });

    expect(cityOfOrigin).toHaveValue('Paris');
    expect(cityOfDestination).toHaveValue('Nantes');
    expect(numberOfPassengers).toHaveValue(3);

    await userEvent.click(submitButton);

    const requiredDateError = await screen.findByText(
      /this field is required/i
    );

    expect(requiredDateError).toBeInTheDocument();
    expect(global.window.location.pathname).not.toContain('/search');
  });

  it('should be able to submit a valid form with multiple intermediate cities', async () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );

    const cityOfOrigin = screen.getByLabelText(/city of origin/i);
    await userEvent.type(cityOfOrigin, 'Paris');
    const parisOption = await screen.findByRole('option', {
      name: /paris/i,
    });
    await userEvent.click(parisOption);

    const addIntermediateCityBtn = screen.getByRole('button', {
      name: /add intermediate city/i,
    });
    await userEvent.click(addIntermediateCityBtn);
    await userEvent.click(addIntermediateCityBtn);

    const intermediateCity1 = screen.getByLabelText(/intermediate city 1/i);
    await userEvent.type(intermediateCity1, 'Angers');
    const angersOption = await screen.findByRole('option', {
      name: /angers/i,
    });
    await userEvent.click(angersOption);

    const intermediateCity2 = screen.getByLabelText(/intermediate city 2/i);
    await userEvent.type(intermediateCity2, 'Marseille');
    const marseilleOption = await screen.findByRole('option', {
      name: /marseille/i,
    });
    await userEvent.click(marseilleOption);

    const cityOfDestination = screen.getByLabelText(/city of destination/i);
    await userEvent.type(cityOfDestination, 'Nantes');
    const nantesOption = await screen.findByRole('option', {
      name: /nantes/i,
    });
    await userEvent.click(nantesOption);

    const dateOfTheTrip = screen.getByPlaceholderText(/date of the trip/i);
    fireEvent.change(dateOfTheTrip, { target: { value: '2099-12-12' } });

    const numberOfPassengers =
      screen.getByPlaceholderText(/number of passengers/i);
    fireEvent.change(numberOfPassengers, { target: { value: 3 } });

    const submitButton = screen.getByRole('button', {
      name: /search/i,
    });

    expect(cityOfOrigin).toHaveValue('Paris');
    expect(intermediateCity1).toHaveValue('Angers');
    expect(intermediateCity2).toHaveValue('Marseille');
    expect(cityOfDestination).toHaveValue('Nantes');
    expect(dateOfTheTrip).toHaveValue('2099-12-12');
    expect(numberOfPassengers).toHaveValue(3);

    await userEvent.click(submitButton);

    expect(global.window.location.pathname).toContain('/search');
    expect(global.window.location.search).toContain('cityOfOrigin=Paris');
    expect(global.window.location.search).toContain(
      'intermediateCities=Angers%2CMarseille'
    );
    expect(global.window.location.search).toContain('cityOfDestination=Nantes');
    expect(global.window.location.search).toContain('dateOfTheTrip=2099-12-12');
    expect(global.window.location.search).toContain('numberOfPassengers=3');
  });

  it('should fill inputs with data from url parameters', () => {
    render(
      <MemoryRouter
        initialEntries={[
          '/?cityOfOrigin=Paris&intermediateCities=Angers%2CMarseille&cityOfDestination=Strasbourg&dateOfTheTrip=2023-03-10&numberOfPassengers=2',
        ]}
      >
        <Routes>
          <Route
            path="/"
            element={
              <DefaultLayout>
                <Home />
              </DefaultLayout>
            }
          />
        </Routes>
      </MemoryRouter>
    );

    const cityOfOrigin = screen.getByLabelText(/city of origin/i);
    const intermediateCity1 = screen.getByLabelText(/intermediate city 1/i);
    const intermediateCity2 = screen.getByLabelText(/intermediate city 2/i);
    const cityOfDestination = screen.getByLabelText(/city of destination/i);
    const dateOfTheTrip = screen.getByPlaceholderText(/date of the trip/i);
    const numberOfPassengers =
      screen.getByPlaceholderText(/number of passengers/i);

    expect(cityOfOrigin).toHaveValue('Paris');
    expect(intermediateCity1).toHaveValue('Angers');
    expect(intermediateCity2).toHaveValue('Marseille');
    expect(cityOfDestination).toHaveValue('Strasbourg');
    expect(dateOfTheTrip).toHaveValue('2023-03-10');
    expect(numberOfPassengers).toHaveValue(2);
  });
});
