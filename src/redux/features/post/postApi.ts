import { baseApi } from "../../api/baseApi";

const postApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllPost: builder.query({
      query: () => ({
        url: "/post/get-all",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetAllPostQuery } = postApi;
