import { TMeta } from "./../../../types/global.type";
import baseApi from "@/redux/api/baseApi";
import { IOrderResponse, TQueryParam, TResponseRedux } from "@/types";

const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    //* Create an order
    createOrder: builder.mutation({
      query: (orderData) => {
        return {
          url: "/orders",
          method: "POST",
          body: orderData
        };
      }
    }),

    //* Get all orders
    getAllOrders: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((arg: TQueryParam) => {
            params.append(arg.name, arg.value);
          });
        }
        return {
          url: "/orders",
          method: "GET",
          params
        };
      },
      providesTags: ["order"],
      transformResponse: (response: TResponseRedux<IOrderResponse>): IOrderResponse => {
        if (response.success && response?.data) {
          return {
            data: response.data.data,
            meta: response.data.meta
          };
        }
        return {
          data: [],
          meta: {} as TMeta
        };
      }
    }),

    //* Get single order
    getSingleOrder: builder.query({
      query: (id) => {
        return {
          url: `/orders/${id}`,
          method: "GET"
        };
      }
    }),

    //* Update an order
    updateOrder: builder.mutation({
      query: ({ id, updateData }) => {
        return {
          url: `/orders/${id}`,
          method: "PATCH",
          body: updateData
        };
      }
    }),

    //* Update an order status
    updateOrderStatus: builder.mutation({
      query: ({ id, status }) => {
        return {
          url: `/orders/update-status/${id}`,
          method: "PATCH",
          body: { status }
        };
      },
      invalidatesTags: ["order"]
    })
  })
});

export const {
  useCreateOrderMutation,
  useGetAllOrdersQuery,
  useGetSingleOrderQuery,
  useUpdateOrderMutation,
  useUpdateOrderStatusMutation
} = orderApi;
