import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import 'jest-localstorage-mock';
import Header from './Header';
import { AppContext } from '../Contexts/AppContext';
import { mockAppContextValue } from '../../utils/MockData';

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

//Please see the test of using value from the local storage upon mounting in HomePage.test.tsx file
//This is because in header this value is taken from HomePage's context, where it is added from the LS
