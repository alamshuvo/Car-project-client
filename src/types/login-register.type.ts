import { TMeta } from "./global.type";

export interface IRegisterResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: IUserData;
}

export interface IUserData {
  _id: string;
  name: string;
  email: string;
}

export interface ILoginResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    token: string;
  };
}

export interface IUsersResponse {
  users: IUser;
  meta: TMeta;
}

export interface IUser {
  _id: string;
  name: string;
  email: string;
  role: string;
  isBlocked: boolean;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}
