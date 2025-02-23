import baseApi from "@/redux/api/baseApi";
import {
  IMultiReviewResponse,
  IReviewResponse,
  TQueryParam,
  TResponseRedux,
} from "@/types";

const reviewApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createReview: builder.mutation({
      query: (payload) => {
        return {
          url: "/reviews",
          method: "POST",
          body: payload,
        };
      },
      transformResponse: (response: TResponseRedux<IReviewResponse>) =>
        response,
    }),

    //* get review of a single product
    getReviewsOfAProduct: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((arg: TQueryParam) => {
            params.append(arg.name, arg.value);
          });
        }
        return {
          url: "/reviews",
          method: "GET",
          params: params,
        };
      },
      transformResponse: (response: TResponseRedux<IMultiReviewResponse>) => {
        if (response.success && response.data) {
          return {
            meta: response.data.meta,
            reviews: response.data.result,
          };
        }
        return {
          meta: null,
          reviews: [],
        };
      },
    }),

    //* update review of a single product
    updateReview: builder.mutation({
      query: (payload) => {
        return {
          url: `/reviews/${payload.id}`,
          method: "PATCH",
          body: payload,
        };
      },
    }),

    deleteReview: builder.mutation({
      query: (id) => ({
        url: `/reviews/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const { useCreateReviewMutation, useGetReviewsOfAProductQuery } =
  reviewApi;
