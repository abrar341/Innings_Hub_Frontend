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
                formData.append("review", JSON.stringify(data.review));
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
        getClubTeams: builder.query({
            query: (id) => ({
                url: `${CLUBS_URL}/getTeamsByClub/${id}`,
                method: 'GET',
            }),
            providesTags: ['Team'], // Provide cache for club details
        }),
        getAllClubs: builder.query({
            query: () => ({
                url: `${CLUBS_URL}/getAllClubs`, // Always fetch all clubs
                method: 'GET',
            }),
            providesTags: ['Clubs'], // Provide cache for clubs
        }),

    }),
});

export const {
    useRegisterClubMutation,
    useGetClubDetailsQuery,
    useGetClubPlayersQuery,
    useGetClubTeamsQuery,
    useGetAllClubsQuery
} = clubApiSlice;
