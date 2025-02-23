import { TResponseRedux } from "@/types";
import baseApi from "../../api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    //* login route
    login: builder.mutation({
      query: (userCredentials) => ({
        url: "/auth/login",
        method: "POST",
        body: userCredentials,
      }),
    }),

    //* passowrd update route
    updatePassword: builder.mutation({
      query: (userCredentials: {
        password: string;
        currentPassword: string;
      }) => ({
        url: "/auth/update-password",
        method: "PATCH",
        body: userCredentials,
      }),
    }),

    //* register route
    register: builder.mutation({
      query: (userData) => {
        return {
          url: "/auth/register",
          method: "POST",
          body: userData,
        };
      },
      transformResponse: (response: TResponseRedux<null>) => response,
    }),
  }),
});
export const {
  useLoginMutation,
  useRegisterMutation,
  useUpdatePasswordMutation,
} = authApi;
