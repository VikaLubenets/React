import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter, MemoryRouter, Route, Routes } from 'react-router-dom';
import { mockProductsData } from '../../utils/MockData';
import Details from './Details';

let queryCounter = 0;

jest.mock('../../api/api', () => ({
  ...jest.requireActual('../../api/api'),
  useGetProductDataQuery: jest.fn(() => {
    queryCounter++;
    return {
      data: mockProductsData[0],
      isLoading: queryCounter === 1,
    };
  }),
}));

jest.mock('@reduxjs/toolkit/query/react', () => ({
  ...jest.requireActual('@reduxjs/toolkit/query/react'),
  fetchBaseQuery: jest.fn(),
}));

test('Displays loading indicator while fetching data', async () => {
  render(
    <MemoryRouter initialEntries={['/details/1']}>
      <Routes>
        <Route path="/details/:id" element={<Details />} />
      </Routes>
    </MemoryRouter>
  );

  expect(screen.getByText('Loading...')).toBeInTheDocument();
  await waitFor(() => screen.getByTestId('details-container'));
});

test('Displays detailed card data', async () => {
  render(
    <MemoryRouter initialEntries={['/details/1']}>
      <Routes>
        <Route path="/details/:id" element={<Details />} />
      </Routes>
    </MemoryRouter>
  );

  await waitFor(() => screen.getByTestId('details-container'));
  expect(screen.getByText('Product 1')).toBeInTheDocument();
  expect(screen.getByText('Brand: Brand 1')).toBeInTheDocument();
  expect(screen.getByText('Description: Description 1')).toBeInTheDocument();
  expect(screen.getByText('Price: 10 $')).toBeInTheDocument();
});

test('Hides component on close button click', async () => {
  render(
    <MemoryRouter initialEntries={['/details/1']}>
      <Routes>
        <Route path="/details/:id" element={<Details />} />
      </Routes>
    </MemoryRouter>
  );

  await waitFor(() => screen.findByTestId('details-container'));
  fireEvent.click(screen.getByTestId('close-button'));

  await waitFor(() =>
    expect(screen.queryByTestId('details-container')).not.toBeInTheDocument()
  );
});

afterAll(() => {
  jest.clearAllMocks();
});
