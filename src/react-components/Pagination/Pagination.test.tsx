import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { createMemoryHistory } from 'history';
import { BrowserRouter as Router } from 'react-router-dom';
import { AppContext } from '../Contexts/AppContext';
import Pagination from './Pagination';
import { mockAppContextValue } from '../../utils/MockData';

//Please see quary params test of URL update upon click on pagination page in HomePage.test.tsx file

test('Renders pagination element', async () => {
  render(
    <Router>
      <AppContext.Provider value={mockAppContextValue}>
        <Pagination />
      </AppContext.Provider>
    </Router>
  );

  const paginationContainer = screen.getByTestId(/pagination/i) as HTMLElement;
  expect(paginationContainer).toBeInTheDocument();
});
