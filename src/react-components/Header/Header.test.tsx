/* eslint-disable jest/no-commented-out-tests */
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import 'jest-localstorage-mock';
import userEvent from '@testing-library/user-event';
import Header from './Header';
import { AppContext } from '../Contexts/AppContext';
import { mockAppContextValue } from '../../utils/MockData';
import { IAppContext } from '../Contexts/types';
import { MemoryRouter } from 'react-router-dom';

beforeAll(() => {
  const localStorageMock = {
    setItem: jest.fn(),
    getItem: jest.fn(),
  };

  Object.defineProperty(window, 'localStorage', {
    value: localStorageMock,
  });
});

test('Clicking Search button saves value to local storage', async () => {
  const mockGetPage = jest.fn();

  render(
    <AppContext.Provider value={mockAppContextValue}>
      <Header getPage={mockGetPage} />
    </AppContext.Provider>
  );

  const searchInput = screen.getByRole('searchbox');
  const searchButton = screen.getByRole('button', { name: /search/i });

  fireEvent.change(searchInput, { target: { value: 'Mocked Term' } });
  mockAppContextValue.savedTerm = 'Mocked Term';
  fireEvent.click(searchButton);

  expect(window.localStorage.setItem).toHaveBeenCalledTimes(1);
  expect(window.localStorage.setItem).toHaveBeenCalledWith(
    'savedTerm',
    'Mocked Term'
  );
});

// test('Check that the component retrieves the value from local storage upon mounting', () => {
//   const savedTermValue = 'Mocked Term';
//   const mockGetPage = jest.fn();

//   render(
//     <MemoryRouter initialEntries={['/']}>
//       <AppContext.Provider value={mockAppContextValue}>
//         <Header getPage={mockGetPage} />
//       </AppContext.Provider>
//     </MemoryRouter>
//   );

//   expect(window.localStorage.getItem).toHaveBeenCalledTimes(1);
//   expect(mockAppContextValue.setSavedTerm).toHaveBeenCalledWith(savedTermValue);

//   const searchInput = screen.getByRole('searchbox');
//   expect(searchInput).toHaveValue(savedTermValue);
// });
