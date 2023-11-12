import React from 'react';
import { render, screen } from '@testing-library/react';
import HomePage from './HomePage';
import { act } from 'react-dom/test-utils';
import { mockProductsData, mockAppContextValue } from '../../utils/MockData';
import { AppContext } from '../../react-components/Contexts/AppContext';
import { BrowserRouter, Router } from 'react-router-dom';

jest.mock('../../utils/GlobalFunctions', () => ({
  getData: jest.fn(() =>
    Promise.resolve({ total: 2, products: mockProductsData })
  ),
}));

beforeAll(() => {
  const localStorageMock = {
    getItem: jest.fn(),
  };

  Object.defineProperty(window, 'localStorage', {
    value: localStorageMock,
  });
});

test('Check that savedTerm is taken from local storage if not empty', async () => {
  render(
    <BrowserRouter>
      <AppContext.Provider value={mockAppContextValue}>
        <HomePage />
      </AppContext.Provider>
    </BrowserRouter>
  );

  expect(window.localStorage.getItem).toHaveBeenCalledTimes(1);
});
