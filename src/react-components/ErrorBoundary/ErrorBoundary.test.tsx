import React from 'react';
import { render, waitFor, screen } from '@testing-library/react';
import ErrorBoundary from './ErrorBoundary';
import userEvent from '@testing-library/user-event';
import ErrorButton from '../ErrorButton/ErrorButton';
import '@testing-library/jest-dom';

const FallbackComponent = () => <div>Error!</div>;

test('ErrorBoundary renders children when there is no error', () => {
  const { getByText } = render(
    <ErrorBoundary fallback={<FallbackComponent />}>
      <div>Content without errors</div>
    </ErrorBoundary>
  );

  const content = getByText('Content without errors');
  expect(content).toBeInTheDocument();
});

test('ErrorBoundary renders fallback component when there is an error', async () => {
  const { getByText } = render(
    <ErrorBoundary fallback={<FallbackComponent />}>
      <div>
        <ErrorButton />
      </div>
    </ErrorBoundary>
  );

  const throwBtn = getByText('Throw Error');
  await userEvent.click(throwBtn);

  await waitFor(() => {
    expect(screen.getByText('Error!')).toBeInTheDocument();
  });
});
