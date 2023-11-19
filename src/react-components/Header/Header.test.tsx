import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import 'jest-localstorage-mock';
import Header from './Header';
import { mockProductsData } from '../../utils/MockData';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';

beforeAll(() => {
  const localStorageMock = {
    setItem: jest.fn(),
    getItem: jest.fn(),
  };

  Object.defineProperty(window, 'localStorage', {
    value: localStorageMock,
  });
});

const mockStore = configureStore();

const store = mockStore({
  products: {
    searchResults: mockProductsData,
    savedTerm: '',
  },
});

test('Clicking Search button saves value to local storage', async () => {
  render(
    <Provider store={store}>
      <Header />
    </Provider>
  );

  const searchInput = screen.getByRole('searchbox');
  const searchButton = screen.getByRole('button', { name: /search/i });

  fireEvent.change(searchInput, { target: { value: 'Mocked Term' } });
  fireEvent.click(searchButton);

  expect(window.localStorage.setItem).toHaveBeenCalledTimes(1);
  expect(window.localStorage.setItem).toHaveBeenCalledWith(
    'savedTerm',
    'Mocked Term'
  );
});

test('Search container uses savedTerm from local storage if not empty', async () => {
  render(
    <Provider store={store}>
      <Header />
    </Provider>
  );

  expect(window.localStorage.getItem).toHaveBeenCalledWith('savedTerm');
});

afterEach(() => {
  jest.clearAllMocks();
});
