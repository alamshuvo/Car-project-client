import baseApi from "@/redux/api/baseApi";
import { IStats, TResponseRedux } from "@/types";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserDashboardStats: builder.query({
      query: () => {
        return {
          url: `/user/dashboard-stats`,
          method: "GET"
        };
      },
      transformResponse: (response: TResponseRedux<IStats>) => {
        if (response.success && response?.data) {
          return response.data;
        }
        return response.data;
      }
    })
  })
});

export const { useGetUserDashboardStatsQuery } = userApi;
