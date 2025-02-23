import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import Autoplay from "embla-carousel-autoplay";
import { IProduct, TUIProduct } from "@/types";
import SingleProduct from "../SingleProduct/SingleProduct";
import { AirVent, Fuel, ParkingMeter, User2 } from "lucide-react";

interface ICarouselComponentProps {
  carouselType?: string;
  images?: string[];
  bottomNavigation?: boolean;
  products?: IProduct[];
}

const CarouselComponent = ({
  carouselType,
  images,
  bottomNavigation = false,
  products = [],
}: ICarouselComponentProps) => {
  const uIProducts: TUIProduct[] = products.map((product) => ({
    _id: product._id,
    imageURL: product.images[0],
    title: product.name,
    brand: product.brand,
    price: product.price,
    stock: product.stock,
    category: product.category,
    productProperties: [
      {
        icon: <User2 />,
        title: `${product.specifications.seatingCapacity} Seat`,
      },
      {
        icon: <Fuel />,
        title: product.specifications.fuelType,
      },
      {
        icon: <ParkingMeter />,
        title: product.specifications.mileage,
      },
      {
        icon: <AirVent />,
        title: product.specifications.hasAC ? "AC" : "No AC",
      },
    ],
    productLink: "",
    reviewCount: product.totalReviews ?? 0,
    rating: product.averageRating ?? 0,
  }));

  return (
    <div>
      {carouselType !== "images" && (
        <h3 className="my-16 text-5xl font-bold text-center uppercase">
          Trending products
        </h3>
      )}
      <Carousel
        plugins={[
          Autoplay({
            delay: 3000,
          }),
        ]}
        opts={{ align: "start", loop: true, duration: 10 }}
      >
        <CarouselContent>
          {products.length
            ? uIProducts.map((product, idx) => (
                <CarouselItem key={idx}>
                  <SingleProduct forCarousel={true} product={product} />
                </CarouselItem>
              ))
            : carouselType !== "images"
              ? Array.from({ length: 5 }).map((_, index) => (
                  <CarouselItem key={index}>
                    <div className="p-1">
                      <Card>
                        <CardContent className="flex h-[400px] items-center justify-center p-6 aspect-auto">
                          <span className="text-4xl font-semibold">
                            {index + 1}
                          </span>
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                ))
              : images?.map((image, index) => (
                  <CarouselItem key={index}>
                    <img
                      src={image}
                      alt={`Product Image ${index + 1}`}
                      className="object-cover w-full h-auto rounded-lg"
                    />
                  </CarouselItem>
                ))}
        </CarouselContent>

        {bottomNavigation ? (
          // bottom nav
          <div className="absolute flex space-x-4 transform -translate-x-1/2 -bottom-1 left-1/2">
            <CarouselPrevious />
            <CarouselNext />
          </div>
        ) : (
          <div>
            <CarouselPrevious className="hidden md:inline-flex" />
            <CarouselNext className="hidden md:inline-flex" />
          </div>
        )}
      </Carousel>
    </div>
  );
};

export default CarouselComponent;
