import { baseApi } from "../../api/baseApi";

const dahsboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    dashbaordData: builder.query({
      query: (args) => {
        return {
          url: `/dashboard/get-myStats`,
          method: "GET",
          body: args,
        };
      },
      providesTags: ["payment", "post", "user"],
    }),
  }),
});

export const { useDashbaordDataQuery } = dahsboardApi;
