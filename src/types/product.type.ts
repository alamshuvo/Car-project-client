export type TProductProperty = {
  icon: React.ReactNode;
  title: string;
};

export type TUIProduct = {
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

export type TProduct = {
  _id?: string;
  name: string;
  brand: string;
  price: number;
  model: string;
  stock: number;
  description: string;
  category: string;
  images: string;
  specifications: {
    seatingCapacity: number;
    fuelType: string;
    mileage: string;
    hasAC: string;
    availableColors: string;
  };
};