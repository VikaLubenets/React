import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ErrorMessage from './ErrorMessage';

test('Renders error message', () => {
  render(<ErrorMessage />);

  const errorMessageElement = screen.getByText(
    /Error has been occured. Try again later or reload the page/i
  ) as HTMLElement;
  expect(errorMessageElement).toBeInTheDocument();
});
