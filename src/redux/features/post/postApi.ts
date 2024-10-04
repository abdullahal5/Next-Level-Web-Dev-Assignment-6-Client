import { baseApi } from "../../api/baseApi";

const postApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllPost: builder.query({
      query: () => ({
        url: "/post/get-all",
        method: "GET",
      }),
      providesTags: ["post"],
    }),
    getSinlePost: builder.query({
      query: (args) => ({
        url: `/post/get-single/${args._id}`,
        method: "GET",
      }),
      providesTags: ["post"],
    }),
  }),
});

export const { useGetAllPostQuery, useGetSinlePostQuery } = postApi;
