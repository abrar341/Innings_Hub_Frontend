import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({ baseUrl: '' });

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ['User', 'Tournament', 'Player', 'Team', 'Club'], // Added 'Tournament' tag
  endpoints: (builder) => ({}),
});
