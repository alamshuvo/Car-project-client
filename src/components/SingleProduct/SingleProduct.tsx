import { TUIProduct } from "@/types";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import StarRatings from "react-star-ratings";
import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";

interface ISingleProduct {
  product: TUIProduct;
  forCarousel?: boolean;
}

const SingleProduct = ({ product, forCarousel }: ISingleProduct) => {
  return (
    <Card className="relative group transition-all duration-300 bg-white border border-gray-200 rounded-xl hover:shadow-xl">
      {/* Price Tag */}
      <p className="absolute top-3 right-3 bg-primary text-white text-sm font-semibold px-3 py-1 rounded-md z-10">
        ${product.price}
      </p>

      {/* Card Content */}
      <CardContent
        className={`p-4 ${
          forCarousel ? "sm:flex justify-center items-center block" : ""
        }`}
      >
        {/* Product Image */}
        <div className="w-full flex justify-center mb-4">
          <img
            src={product.imageURL}
            alt={product.title}
            className="h-[180px] w-auto rounded-lg object-contain transition-transform duration-300 group-hover:scale-105 mix-blend-multiply"
          />
        </div>

        {/* Product Info */}
        <div className="text-center">
          <h3 className="text-lg font-semibold text-blue-900 uppercase mb-2">
            <Link
              to={`/product-details/${product._id}`}
              className="hover:underline"
            >
              {product.title}
            </Link>
          </h3>

          {/* Rating Section */}
          <div className="flex items-center justify-center mb-3">
            <StarRatings
              rating={product.rating}
              numberOfStars={5}
              name="rating"
              starDimension="16px"
              starSpacing="3px"
              starRatedColor="gold"
              starEmptyColor="lightgray"
            />
            <p className="ml-2 text-sm text-gray-500">
              {product.rating} (
              {product.reviewCount > 1000
                ? `${Math.floor(product.reviewCount / 1000)}k`
                : product.reviewCount}
              )
            </p>
          </div>

          {/* Product Properties */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
            {product.productProperties.map((property, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <div className="p-2 bg-blue-100 rounded-full mb-1">
                  {property.icon}
                </div>
                <p className="text-xs font-medium text-gray-700">
                  {property.title}
                </p>
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div
            className={`flex ${
              forCarousel ? "sm:flex-row" : "flex-col"
            } justify-center items-center gap-3`}
          >
            <Link
              to={`/product-details/${product._id}`}
              className="w-full sm:w-40"
            >
              <Button className="w-full flex justify-center gap-2 items-center py-5">
                Buy Now <ShoppingCart size={16} />
              </Button>
            </Link>
            <Link
              to={`/product-details/${product._id}`}
              className="w-full sm:w-40"
            >
              <Button variant="outline" className="w-full py-5">
                View
              </Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SingleProduct;
