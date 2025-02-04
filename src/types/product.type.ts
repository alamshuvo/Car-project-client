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
  name: string;
  brand: string;
  price: string;
  model: string;
  stock: string;
  description: string;
  category: string;
  images: string;
  specifications: {
    seatingCapacity: string;
    fuelType: string;
    mileage: string;
    hasAC: string;
    availableColors: string;
  };
};