import { apiSlice } from '../apiSlice';
const USERS_URL = '/api/users';

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/login`,
        method: 'POST',
        body: data,
      }),
    }),
    logout: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/logout`,
        method: 'POST',
        body: data,
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/register`,
        method: 'POST',
        body: data,
      }),
    }),
    changePassword: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/change-password`,
        method: 'POST',
        body: data,
      }),
    }),

    forgotPassword: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/forgot-password`,
        method: 'POST',
        body: data,
      }),
    }),

    updateUser: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/profile`,
        method: 'PUT',
        body: data,
      }),
    }),
    // updateUser: builder.mutation({
    //   query: (data) => ({
    //     url: `${USERS_URL}/profile`,
    //     method: 'PUT',
    //     body: data,
    //   }),
    // }),
    verifyEmail: builder.mutation({
      query: ({ email, code }) => ({
        url: `${USERS_URL}/verify-email`,
        method: 'POST',
        body: { email, code }, // Send email and code in the body
      }),
    }),
    getUserInfo: builder.query({
      query: (id) => ({
        url: `${USERS_URL}/userProfile/${id}`,
        method: 'GET',
      }),
    }),
    getAllScorers: builder.query({
      query: () => ({
        url: `${USERS_URL}/getAllScorers`,
        method: 'GET',
      }),
    }),
    //delete Scorer
    deleteUser: builder.mutation({
      query: (userId) => ({
        url: `${USERS_URL}/deleteUser/${userId}`,
        method: 'DELETE',
      }),
    }),

  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useUpdateUserMutation,
  useVerifyEmailMutation,
  useGetUserInfoQuery,
  useGetAllScorersQuery,
  useDeleteUserMutation,
  useForgotPasswordMutation,
  useChangePasswordMutation
} = userApiSlice;
