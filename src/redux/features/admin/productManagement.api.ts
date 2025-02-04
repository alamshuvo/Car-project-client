import baseApi from "@/redux/api/baseApi";
import { TQueryParam } from "@/types";

const productManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((arg: TQueryParam) => {
            params.append(arg.name, arg.value);
          });
        }
        return {
          url: "/products",
          method: "GET",
          params: params
        };
      }
    }),
    createProduct: builder.mutation({
      query: (product) => {
        return {
          url: "/products",
          method: "POST",
          body: product
        };
      }
    })
  })
});

export const { useGetAllProductsQuery, useCreateProductMutation } = productManagementApi;
