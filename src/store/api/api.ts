import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../../utils/Constants';
import { IProduct, IProductList } from '../../utils/GeneralTypes';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getProductData: builder.query<IProduct, number>({
      query: (itemId) => ({
        url: `${itemId}`,
      }),
    }),
    getData: builder.query<
      IProductList,
      { page: number; limit: number; search?: string }
    >({
      query: ({ page = 1, limit = 10, search }) => {
        const skip = (page - 1) * limit;

        if (search) {
          return `search?q=${search}&limit=${limit}&skip=${skip}`;
        } else {
          return `?limit=${limit}&skip=${skip}`;
        }
      },
    }),
  }),
});

export const { useGetProductDataQuery, useGetDataQuery } = api;
