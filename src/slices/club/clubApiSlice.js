import { apiSlice } from '../apiSlice';

const CLUBS_URL = '/api/club';

export const clubApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        registerClub: builder.mutation({
            query: (data) => {
                console.log(data);

                const formData = new FormData();
                formData.append("clubName", data.clubName);
                formData.append("location", data.location);
                formData.append("yearEstablished", data.yearEstablished);
                formData.append("managerName", data.managerName);
                formData.append("managerEmail", data.managerEmail);
                formData.append("managerPhone", data.managerPhone);
                formData.append("managerAddress", data.managerAddress);
                if (data.clubLogo) {

                    formData.append("clubLogo", data.clubLogo);
                }
                if (data.socialLink) {
                    formData.append("socialLink", data.socialLink);
                }

                return {
                    url: `${CLUBS_URL}/registerClub`,
                    method: "POST",
                    body: formData,
                };
            },
            invalidatesTags: ['Club'], // Invalidate the cache after registering a club
        }),
        getClubDetails: builder.query({
            query: (clubId) => ({
                url: `${CLUBS_URL}/details/${clubId}`,
                method: 'GET',
            }),
            providesTags: ['Club'], // Provide cache for club details
        }),
        getClubPlayers: builder.query({
            query: (id) => ({
                url: `${CLUBS_URL}/getPlayersByClub/${id}`,
                method: 'GET',
            }),
            providesTags: ['Player'], // Provide cache for club details
        }),
    }),
});

export const {
    useRegisterClubMutation,
    useGetClubDetailsQuery,
    useGetClubPlayersQuery
} = clubApiSlice;
