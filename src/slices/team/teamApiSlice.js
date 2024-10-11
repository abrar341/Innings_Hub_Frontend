import { apiSlice } from '../apiSlice';

const TEAMS_URL = '/api/team';

export const teamApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // Mutation to create a new team
        createTeam: builder.mutation({
            query: (data) => {
                console.log(data);

                const formData = new FormData();
                formData.append("teamName", data.teamName);
                formData.append("shortName", data.shortName);
                formData.append("teamtype", data.teamtype);
                formData.append("associatedClub", data.clubId);
                if (data.logo) formData.append("teamLogo", data.logo);

                return {
                    url: `${TEAMS_URL}/createTeam`,
                    method: "POST",
                    body: formData,
                };
            },
            invalidatesTags: ['Team'], // Invalidate the cache when a new team is created
        }),

        // Query to fetch all teams
        getAllTeams: builder.query({
            query: () => ({
                url: `${TEAMS_URL}/allTeams`,
                method: 'GET',
            }),
            providesTags: ['Team'], // Provide cache tags for the fetched teams
        }),

        // Mutation to delete a team
        deleteTeam: builder.mutation({
            query: (teamId) => ({
                url: `${TEAMS_URL}/deleteTeam/${teamId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Team'], // Invalidate the cache when a team is deleted
        }),

        // Mutation to update a team
        updateTeam: builder.mutation({
            query: ({ id, ...data }) => {
                const formData = new FormData();

                if (data.teamName) formData.append("teamName", data.teamName);
                if (data.shortName) formData.append("shortName", data.shortName);
                if (data.teamtype) formData.append("teamtype", data.teamtype);
                if (data.location) formData.append("location", data.location);
                if (data.logo) formData.append("teamLogo", data.logo); // Make sure you're using `data.logo` here

                return {
                    url: `${TEAMS_URL}/updateTeam/${id}`,
                    method: 'PUT',
                    body: formData,
                };
            },
            invalidatesTags: ['Team'], // Invalidate the cache when a team is updated
        }),

        getSingleTeamDetail: builder.query({
            query: (id) => ({
                url: `${TEAMS_URL}/getSingleTeamDetail/${id}`,
                method: 'GET',
            }),
            providesTags: ['Team'],
        }),
        addPlayerToTeam: builder.mutation({
            query: ({ teamId, playerIds }) => ({
                url: `${TEAMS_URL}/addPlayerToTeam`, // Endpoint to add players to a team
                method: 'POST',
                body: { teamId, playerIds }, // Sending teamId and playerIds in the request body
            }),
            invalidatesTags: ['Team'], // Invalidate team data to refetch after adding players
        }),

        removePlayerFromTeam: builder.mutation({
            query: ({ teamId, playerId }) => ({
                url: `${TEAMS_URL}/removePlayerFromTeam`,
                method: 'DELETE',
                body: { teamId, playerId },
            }),
            invalidatesTags: ['Team'],
        }),


    }),
});

export const {
    useAddPlayerToTeamMutation,
    useRemovePlayerFromTeamMutation,
    useCreateTeamMutation,
    useGetAllTeamsQuery,
    useDeleteTeamMutation,
    useUpdateTeamMutation,
    useGetSingleTeamDetailQuery
} = teamApiSlice;
