import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import HomePage from './HomePage';
import { act } from 'react-dom/test-utils';
import { mockProductsData, mockAppContextValue } from '../../utils/MockData';
import { AppContext } from '../../react-components/Contexts/AppContext';
import { BrowserRouter, Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

jest.mock('../../utils/GlobalFunctions', () => ({
  getData: jest.fn(() =>
    Promise.resolve({ total: 12, products: mockProductsData })
  ),
}));

beforeAll(() => {
  const localStorageMock = {
    getItem: jest.fn(),
  };

  Object.defineProperty(window, 'localStorage', {
    value: localStorageMock,
  });
});

test('Search container use savedTerm that is taken from local storage if not empty', async () => {
  await act(async () => {
    render(
      <BrowserRouter>
        <AppContext.Provider value={mockAppContextValue}>
          <HomePage />
        </AppContext.Provider>
      </BrowserRouter>
    );
  });

  expect(window.localStorage.getItem).toHaveBeenCalledWith('savedTerm');
});

test('Click on pagination page updates URL query parameter when page changes', async () => {
  const history = createMemoryHistory();

  await act(async () => {
    render(
      <BrowserRouter>
        <AppContext.Provider value={mockAppContextValue}>
          <HomePage />
        </AppContext.Provider>
      </BrowserRouter>
    );
  });

  fireEvent.click(screen.getByText('2'));

  await waitFor(() => {
    expect(window.location.search).toBe('?page=2&limit=10');
  });
});
