
import { apiSlice } from '../apiSlice';

const MATCHES_URL = '/api/match';
const TOURNAMENTS_URL = '/api/tournament';


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
        getMatchesByTeamId: builder.query({
            query: (teamId) => ({
                url: `${MATCHES_URL}/getMatchesByTeamId/${teamId}`,
                method: 'GET',
            }),
            providesTags: ['Match'], // Helps to re-fetch and update when matches are created/updated
        }),
        getMatchById: builder.query({
            query: (matchId) => ({
                url: `${MATCHES_URL}/getMatchById/${matchId}`,
                method: 'GET',
            }),
            providesTags: ['Match'], // Helps with re-fetching/updating when a match is modified
        }),
        initializePlayers: builder.mutation({
            query: ({ data, matchId }) => ({
                url: `${MATCHES_URL}/initializePlayers/${matchId}`,
                method: 'POST',
                body: {
                    striker: data.striker,
                    nonStriker: data.nonStriker,
                    bowler: data.bowler
                },
            }),
            invalidatesTags: ['Match'], // This will help to invalidate and refetch match-related queries
        }),
        getAllMatches: builder.query({
            query: () => ({
                url: `${MATCHES_URL}/getAllMatches`,
                method: 'GET',
            }),
            providesTags: ['Match'], // Helps to re-fetch and update when matches are created/updated
        }),
        getFeaturedMatches: builder.query({
            query: () => ({
                url: `${MATCHES_URL}/getFeaturedMatches`,
                method: 'GET',
            }),
            providesTags: ['Match'], // Helps to re-fetch and update when matches are updated
        }),

        getParticularMatches: builder.query({
            query: () => ({
                url: `${MATCHES_URL}/getParticularMatches`,
                method: 'GET',
            }),
            providesTags: ['Match'], // Helps to re-fetch and update when matches are created/updated
        }),
        getSquadPlayers: builder.query({
            query: ({ tournamentId, teamId }) => ({
                url: `${MATCHES_URL}/getSquadPlayers/${tournamentId}/${teamId}`,
                method: 'GET',
            }),
            providesTags: ['Players'], // Helps to re-fetch and update when squads are created/updated
        }),
        startMatch: builder.mutation({
            query: ({ matchId, tossWinner, tossDecision, playing11 }) => ({
                url: `${MATCHES_URL}/startMatch/${matchId}`, // Sending matchId as a parameter
                method: 'POST',
                body: {
                    tossWinner,
                    tossDecision,
                    playing11
                },
            }),
            invalidatesTags: ['Match'], // Helps to re-fetch and update match-related data after starting the match
        }),
        updatePointsTable: builder.mutation({
            query: ({ roundId, teamIds }) => ({
                url: `${TOURNAMENTS_URL}/updateStandings`, // Sending roundId as a parameter
                method: 'POST',
                body: {
                    roundId,
                    teamIds,
                },
            }),
            invalidatesTags: ['PointsTable'], // Invalidate the points table to refresh data after updating
        }),
        getPaginatedPosts: builder.query({
            query: ({ skip, limit }) => `${MATCHES_URL}/getPaginatedPosts?skip=${skip}&limit=${limit}`,
            providesTags: ['Posts'], // optional, useful for invalidation
        }),





    }),
});

export const {
    useCreateMatchMutation,
    useGetMatchesByTeamIdQuery,
    useGetMatchesByTournamentIdQuery,
    useGetMatchByIdQuery,
    useInitializePlayersMutation,
    useGetAllMatchesQuery,
    useGetSquadPlayersQuery,
    useStartMatchMutation,
    useUpdatePointsTableMutation,
    useGetParticularMatchesQuery,
    useGetFeaturedMatchesQuery,
    useGetPaginatedPostsQuery } = matchApiSlice;
