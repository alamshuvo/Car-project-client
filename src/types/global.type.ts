import { BaseQueryApi } from "@reduxjs/toolkit/query";

export type TError = {
  data: { message: string; success: boolean; stack: string };
  status: number;
};

export type TMeta = {
  limit: number;
  page: number;
  total: number;
  totalPages: number;
};

export type TResponse<T> = {
  success: boolean;
  message: string;
  data?: T;
  meta?: TMeta;
  error?: TError;
};

export type TResponseRedux<T> = TResponse<T> & BaseQueryApi;

export type TQueryParam = {
  name: string;
  value: string;
};

export interface IDashboardStatResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: IStats;
}

export interface IStats {
  totalOrders: number;
  totalSpent: number;
  pendingOrders?: number;
  deliveredOrders?: number;
  processingOrders: number;
}
