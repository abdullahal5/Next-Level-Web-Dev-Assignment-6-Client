import { baseApi } from "../../api/baseApi";

const commentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createComment: builder.mutation({
      query: (args) => {
        return {
          url: `/comment/create`,
          method: "POST",
          body: args,
        };
      },
      invalidatesTags: ["post"],
    }),
  }),
});

export const { useCreateCommentMutation } = commentApi;
