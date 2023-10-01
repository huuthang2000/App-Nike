
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = "http://10.0.0.14:1107/";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers, { getState }) => {
      // Get token from store (userSlice)
      const token = getState().user.currentUser?.data.token;

      console.log("object token " + token)
      // Add token to headers
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }

      return headers;
    },
  }),
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => "products",
    }),
    getProduct: builder.query({
      query: (id) => `products/${id}`,
    }),
    // orders
    createOrder: builder.mutation({
      query: (newOrder) => ({
        url: "orders/insert",
        method: "POST",
        body: newOrder,
      }),
    }),
    getOrder: builder.query({
      query: () => `orders`,
    }),
    // carts
    createCart: builder.mutation({
      query: (newCart) => ({
        url: "carts/insert",
        method: "POST",
        body: newCart,
      }),
    }),
    getCart: builder.query({
      query: () => "carts",
    }),
    createUser: builder.mutation({
      query: (newUser) => ({
        url: "users/register",
        method: "POST",
        body: newUser,
      }),
    }),
    loginUser: builder.mutation({
      query: (user) => ({
        url: "users/login",
        method: "POST",
        body: user,
      }),
    }),
  }),
});

export const {
  useGetProductQuery,
  useGetProductsQuery,
  useCreateOrderMutation,
  useGetOrderQuery,
  useCreateUserMutation,
  useLoginUserMutation,
} = apiSlice;
