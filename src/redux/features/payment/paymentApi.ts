import baseApi from "@/redux/api/baseApi";
import {
  IPaymentInitResponse,
  IPaymentVerification,
  TResponseRedux,
} from "@/types";

const paymentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    //* Get single billing address of a user
    initiatePayment: builder.mutation({
      query: (orderId) => {
        return {
          url: `/payments/create`,
          method: "POST",
          body: { orderId },
        };
      },
      transformResponse: (response: TResponseRedux<IPaymentInitResponse>) => {
        if (response.success && response?.data) {
          return response.data;
        }
        return response.data;
      },
    }),

    //* verify payment
    verifyPayment: builder.query({
      query: (orderId) => {
        return {
          url: `/payments/verify?order_id=${orderId}`,
          method: "GET",
        };
      },
      transformResponse: (response: TResponseRedux<IPaymentVerification>) => {
        if (response.success && response?.data) {
          return response.data;
        }
        return undefined;
      },
    }),
  }),
});

export const { useInitiatePaymentMutation, useVerifyPaymentQuery } = paymentApi;
