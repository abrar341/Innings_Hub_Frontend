import { apiSlice } from '../apiSlice';
const TOURNAMENTS_URL = '/api/tournament';

// tournamentApiSlice.js

export const tournamentApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createTournament: builder.mutation({
      query: (data) => {
        console.log(data);

        const formData = new FormData();
        formData.append("season", data.season);
        formData.append("startDate", data.start_date);
        formData.append("endDate", data.end_date);
        formData.append("name", data.title);
        formData.append("shortName", data.short_title);
        formData.append("ballType", data.ball_type);
        formData.append("tournamentType", data.type);

        if (data.logo) {
          formData.append("image", data.logo);
        }

        return {
          url: `${TOURNAMENTS_URL}/createTournament`,
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: ['Tournament'], // Invalidate cache on create
    }),

    updateTournament: builder.mutation({
      query: ({ id, ...data }) => {
        const formData = new FormData();
        formData.append("season", data.season);
        formData.append("startDate", data.start_date);
        formData.append("endDate", data.end_date);
        formData.append("name", data.title);
        formData.append("shortName", data.short_title);
        formData.append("ballType", data.ball_type);
        formData.append("tournamentType", data.type);

        if (data.logo) {
          formData.append("image", data.logo);
        }

        return {
          url: `${TOURNAMENTS_URL}/updateTournament/${id}`,
          method: 'PUT',
          body: formData,

        };
      },
      invalidatesTags: ['Tournament'], // Invalidate cache on update
    }),

    deleteTournament: builder.mutation({
      query: (id) => ({
        url: `${TOURNAMENTS_URL}/deleteTournament/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Tournament'], // Invalidate cache on delete
    }),

    getAllTournaments: builder.query({
      query: () => ({
        url: `${TOURNAMENTS_URL}/alltournament`,
        method: 'GET',
      }),
      providesTags: ['Tournament'], // Provide cache on fetch
    }),

    getUpcomingTournaments: builder.query({
      query: () => ({
        url: `${TOURNAMENTS_URL}/upcoming`,
        method: 'GET',
      }),
      providesTags: ['Tournament'],
    }),

    getOngoingTournaments: builder.query({
      query: () => ({
        url: `${TOURNAMENTS_URL}/ongoing`,
        method: 'GET',
      }),
      providesTags: ['Tournament'],
    }),

    getConcludedTournaments: builder.query({
      query: () => ({
        url: `${TOURNAMENTS_URL}/concluded`,
        method: 'GET',
      }),
      providesTags: ['Tournament'],
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
