import { render } from '@testing-library/react';
import SearchResults from './SearchResults';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import { mockProductsData } from '../../utils/MockData';

const mockStore = configureStore();

describe('SearchResults component', () => {
  it('renders the specified number of cards', () => {
    const store = mockStore({
      products: {
        searchResults: mockProductsData,
        isDetailsOpen: false,
      },
    });

    const { getAllByTestId } = render(
      <Provider store={store}>
        <BrowserRouter>
          <SearchResults />
        </BrowserRouter>
      </Provider>
    );

    const cards = getAllByTestId('product-container');

    expect(cards).toHaveLength(mockProductsData.length);
  });

  it('displays an appropriate message if no cards are present', () => {
    const store = mockStore({
      products: {
        searchResults: [],
        isDetailsOpen: false,
      },
    });

    const { getByText } = render(
      <Provider store={store}>
        <BrowserRouter>
          <SearchResults />
        </BrowserRouter>
      </Provider>
    );

    const noResultsMessage = getByText('No results') as HTMLElement;

    expect(noResultsMessage).toBeInTheDocument();
  });
});
