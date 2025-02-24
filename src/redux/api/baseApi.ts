/* eslint-disable @typescript-eslint/no-explicit-any */
import { TResponse } from "@/types";
import { RootState } from "./../store";
import {
  BaseQueryApi,
  BaseQueryFn,
  createApi,
  DefinitionType,
  FetchArgs,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { toast } from "sonner";
import { logout, setUser } from "../features/auth/authSlice";

const BACKEND_URL = "https://carstore-with-payment-gateway.vercel.app";
// const BACKEND_URL = "http://localhost:5000";

const baseQuery = fetchBaseQuery({
  baseUrl: `${BACKEND_URL}/api`,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithRefreshToken: BaseQueryFn<
  FetchArgs,
  BaseQueryApi,
  DefinitionType
> = async (args, api, extraOptions): Promise<any> => {
  let result = (await baseQuery(args, api, extraOptions)) as TResponse<any>;
  if (result?.error?.status === 404) {
    toast.dismiss();
    toast.error(result?.error?.data.message);
  }
  if (result.error?.status === 401) {
    //* send refresh token
    // console.log("sending refresh token");
    const res = await fetch(`${BACKEND_URL}/api/auth/refresh-token`, {
      method: "POST",
      credentials: "include",
    });
    const data = await res.json();
    if (data?.data?.accessToken) {
      const user = (api.getState() as RootState).auth.user;
      api.dispatch(
        setUser({
          user,
          token: data.data.accessToken,
        }),
      );
      result = (await baseQuery(args, api, extraOptions)) as TResponse<any>;
    } else {
      api.dispatch(logout());
    }
  }
  return result;
};

const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithRefreshToken,
  endpoints: () => ({}),
  tagTypes: ["product", "single-product", "order", "users"],
});

export default baseApi;
