import { TMeta } from "./global.type";

export type TReviewFormValues = {
  rating: number;
  comment: string;
};

export interface IReviewResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: IReview;
}
export interface IMultiReviewResponse {
  result: IMultiReview[];
  meta: TMeta;
}

export interface IReview {
  productId: string;
  userId: string;
  rating: number;
  comment: string;
  isDeleted: boolean;
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  id: string;
}

export interface IMultiReview {
  productId: string;
  userId: {
    _id: string;
    name: string;
  };
  rating: number;
  comment: string;
  isDeleted: boolean;
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  id: string;
}
