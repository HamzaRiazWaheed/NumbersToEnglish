import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('renders input Form', () => {
  render(<App />);
  // Label
  const labelElement = screen.getByText(/Add some number/i);
  expect(labelElement).toBeInTheDocument();

   // Input
   const inputElement = screen.getByLabelText('number-input');
   expect(inputElement).toBeInTheDocument();

  // Convert Button
  const convertButton = screen.getByText('Convert');
  expect(convertButton).toBeInTheDocument();
});

test('English Text for Number', () => {
  render(<App />);
  // Input
  const inputElement = screen.getByLabelText('number-input');
  fireEvent.change(inputElement, {target: {value: '1'}})
  // Convert Button
  const form = screen.getByRole('input-form');
  fireEvent.submit(form);

  const englishTest = screen.getByRole('english-test');
  expect(englishTest).toHaveTextContent(/one/i);
  
});
