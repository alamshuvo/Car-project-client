export type TProductProperty = {
  icon: React.ReactNode;
  title: string;
};

export type TProduct = {
  imageURL: string;
  title: string;
  rating: number;
  reviewCount: number;
  productLink: string;
  productProperties: TProductProperty[];
};
