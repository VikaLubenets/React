import React from 'react';
import { IAppContext } from '../react-components/Contexts/types';
import { IProduct } from './GeneralTypes';

export const mockProductsData: IProduct[] = [
  {
    id: 1,
    title: 'Product 1',
    description: 'Description 1',
    price: 10,
    discountPercentage: 5,
    rating: 4,
    stock: 20,
    brand: 'Brand 1',
    category: 'Category 1',
    thumbnail: 'path/to/image1',
    images: ['path/to/image1_1', 'path/to/image1_2'],
  },
  {
    id: 2,
    title: 'Product 2',
    description: 'Description 2',
    price: 15,
    discountPercentage: 10,
    rating: 4.5,
    stock: 15,
    brand: 'Brand 2',
    category: 'Category 2',
    thumbnail: 'path/to/image2',
    images: ['path/to/image2_1', 'path/to/image2_2'],
  },
];

export const mockAppContextValue: IAppContext = {
  savedTerm: 'Mocked Term',
  searchedResults: mockProductsData,
  isLoaded: true,
  totalCount: 2,
  currentPage: 1,
  limitPerPage: 1,
  totalPages: 2,
  setSavedTerm: jest.fn(),
  setSearchResults: jest.fn(),
  setIsLoaded: jest.fn(),
  setTotalCount: jest.fn(),
  setCurrentPage: jest.fn(),
  setLimitPerPage: jest.fn(),
  setTotalPages: jest.fn(),
  getPage: jest.fn(),
};

export const mockAppContextValueEmpty: IAppContext = {
  savedTerm: 'Mocked Term',
  searchedResults: [],
  isLoaded: true,
  totalCount: 50,
  currentPage: 2,
  limitPerPage: 10,
  totalPages: 5,
  setSavedTerm: jest.fn(),
  setSearchResults: jest.fn(),
  setIsLoaded: jest.fn(),
  setTotalCount: jest.fn(),
  setCurrentPage: jest.fn(),
  setLimitPerPage: jest.fn(),
  setTotalPages: jest.fn(),
  getPage: jest.fn(),
};
