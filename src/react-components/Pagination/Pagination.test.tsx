import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { createMemoryHistory } from 'history';
import { MemoryRouter } from 'react-router-dom';
import { AppContext } from '../Contexts/AppContext';
import Pagination from './Pagination';
import { mockAppContextValue } from '../../utils/MockData';

test('Component updates URL query parameter when page changes', () => {
  const history = createMemoryHistory();

  render(
    <MemoryRouter initialEntries={['/']} initialIndex={0}>
      <AppContext.Provider value={mockAppContextValue}>
        <Pagination />
      </AppContext.Provider>
    </MemoryRouter>
  );

  expect(history.location.search).toBe('');

  fireEvent.click(screen.getByText('2'));

  expect(window.location.search).toBe('?page=2');
  expect(mockAppContextValue.setCurrentPage).toHaveBeenCalledWith(2);

  expect(mockAppContextValue.getPage).toHaveBeenCalledWith(1, 2);
});
