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
    deleteComment: builder.mutation({
      query: (args) => {
        return {
          url: `/comment/delete/${args}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["post"],
    }),
  }),
});

export const { useCreateCommentMutation, useDeleteCommentMutation } =
  commentApi;
