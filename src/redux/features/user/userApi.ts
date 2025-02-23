import baseApi from "@/redux/api/baseApi";
import { IStats, IUsersResponse, TResponseRedux } from "@/types";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserDashboardStats: builder.query({
      query: () => {
        return {
          url: `/user/dashboard-stats`,
          method: "GET",
        };
      },
      transformResponse: (response: TResponseRedux<IStats>) => {
        if (response.success && response?.data) {
          return response.data;
        }
        return response.data;
      },
    }),

    // block an user
    blockUser: builder.mutation({
      query: (userId: string) => {
        return {
          url: `/user/${userId}`,
          method: "PATCH",
          body: { isBlocked: true },
        };
      },
      transformResponse: (response: TResponseRedux<null>) => {
        return response.success;
      },
      invalidatesTags: ["users"],
    }),

    // unblock an user
    unblockUser: builder.mutation({
      query: (userId: string) => {
        return {
          url: `/user/${userId}`,
          method: "PATCH",
          body: { isBlocked: false },
        };
      },
      transformResponse: (response: TResponseRedux<null>) => {
        return response.success;
      },
      invalidatesTags: ["users"],
    }),

    // fetch all user
    getAllUsers: builder.query({
      query: () => {
        return {
          url: `/user`,
          method: "GET",
        };
      },
      providesTags: ["users"],
      transformResponse: (response: TResponseRedux<IUsersResponse>) => {
        if (response.success && response?.data) {
          return {
            users: response.data.users,
            meta: response.data.meta,
          };
        }
        return {
          users: [],
          meta: {
            total: 0,
            page: 1,
            limit: 10,
            totalPages: 1,
          },
        };
      },
    }),
  }),
});

export const {
  useGetUserDashboardStatsQuery,
  useGetAllUsersQuery,
  useBlockUserMutation,
  useUnblockUserMutation,
} = userApi;
