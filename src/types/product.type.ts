import { TMeta } from "./global.type";

export type TProductProperty = {
  icon: React.ReactNode;
  title: string;
};

export interface IProductResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: IProduct[];
  meta: TMeta;
}

export type TUIProduct = {
  _id?: string;
  imageURL: string;
  title: string;
  brand: string;
  category: string;
  price: number;
  stock: number;
  rating: number;
  reviewCount: number;
  productLink: string;
  productProperties: TProductProperty[];
};

export interface ISimilarProduct {
  _id: string;
  name: string;
  price: number;
  image?: string[];
}

export interface ISingleProductResponse {
  result: IProduct;
  hasPurchased: boolean;
}

export interface IProduct {
  _id?: string;
  name: string;
  brand: string;
  price: number;
  model: string;
  stock: number;
  description: string;
  category: string;
  images: string[];
  specifications: ISpecifications;
  totalReviews?: number;
  averageRating?: number;
}

export interface ISpecifications {
  seatingCapacity: number;
  fuelType: string;
  mileage: string;
  hasAC: boolean;
  availableColors: string[];
}
