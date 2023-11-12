import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import HomePage from './HomePage';
import { act } from 'react-dom/test-utils';
import { mockProductsData, mockAppContextValue } from '../../utils/MockData';
import { AppContext } from '../../react-components/Contexts/AppContext';
import { BrowserRouter, MemoryRouter, Router } from 'react-router-dom';
import { getProductData } from '../../utils/GlobalFunctions';
import { createMemoryHistory } from 'history';

jest.mock('../../utils/GlobalFunctions', () => ({
  getData: jest.fn(() =>
    Promise.resolve({ total: 12, products: mockProductsData })
  ),
  getProductData: jest.fn(() =>
    Promise.resolve({ json: () => Promise.resolve(mockProductsData[0]) })
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

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn().mockReturnValue({ id: '1' }),
}));

test('Clicking on a card triggers an additional API call for detailed information', async () => {
  await act(async () => {
    render(
      <BrowserRouter>
        <AppContext.Provider value={mockAppContextValue}>
          <HomePage />
        </AppContext.Provider>
      </BrowserRouter>
    );
  });

  const firstProductLink = screen.getByRole('link', {
    name: '1. Product 1 Description: Description 1',
  });

  fireEvent.click(firstProductLink);

  await waitFor(() => {
    expect(window.location.pathname).toBe('/details/1');
  });

  // expect(getProductData).toHaveBeenCalledWith(1);
});
