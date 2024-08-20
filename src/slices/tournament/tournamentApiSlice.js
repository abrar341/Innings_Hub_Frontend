import { apiSlice } from '../apiSlice';
const TOURNAMENTS_URL = '/api/tournaments';

export const tournamentApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createTournament: builder.mutation({
      query: (data) => ({
        url: `${TOURNAMENTS_URL}`,
        method: 'POST',
        body: data,
      }),
    }),
    updateTournament: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `${TOURNAMENTS_URL}/${id}`,
        method: 'PUT',
        body: data,
      }),
    }),
    deleteTournament: builder.mutation({
      query: (id) => ({
        url: `${TOURNAMENTS_URL}/${id}`,
        method: 'DELETE',
      }),
    }),
    getAllTournaments: builder.query({
      query: () => ({
        url: `${TOURNAMENTS_URL}`,
        method: 'GET',
      }),
    }),
    getUpcomingTournaments: builder.query({
      query: () => ({
        url: `${TOURNAMENTS_URL}/upcoming`,
        method: 'GET',
      }),
    }),
    getOngoingTournaments: builder.query({
      query: () => ({
        url: `${TOURNAMENTS_URL}/ongoing`,
        method: 'GET',
      }),
    }),
    getConcludedTournaments: builder.query({
      query: () => ({
        url: `${TOURNAMENTS_URL}/concluded`,
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useCreateTournamentMutation,
  useUpdateTournamentMutation,
  useDeleteTournamentMutation,
  useGetAllTournamentsQuery,
  useGetUpcomingTournamentsQuery,
  useGetOngoingTournamentsQuery,
  useGetConcludedTournamentsQuery,
} = tournamentApiSlice;
