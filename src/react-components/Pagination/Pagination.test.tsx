import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import Pagination from './Pagination';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { mockProductsData } from '../../utils/MockData';

//Please see quary params test of URL update upon click on pagination page in HomePage.test.tsx file

test('Renders pagination element', async () => {
  const mockStore = configureStore();

  const store = mockStore({
    products: {
      searchResults: mockProductsData,
    },
  });

  render(
    <Provider store={store}>
      <BrowserRouter>
        <Pagination />
      </BrowserRouter>
    </Provider>
  );

  const paginationContainer = screen.getByTestId('pagination');
  expect(paginationContainer).toBeInTheDocument();
});
