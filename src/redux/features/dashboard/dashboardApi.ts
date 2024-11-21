import { baseApi } from "../../api/baseApi";

const dahsboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    dashbaordData: builder.query({
      query: (args) => {
        return {
          url: `/dashboard/get-myStats?query=${args}`,
          method: "GET",
        };
      },
      providesTags: ["payment", "post", "user"],
    }),
  }),
});

export const { useDashbaordDataQuery } = dahsboardApi;
