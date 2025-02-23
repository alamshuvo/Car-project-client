import { TMeta } from "./global.type";
import { IProduct } from "./product.type";

export interface IOrderResponse {
  data: IOrderData[];
  meta: TMeta;
}

export type TOrderStatus = "pending" | "processing" | "shipped" | "delivered" | "cancelled";

export interface IOrderData {
  _id: string;
  orderId: string;
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

export interface IPaymentInitResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: string;
}

export interface IPaymentVerificationResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: IPaymentVerification;
}

export interface IPaymentVerification {
  id: number;
  order_id: string;
  currency: string;
  amount: number;
  payable_amount: number;
  discsount_amount: null;
  disc_percent: number;
  received_amount: string;
  usd_amt: number;
  usd_rate: number;
  is_verify: number;
  card_holder_name: null;
  card_number: null;
  phone_no: string;
  bank_trx_id: string;
  invoice_no: string;
  bank_status: string;
  customer_order_id: string;
  sp_code: string;
  sp_message: string;
  name: string;
  email: null;
  address: string;
  city: string;
  value1: null;
  value2: null;
  value3: null;
  value4: null;
  transaction_status: null;
  method: string;
  date_time: Date;
}
