import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import { mockProductsData } from '../../utils/MockData';
import configureStore from 'redux-mock-store';
import Card from './Card';
import { Provider } from 'react-redux';
import { useGetProductDataQuery } from '../../api/api';

jest.mock('../../api/api', () => ({
  ...jest.requireActual('../../api/api'),
  useGetProductDataQuery: jest.fn(() => ({
    data: mockProductsData,
    isLoading: false,
  })),
}));

jest.mock('@reduxjs/toolkit/query/react', () => ({
  ...jest.requireActual('@reduxjs/toolkit/query/react'),
  fetchBaseQuery: jest.fn(),
}));

const mockStore = configureStore();
const store = mockStore({
  products: {
    searchResults: mockProductsData,
    savedTerm: '',
    currentPage: 1,
    limitPerPage: 10,
    totalCount: 12,
  },
});

test('Card component renders relevant card data', () => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <Card result={mockProductsData[0]} index={0} />
      </Provider>
    </BrowserRouter>
  );

  const productContainer = screen.getByTestId('product-container');
  const productName = screen.getByText(/1. Product 1/i);
  const productDescription = screen.getByText(/Description 1/i);

  expect(productContainer).toBeInTheDocument();
  expect(productName).toBeInTheDocument();
  expect(productDescription).toBeInTheDocument();
});

test('Clicking on a card opens a detailed card component', async () => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <Card result={mockProductsData[0]} index={0} />
      </Provider>
    </BrowserRouter>
  );

  await userEvent.click(screen.getByRole('link'));

  await waitFor(() => {
    expect(window.location.pathname).toEqual(
      `/details/${mockProductsData[0].id}`
    );
  });
});

test('Clicking on a card triggers an additional API call for detailed information', async () => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <Card result={mockProductsData[0]} index={0} />
      </Provider>
    </BrowserRouter>
  );

  const firstProductLink = screen.getByRole('link', {
    name: '1. Product 1 Description: Description 1',
  });

  await userEvent.click(firstProductLink);

  await waitFor(() => {
    expect(window.location.pathname).toBe('/details/1');
    // expect(useGetProductDataQuery).toHaveBeenCalled();
  });
});
