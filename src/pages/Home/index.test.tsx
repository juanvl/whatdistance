import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Home } from '.';

it('should render', () => {
  render(<Home />);
});

it('should be able to submit a valid form', async () => {
  render(<Home />);

  const cityOfOrigin = screen.getByRole('combobox', {
    name: /city of origin\*/i,
  });
  const cityOfDestination = screen.getByRole('combobox', {
    name: /city of destination\*/i,
  });
  const dateOfTheTrip = screen.getByLabelText(/date of the trip\*/i);
  const numberOfPassengers = screen.getByRole('spinbutton', {
    name: /number of passengers\*/i,
  });
  const submitButton = screen.getByRole('button', {
    name: /search/i,
  });

  await userEvent.type(cityOfOrigin, 'Paris');
  await userEvent.type(cityOfDestination, 'Paris');
  await userEvent.type(dateOfTheTrip, '12/12/2023');
  await userEvent.type(numberOfPassengers, '3');
  await userEvent.click(submitButton);

  expect(document).toContain('Your trip');
});

it('should NOT be able to submit a invalid form', () => {
  render(<Home />);
});

it('should be able to add multiple intermediate cities', () => {
  render(<Home />);
});

it('should be able to submit form with multiple intermediate cities', () => {
  render(<Home />);
});

it('should modify the page url parameters on any input change', () => {
  render(<Home />);
});

it('should fill inputs with data from url parameters', () => {
  render(<Home />);
});
