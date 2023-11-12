import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import { mockAppContextValue, mockProductsData } from '../../utils/MockData';
import { AppContext } from '../Contexts/AppContext';
import Card from './Card';

jest.mock('../../utils/GlobalFunctions', () => ({
  __esModule: true,
  getProductData: jest.fn(() => Promise.resolve(mockProductsData[0])),
}));

test('Card component renders relevant card data', () => {
  render(
    <BrowserRouter>
      <AppContext.Provider value={mockAppContextValue}>
        <Card result={mockProductsData[0]} index={0} />
      </AppContext.Provider>
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
      <AppContext.Provider value={mockAppContextValue}>
        <Card result={mockProductsData[0]} index={0} />
      </AppContext.Provider>
    </BrowserRouter>
  );

  await userEvent.click(screen.getByRole('link'));

  await waitFor(() => {
    expect(window.location.pathname).toEqual(
      `/details/${mockProductsData[0].id}`
    );
  });
});

//Please see 3rd test of card click triggers an additional API call in HomePage.test.tsx file
