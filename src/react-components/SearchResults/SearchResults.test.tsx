import { render } from '@testing-library/react';
import SearchResults from './SearchResults';
import {
  mockAppContextValue,
  mockAppContextValueEmpty,
  mockProductsData,
} from '../../utils/MockData';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import { AppContext } from '../Contexts/AppContext';

describe('SearchResults component', () => {
  it('renders the specified number of cards', () => {
    const { getAllByTestId } = render(
      <BrowserRouter>
        <AppContext.Provider value={mockAppContextValue}>
          <SearchResults />
        </AppContext.Provider>
      </BrowserRouter>
    );

    const cards = getAllByTestId('product-container');

    expect(cards).toHaveLength(mockProductsData.length);
  });

  it('displays an appropriate message if no cards are present', () => {
    const { getByText } = render(
      <BrowserRouter>
        <AppContext.Provider value={mockAppContextValueEmpty}>
          <SearchResults />
        </AppContext.Provider>
      </BrowserRouter>
    );

    const noResultsMessage = getByText('No results') as HTMLElement;

    expect(noResultsMessage).toBeInTheDocument();
  });
});
