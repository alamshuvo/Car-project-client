import { TMeta } from "./global.type";
import { IProduct } from "./product.type";

export interface IOrderResponse {
  data: IOrderData[];
  meta: TMeta;
}

export type TOrderStatus = "pending" | "processing" | "shipped" | "delivered" | "cancelled";

export interface IOrderData {
  _id: string;
  userId: string;
  products: IOrderProduct[];
  totalPrice: number;
  status: TOrderStatus;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
  id: string;
}

export interface IOrderProduct {
  product: IProduct;
  quantity: number;
  color: string;
  _id: string;
}

export interface IOrderUpdateStatus {
  success: boolean;
  statusCode: number;
  message: string;
  data: IOrderProduct;
}
