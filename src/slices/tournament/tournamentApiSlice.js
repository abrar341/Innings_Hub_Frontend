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
    getAllSquads: builder.query({
      query: () => ({
        url: `${TOURNAMENTS_URL}/getAllSquads`,
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
    getSingleTournamentDetail: builder.query({
      query: (id) => ({
        url: `${TOURNAMENTS_URL}/getSingleTournamentDetail/${id}`,
        method: 'GET',
      }),
      providesTags: ['Tournament'],
    }),
    getAvailableTeamsForTournament: builder.query({
      query: (id) => ({
        url: `${TOURNAMENTS_URL}/getAvailableTeamsForTournament/${id}`,
        method: 'GET',
      }),
      providesTags: ['Tournament'],
    }),
    addTeamsToTournaments: builder.mutation({
      query: ({ tournamentId, teamIds }) => ({
        url: `${TOURNAMENTS_URL}/addTeamsToTournament`,
        method: 'POST',
        body: { tournamentId, teamIds }, // Pass the tournamentId and teamIds in the body
      }),
      invalidatesTags: ['Tournament'], // Invalidate the tournament data to refetch after adding teams
    }),
    registerTeamsToTournament: builder.mutation({
      query: (data) => ({
        url: `${TOURNAMENTS_URL}/registerTeamsToTournament`,
        method: 'POST',
        body: data, // Pass tournamentId and teams in the body
      }),
      invalidatesTags: ['Tournament'], // Invalidate the tournament data to refetch after adding teams
    }),
    removeTeamFromTournament: builder.mutation({
      query: ({ tournamentId, squadId }) => ({
        url: `${TOURNAMENTS_URL}/removeTeamFromTournament`,
        method: 'POST',
        body: { tournamentId, squadId }, // Pass the tournamentId and teamIds in the body
      }),
      invalidatesTags: ['Tournament'], // Invalidate the tournament data to refetch after adding teams
    }),
    getSingleTournamentSquads: builder.query({
      query: (id) => ({
        url: `${TOURNAMENTS_URL}/getSingleTournamentSquads/${id}`,
        method: 'GET',
      }),
      providesTags: ['Tournament'], // Provide cache on fetch
    }),
    getAvailablePlayersForTournament: builder.query({
      query: ({ tournamentId, teamId }) => ({
        url: `${TOURNAMENTS_URL}/getAvailablePlayersForTournament/${tournamentId}/${teamId}`,
        method: 'GET',
      }),
      providesTags: ['Tournament'], // This will help in caching
    }),
    addPlayerToSquad: builder.mutation({
      query: ({ squadId, playerIds }) => ({
        url: `${TOURNAMENTS_URL}/addPlayerToSquad`,
        method: 'POST',
        body: { squadId, playerIds }, // Sending both squadId and playerIds
      }),
      invalidatesTags: ['Tournament'], // Invalidate tournament data to refetch after adding players
    }),
    removePlayerFromSquad: builder.mutation({
      query: ({ squadId, playerId }) => ({
        url: `${TOURNAMENTS_URL}/removePlayerFromSquad`,
        method: 'POST',
        body: { squadId, playerId }, // Send the squadId and playerId in the body
      }),
      invalidatesTags: ['Tournament'], // Invalidate tournament data to refresh
    }),
    getTeamsInTournament: builder.query({
      query: (tournamentId) => ({
        url: `${TOURNAMENTS_URL}/getTeamsInTournament/${tournamentId}`,
        method: 'GET',
      }),
      providesTags: ['Tournament'], // This will help in caching
    }),
    approveSquadById: builder.mutation({
      query: (squadId) => ({
        url: `${TOURNAMENTS_URL}/approveSquadById/${squadId}`,
        method: 'PATCH', // Using PATCH since we're updating an existing resource
      }),
      invalidatesTags: ['Tournament'], // Invalidate the tournament data to refresh
    }),


  }),
});

export const {
  useApproveSquadByIdMutation,
  useRegisterTeamsToTournamentMutation,
  useCreateTournamentMutation,
  useUpdateTournamentMutation,
  useDeleteTournamentMutation,
  useGetAllTournamentsQuery,
  useGetUpcomingTournamentsQuery,
  useGetOngoingTournamentsQuery,
  useGetConcludedTournamentsQuery,
  useGetAllSquadsQuery,
  useGetSingleTournamentDetailQuery,
  useGetAvailableTeamsForTournamentQuery,
  useAddTeamsToTournamentsMutation,
  useRemoveTeamFromTournamentMutation,
  useGetSingleTournamentSquadsQuery,
  useGetAvailablePlayersForTournamentQuery,
  useAddPlayerToSquadMutation,
  useRemovePlayerFromSquadMutation,
  useGetTeamsInTournamentQuery
} = tournamentApiSlice;
