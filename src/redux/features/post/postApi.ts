import { baseApi } from "../../api/baseApi";

const postApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createPost: builder.mutation({
      query: (args) => {
        return {
          url: `/post/create`,
          method: "POST",
          body: args,
        };
      },
      invalidatesTags: ["post"],
    }),
    getAllPost: builder.query({
      query: ({
        query,
        categories,
      }: {
        query?: string;
        categories?: string;
      }) => {
        const searchParam = query ? `searchTerm=${query}` : "";
        const categoryParam = categories ? `category=${categories}` : "";

        const params = [searchParam, categoryParam].filter(Boolean).join("&");

        const url = `/post/get-all${params ? `?${params}` : ""}`;

        return {
          url,
          method: "GET",
        };
      },
      providesTags: ["post"],
    }),

    getSinlePost: builder.query({
      query: (args) => ({
        url: `/post/get-single/${args._id}`,
        method: "GET",
      }),
      providesTags: ["post"],
    }),
    upvoteDownvote: builder.mutation({
      query: (args) => {
        return {
          url: `/post/upvoteDownvote/${args._id}`,
          method: "PUT",
          body: { type: args.type },
        };
      },
      invalidatesTags: ["post"],
    }),
    deletePost: builder.mutation({
      query: (args) => {
        return {
          url: `/post/delete/${args}`,
          method: "DELETE",
          body: args,
        };
      },
      invalidatesTags: ["post"],
    }),
    getMyPost: builder.query({
      query: () => ({
        url: "/post/get-my",
        method: "GET",
      }),
      providesTags: ["post"],
    }),
    updatePost: builder.mutation({
      query: (args) => {
        return {
          url: `/post/update/${args._id}`,
          method: "PUT",
          body: args,
        };
      },
      invalidatesTags: ["post"],
    }),
  }),
});

export const {
  useGetAllPostQuery,
  useGetSinlePostQuery,
  useUpvoteDownvoteMutation,
  useDeletePostMutation,
  useCreatePostMutation,
  useGetMyPostQuery,
  useUpdatePostMutation,
} = postApi;
