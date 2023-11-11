import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { BrowserRouter, Router } from 'react-router-dom';
import '@testing-library/jest-dom';
import fetchMock from 'node-fetch';
import Card from './Card';
import { mockProductsData } from '../../utils/MockData';

jest.mock('node-fetch', () => require('fetch-mock-jest').sandbox());

describe('Card component', () => {
  beforeEach(() => {
    fetchMock.mock('*', {
      answer: 'Fetch has been triggered',
    });
  });

  it('renders the relevant card data', () => {
    const product = mockProductsData[0];
    const { getByTestId, getByText } = render(
      <BrowserRouter>
        <Card result={product} index={0} />
      </BrowserRouter>
    );

    const cardContainer = getByTestId('product-container');
    const productName = getByText(`${product.title}`);
    const description = getByText(`Description:`);
    const productDescription = getByText(`${product.description}`);

    expect(cardContainer).toBeInTheDocument();
    expect(productName).toBeInTheDocument();
    expect(description).toBeInTheDocument();
    expect(productDescription).toBeInTheDocument();
  });

  it('opens a detailed card component on click', () => {
    const product = mockProductsData[0];
    const history = createMemoryHistory();
    const { getByTestId } = render(
      <Router history={history}>
        <Card result={product} index={0} />
      </Router>
    );

    const cardContainer = getByTestId('product-container');
    fireEvent.click(cardContainer);

    // Validate the changes in the URL
    expect(history.location.pathname).toBe(`/details/${product.id}`);
    // You can also add expectations related to the detailed card component rendering
    // For example, check if the detailed card component content is rendered
  });

  it('triggers an additional fetch request on click', async () => {
    const product = mockProductsData[0];
    const { getByTestId } = render(
      <BrowserRouter>
        <Card result={product} index={0} />
      </BrowserRouter>
    );

    const cardContainer = getByTestId('product-container');
    fireEvent.click(cardContainer);

    // Add expectations related to the fetch request being triggered
    expect(fetchMock.calls()).toHaveLength(1);

    // Add expectations related to the fetch response
    // Assuming you are using some form of asynchronous state update or useEffect to handle the fetch
  });
});
