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
        deletePlayer: builder.mutation({
            query: (playerId) => ({
                url: `${PLAYERS_URL}/deletePlayer/${playerId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Player'], // Invalidate the cache when a player is deleted
        }),
    }),
});

export const {
    useCreatePlayerMutation,
    useGetAllPlayersQuery,
    useDeletePlayerMutation,
} = playerApiSlice;
