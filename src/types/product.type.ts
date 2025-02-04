export type TProductProperty = {
  icon: React.ReactNode;
  title: string;
};

export type TProduct = {
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
