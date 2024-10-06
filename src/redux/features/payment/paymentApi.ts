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
  }),
});

export const { useCreatePaymentMutation } = paymentApi;
