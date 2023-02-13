import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Home } from '.';

describe('Home page', () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );
  });

  it('should render', () => {
    const text = screen.getByText('City of origin');
    const button = screen.getByText('Search');

    expect(text).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  it('should be able to fill inputs correctly', async () => {
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
    // const submitButton = screen.getByRole('button', {
    //   name: /search/i,
    // });

    fireEvent.input(cityOfOrigin, 'Paris');
    fireEvent.input(cityOfDestination, 'Nantes');
    fireEvent.input(dateOfTheTrip, '12/12/2099');
    fireEvent.input(numberOfPassengers, '3');
  });

  // it('should be able to submit a valid form', async () => {

  // });

  // it('should NOT be able to submit a invalid form', () => {
  //   render(<Home />);
  // });

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
