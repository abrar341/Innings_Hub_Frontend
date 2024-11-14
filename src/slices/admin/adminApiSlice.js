import { apiSlice } from '../apiSlice';

const CLUBS_URL = '/api/club'; // Assuming this is the correct base URL for clubs
const MATCHES_URL = '/api/match';
const PLAYERS_URL = '/api/player';



export const clubApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // Admin: Get clubs based on status or fetch all
        getClubs: builder.query({
            query: (registrationStatus) => ({
                url: registrationStatus === 'all' ? `${CLUBS_URL}/getClubs` : `${CLUBS_URL}/getClubs?registrationStatus=${registrationStatus}`,
                method: 'GET',
                keepUnusedDataFor: 0,
                refetchOnMountOrArgChange: true,
            }),
            providesTags: ['Admin'], // Provide cache for clubs
        }),
        getInactivePlayers: builder.query({
            query: () => ({
                url: `${PLAYERS_URL}/getInactivePlayers`,
                method: 'GET',
            }),
            providesTags: ['Player'], // Provide cache for club details
        }),

        // Approve a club registration
        approveClub: builder.mutation({
            query: (clubId) => ({
                url: `${CLUBS_URL}/approveClub`,
                method: 'POST',
                body: { clubId }, // Send the club ID in the request body
            }),
            invalidatesTags: ['Admin'], // Invalidate clubs cache to refetch updated data
        }),

        // Reject a club registration
        rejectClub: builder.mutation({
            query: ({ clubId, reason }) => ({
                url: `${CLUBS_URL}/rejectClub`,
                method: 'POST',
                body: { clubId, reason }, // Send the club ID and rejection reason in the request body
            }),
            invalidatesTags: ['Admin'], // Invalidate clubs cache to refetch updated data
        }),

        createPost: builder.mutation({
            query: (data) => {
                const formData = new FormData();

                // Append each image to the formData (use the same field name as in your backend)
                data.images.forEach((imageData) => {
                    formData.append("images", imageData.file);  // 'images' matches the backend field name
                    formData.append("descriptions", imageData.description);  // 'descriptions' for image descriptions
                });

                formData.append("matchId", data.matchId); // Append match ID

                return {
                    url: `${MATCHES_URL}/createPost`, // Your API endpoint
                    method: "POST",
                    body: formData,
                };
            },
            invalidatesTags: ['Post'], // Invalidate posts cache after a new post is created
        }),

        getPostsByMatchId: builder.query({
            query: (matchId) => ({
                url: `${MATCHES_URL}/getPostsByMatchId/${matchId}`,
                method: 'GET',

            }),
            providesTags: ['Post'], // Provide cache tags for posts
        }),



    }),
});

export const {
    useGetClubsQuery,
    useApproveClubMutation, // Export the mutation hook for approving clubs
    useRejectClubMutation,  // Export the mutation hook for rejecting clubs
    useCreatePostMutation,
    useGetPostsByMatchIdQuery,
    useGetInactivePlayersQuery
} = clubApiSlice;
