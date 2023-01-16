import { render } from '@testing-library/react';
import { Home } from '.';

it('should render', () => {
  render(<Home />);
});

it('should be able to submit a valid form', () => {
  render(<Home />);
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
