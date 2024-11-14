import { apiSlice } from '../apiSlice';

const PLAYERS_URL = '/api/player';

export const playerApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createPlayer: builder.mutation({
            query: (data) => {
                const formData = new FormData();
                formData.append("playerName", data.playerName);
                formData.append("DOB", data.dob);
                formData.append("role", data.role);
                if (data.profilePicture) {
                    formData.append("profilePicture", data.profilePicture);
                }
                if (data.cnic) {
                    formData.append("CNIC", data.cnic);
                }
                if (data.city) {
                    formData.append("city", data.city);
                }
                if (data.email) {
                    formData.append("email", data.email);
                }
                if (data.jerseyNumber) {
                    formData.append("jersyNo", data.jerseyNumber);
                }
                if (data.phone) {
                    formData.append("phone", data.phone);
                }

                if (data.battingStyle) {
                    formData.append("battingStyle", data.battingStyle);
                }

                if (data.bowlingStyle) {
                    formData.append("bowlingStyle", data.bowlingStyle);
                }
                formData.append("associatedClub", data.clubId);

                return {
                    url: `${PLAYERS_URL}/createPlayer`,
                    method: "POST",
                    body: formData,
                };
            },
            invalidatesTags: ['Player'], // Invalidate the cache when a new player is created
        }),

        // Query to fetch all players
        getAllPlayers: builder.query({
            query: () => ({
                url: `${PLAYERS_URL}/allplayers`,
                method: 'GET',
            }),
            providesTags: ['Player'], // Provide cache tags for the fetched players
        }),
        getRandomPlayers: builder.query({
            query: () => ({
                url: `${PLAYERS_URL}/getRandomPlayers`,
                method: 'GET',
            }),
            providesTags: ['Player'], // Provide cache tags for the fetched players
        }),
        getPlayerById: builder.query({
            query: (playerId) => ({
                url: `${PLAYERS_URL}/getPlayerById/${playerId}`, // URL with dynamic player ID
                method: 'GET',
            }),
            providesTags: (result, error, playerId) => [{ type: 'Player', id: playerId }], // Cache by player ID
        }),

        deletePlayer: builder.mutation({
            query: (playerId) => ({
                url: `${PLAYERS_URL}/deletePlayer/${playerId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Player'], // Invalidate the cache when a player is deleted
        }),
        releasePlayerFromClub: builder.mutation({
            query: (playerId) => ({
                url: `${PLAYERS_URL}/releasePlayerFromClub/${playerId}`,
                method: 'PUT',
            }),
            invalidatesTags: ['Player'], // Invalidate the cache when a player is deleted
        }),
        addPlayerToClub: builder.mutation({
            query: ({ playerId, clubId }) => ({
                url: `${PLAYERS_URL}/addPlayerToClub/${playerId}/${clubId}`,
                method: 'PUT',
            }),
            invalidatesTags: ['Player'], // Invalidate the cache when a player is added to a club
        }),
        addPlayerToClubReq: builder.mutation({
            query: ({ playerId, clubId }) => ({
                url: `${PLAYERS_URL}/addPlayerToClubReq/${playerId}/${clubId}`,
                method: 'POST',
            }),
            invalidatesTags: ['Player'], // Invalidate the cache when a player is added to a club
        }),


        // Add the updatePlayer mutation
        updatePlayer: builder.mutation({
            query: ({ id, ...data }) => {
                const formData = new FormData();

                if (data.playerName) formData.append("playerName", data.playerName);
                if (data.dob) formData.append("DOB", data.dob);
                if (data.role) formData.append("role", data.role);
                if (data.profilePicture) formData.append("profilePicture", data.profilePicture); // Should be a file object
                if (data.city) formData.append("city", data.city);
                if (data.email) formData.append("email", data.email);
                if (data.jerseyNumber) formData.append("jersyNo", data.jerseyNumber);
                if (data.phone) formData.append("phone", data.phone);
                if (data.battingStyle) formData.append("battingStyle", data.battingStyle);
                if (data.bowlingStyle) formData.append("bowlingStyle", data.bowlingStyle);
                if (data.cnic) formData.append("CNIC", data.cnic);

                return {
                    url: `${PLAYERS_URL}/updatePlayer/${id}`,
                    method: "PUT",
                    body: formData,
                };
            },
            invalidatesTags: ['Player'],
        }),
        AllPlayers: builder.query({
            query: () => ({
                url: `${PLAYERS_URL}/allplayers`,
                method: 'GET',
            }),
            providesTags: ['Player'], // Provide cache tags for the fetched players
        }),
        updatePlayerStats: builder.mutation({
            query: ({ matchId }) => ({
                url: `${PLAYERS_URL}/updatePlayerStats`,
                method: "PUT",
                body: { matchId },
            }),
            invalidatesTags: ['Player'],
        }),


        getAvailablePlayersForTeam: builder.query({
            query: (clubId) => ({
                url: `${PLAYERS_URL}/getAvailablePlayersForTeam/${clubId}`,
                method: 'GET',
            }),
            providesTags: ['Players'], // This will help in caching the query related to players
        }),



    }),
});

export const {
    useGetAvailablePlayersForTeamQuery,
    useCreatePlayerMutation,
    useGetAllPlayersQuery,
    useDeletePlayerMutation,
    useUpdatePlayerMutation, // Export the updatePlayer mutation hook
    useAllPlayersQuery,
    useUpdatePlayerStatsMutation,
    useGetPlayerByIdQuery,
    useGetRandomPlayersQuery,
    useReleasePlayerFromClubMutation,
    useAddPlayerToClubMutation,
    useAddPlayerToClubReqMutation
} = playerApiSlice;
