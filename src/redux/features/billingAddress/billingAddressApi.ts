import baseApi from "@/redux/api/baseApi";
const billingAddressApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    //* Get single billing address of a user
    getBillingAddress: builder.query({
      query: () => {
        // console.log(baseApi.endpoints);
        return {
          url: `/billing-address/`,
          method: "GET",
        };
      },
    }),
  }),
});

export const { useGetBillingAddressQuery } = billingAddressApi;
