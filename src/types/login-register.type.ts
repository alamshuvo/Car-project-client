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
