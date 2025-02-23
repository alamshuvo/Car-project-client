import baseApi from "@/redux/api/baseApi";
import { IProduct, TQueryParam, TResponseRedux } from "@/types";

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
      },

      transformResponse: (response: TResponseRedux<IProduct[]>) => {
        console.log({ response });
        if (response.success && response?.data) {
          return {
            data: response.data,
            meta: response.meta
          };
        }
        return response;
      },
      providesTags: ["product"]
    }),
    // gets single product with ID
    getSingleProduct: builder.query({
      query: ({ productId }) => {
        return {
          url: `/products/${productId}`,
          method: "GET"
        };
      },

      transformResponse: (response: TResponseRedux<IProduct>) => {
        if (response.success && response?.data) {
          return response.data;
        }
        return response.data;
      },
      providesTags: ["single-product"]
    }),

    // get top products
    getTopProducts: builder.query({
      query: () => {
        return {
          url: "/products/top-products",
          method: "GET"
        };
      },

      transformResponse: (response: TResponseRedux<IProduct[]>) => {
        if (response.success && response?.data) {
          return {
            data: response.data
          };
        }
        return {
          data: []
        };
      }
    }),

    // get trending products
    getTrendingProducts: builder.query({
      query: () => {
        return {
          url: "/products/trending-products",
          method: "GET"
        };
      },

      transformResponse: (response: TResponseRedux<IProduct[]>) => {
        if (response.success && response?.data) {
          return {
            data: response.data
          };
        }
        return {
          data: []
        };
      }
    }),

    // create product
    createProduct: builder.mutation({
      query: (product) => {
        return {
          url: "/products",
          method: "POST",
          body: product
        };
      }
    }),

    // update product
    updateProduct: builder.mutation({
      query: (updateData) => {
        return {
          url: `/products/${updateData._id}`,
          method: "PATCH",
          body: updateData
        };
      },
      invalidatesTags: ["single-product"]
    }),

    deleteProduct: builder.mutation({
      query: ({ productId }) => {
        return {
          url: `/products/${productId}`,
          method: "DELETE"
        };
      },
      invalidatesTags: ["product"]
    })
  })
});

export const {
  useGetTrendingProductsQuery,
  useGetTopProductsQuery,
  useGetAllProductsQuery,
  useGetSingleProductQuery,
  useCreateProductMutation,
  useDeleteProductMutation,
  useUpdateProductMutation
} = productManagementApi;
