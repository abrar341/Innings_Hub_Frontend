import { apiSlice } from '../apiSlice';

const NOTIFICATIONS_URL = '/api/notifications';

export const notificationApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // Mutation to mark a notification as read
        markNotificationAsRead: builder.mutation({
            query: (id) => ({
                url: `${NOTIFICATIONS_URL}/markNotificationAsRead/${id}/read`,
                method: 'PATCH',
            }),
            invalidatesTags: ['Notification'], // Invalidate notifications cache
        }),
    }),
});

export const {
    useMarkNotificationAsReadMutation, // Hook to call the mutation
} = notificationApiSlice;
