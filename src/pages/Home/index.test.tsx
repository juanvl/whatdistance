import { BrowserRouter } from 'react-router-dom';
import { Home } from '.';
import {
  fireEvent,
  render,
  screen,
  userEvent,
} from '../../test/utils/test-utils';

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

  // it('should be able to add multiple intermediate cities', () => {
  //   render(<Home />);
  // });

  // it('should be able to submit form with multiple intermediate cities', () => {
  //   render(<Home />);
  // });

  // it('should modify the page url parameters on any input change', () => {
  //   render(<Home />);
  // });

  // it('should fill inputs with data from url parameters', () => {
  //   render(<Home />);
  // });
});
