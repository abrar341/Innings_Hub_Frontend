
import { apiSlice } from '../apiSlice';

const MATCHES_URL = '/api/match';

export const matchApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // Mutation to create a new team
        createMatch: builder.mutation({
            query: (data) => ({
                url: `${MATCHES_URL}/createMatch`,
                method: 'POST',
                body: {
                    team1: data.selectedTeam1,
                    team2: data.selectedTeam2,
                    round: "data.round",
                    venue: data.venue,
                    overs: data.overs,
                    date: data.date,
                    time: data.time,
                    tournamentId: data.tournamentId
                },
            }),
            invalidatesTags: ['Match'], // This will help to invalidate and refetch match-related queries
        }),

        getMatchesByTournamentId: builder.query({
            query: (tournamentId) => ({
                url: `${MATCHES_URL}/getMatchesByTournamentId/${tournamentId}`,
                method: 'GET',
            }),
            providesTags: ['Match'], // Helps to re-fetch and update when matches are created/updated
        }),

    }),
});

export const {
    useCreateMatchMutation,
    useGetMatchesByTournamentIdQuery
} = matchApiSlice;
