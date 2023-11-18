import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../../utils/Constants';
import { IProduct, IProductList } from '../../utils/GeneralTypes';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getProductData: builder.query<IProduct, number>({
      query: (itemId) => `${itemId}`,
    }),
    getData: builder.query<IProductList, string>({
      query: (url) => url,
    }),
  }),
});

export const { useGetProductDataQuery, useGetDataQuery } = api;
