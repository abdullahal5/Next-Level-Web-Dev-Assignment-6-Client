import { baseApi } from "../../api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/signup",
        method: "POST",
        body: userInfo,
      }),
      invalidatesTags: ["user"],
    }),
    login: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/login",
        method: "POST",
        body: userInfo,
      }),
      invalidatesTags: ["user"],
    }),
    forgetPassword: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/forget-password",
        method: "POST",
        body: userInfo,
      }),
    }),
    resetPassword: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/reset-password",
        method: "POST",
        body: { email: userInfo?.email, newPassword: userInfo?.newPassword },
        headers: {
          Authorization: `Bearer ${userInfo?.token}`,
        },
      }),
    }),
    changePassword: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/change-password",
        method: "POST",
        body: userInfo,
      }),
    }),
    followAndUnfollowUser: builder.mutation({
      query: (args) => ({
        url: `/auth/followunfollow`,
        method: "PUT",
        body: {
          id: args,
        },
      }),
      invalidatesTags: ["post", "user"],
    }),
    favouritePost: builder.mutation({
      query: (args) => ({
        url: `/auth/favourite-toggle`,
        method: "PUT",
        body: {
          id: args,
        },
      }),
      invalidatesTags: ["post", "user"],
    }),
    getMe: builder.query({
      query: (args) => {
        return {
          url: `/auth/get-single-user/${args._id}`,
          method: "GET",
        };
      },
      providesTags: ["post", "user"],
    }),
    getAllUser: builder.query({
      query: () => {
        return {
          url: `/auth/get-all-user`,
          method: "GET",
        };
      },
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useForgetPasswordMutation,
  useResetPasswordMutation,
  useChangePasswordMutation,
  useFollowAndUnfollowUserMutation,
  useFavouritePostMutation,
  useGetMeQuery,
  useGetAllUserQuery,
} = authApi;
