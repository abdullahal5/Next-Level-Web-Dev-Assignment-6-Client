import { baseApi } from "../../api/baseApi";

const paymentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createPayment: builder.mutation({
      query: (args) => {
        return {
          url: `/payment/create`,
          method: "POST",
          body: args,
        };
      },
      invalidatesTags: ["payment"],
    }),
    myPayment: builder.query({
      query: (args) => {
        return {
          url: `/payment/get-myPaymentHistory`,
          method: "GET",
          body: args,
        };
      },
      providesTags: ["payment"],
    }),
    getAllPayment: builder.query({
      query: (args) => {
        return {
          url: `/payment/get-all`,
          method: "GET",
          body: args,
        };
      },
      providesTags: ["payment"],
    }),
  }),
});

export const {
  useCreatePaymentMutation,
  useMyPaymentQuery,
  useGetAllPaymentQuery,
} = paymentApi;
