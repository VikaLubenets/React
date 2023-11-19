import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import HomePage from './HomePage';
import { mockProductsData } from '../../utils/MockData';
import { productsSlice } from '../../store/reducers/productsReducer';

const mockStore = configureStore();
const store = mockStore({
  products: {
    searchResults: mockProductsData,
    savedTerm: '',
    currentPage: 1,
    limitPerPage: 10,
    totalCount: 12,
    totalPages: 2,
  },
});

jest.mock('../../api/api', () => ({
  ...jest.requireActual('../../api/api'),
  useGetDataQuery: jest.fn(() => ({
    data: mockProductsData,
    isLoading: false,
  })),
}));

jest.mock('@reduxjs/toolkit/query/react', () => ({
  ...jest.requireActual('@reduxjs/toolkit/query/react'),
  fetchBaseQuery: jest.fn(),
}));

const mockDispatch = jest.fn();

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => mockDispatch,
}));

test('Click on pagination page updates URL query parameter when page changes', async () => {
  await act(async () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <HomePage />
        </Provider>
      </BrowserRouter>
    );
  });
  expect(window.location.search).toBe('?page=1&limit=10');
  fireEvent.click(screen.getByText('2'));

  await waitFor(() => {
    expect(mockDispatch).toHaveBeenCalledWith(
      productsSlice.actions.setCurrentPage(2)
    );
    expect(window.location.search).toBe('?page=1&limit=10');
  });
});
