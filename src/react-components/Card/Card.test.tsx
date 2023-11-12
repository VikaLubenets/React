import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import { mockAppContextValue, mockProductsData } from '../../utils/MockData';
import { AppContext } from '../Contexts/AppContext';
import { createMemoryHistory } from 'history';
import { getProductData } from '../../utils/GlobalFunctions';
import Card from './Card';

jest.mock('../../utils/GlobalFunctions', () => ({
  __esModule: true,
  getProductData: jest.fn(() => Promise.resolve(mockProductsData[0])),
}));

test('Card component renders relevant card data', () => {
  render(
    <MemoryRouter>
      <AppContext.Provider value={mockAppContextValue}>
        <Card result={mockProductsData[0]} index={0} />
      </AppContext.Provider>
    </MemoryRouter>
  );

  const productContainer = screen.getByTestId('product-container');
  const productName = screen.getByText(/1. Product 1/i);
  const productDescription = screen.getByText(/Description 1/i);

  expect(productContainer).toBeInTheDocument();
  expect(productName).toBeInTheDocument();
  expect(productDescription).toBeInTheDocument();
});

// test('Clicking on a card opens a detailed card component', async () => {
//   const history = createMemoryHistory();
//   render(
//     <MemoryRouter>
//       <AppContext.Provider value={mockAppContextValue}>
//         <Card result={mockProductsData[0]} index={0} />
//       </AppContext.Provider>
//     </MemoryRouter>
//   );

//   await userEvent.click(screen.getByRole('link'));

//   await waitFor(() => {
//     expect(history.location.pathname).toEqual(
//       `/details/${mockProductsData[0].id}`
//     );
//   });
// });

// test('Clicking on a card triggers an additional API call for detailed information', async () => {
//   render(
//     <MemoryRouter>
//       <AppContext.Provider value={mockAppContextValue}>
//         <Card result={mockProductsData[0]} index={0} />
//       </AppContext.Provider>
//     </MemoryRouter>
//   );

//   await userEvent.click(screen.getByTestId('product-container'));

//   await waitFor(
//     () => {
//       expect(getProductData).toHaveBeenCalledWith(1);
//     },
//     { timeout: 5000 }
//   );
// });
