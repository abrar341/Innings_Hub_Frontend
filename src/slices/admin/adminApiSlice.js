import { apiSlice } from '../apiSlice';

const CLUBS_URL = '/api/club'; // Assuming this is the correct base URL for clubs

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
    }),
});

export const {
    useGetClubsQuery,
    useApproveClubMutation, // Export the mutation hook for approving clubs
    useRejectClubMutation,  // Export the mutation hook for rejecting clubs
} = clubApiSlice;
