import { TUIProduct } from "@/types";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import StarRatings from 'react-star-ratings';
import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";

interface ISingleProduct {
    product: TUIProduct,
}
const SingleProduct = ({ product }: ISingleProduct) => {
    console.log({singleProduct: product});
    return (
        <Card className="relative transition-all duration-300 bg-gray-100 cursor-pointer hover:bg-white hover:shadow-lg">
            <p className="absolute right-0 p-2 m-2 text-xl font-bold text-white rounded-md bg-primary">$ {product.price}</p>
            <CardContent className="p-2">
                <img src={product.imageURL} className="h-[200px] rounded-xl mix-blend-multiply" alt="" />
                <div className="p-2 pt-0">
                    <h3 className="mt-3 text-lg font-bold text-blue-800 uppercase">
                        {product.title}
                    </h3>
                    <div className="flex items-center mb-3">
                        <StarRatings
                            rating={product.rating}
                            // changeRating={this.changeRating}
                            numberOfStars={5}
                            name='rating'
                            starDimension="15px"
                            starSpacing="3px"
                            starRatedColor="gold"
                            starEmptyColor="gray"
                            starHoverColor="orange"
                        />
                        <p className="pt-1 ml-4 text-sm text-gray-500">
                            {product.rating} ({product.reviewCount / 1000}k)
                        </p>
                    </div>


                    <div className="grid grid-cols-4 gap-2 mb-4">
                        {product.productProperties.map((property, idx) => (
                            <div key={idx} className={`grid place-items-center ${idx !== product.productProperties.length - 1 ? 'mr-4' : 'mr-0'}`}>
                                <div className="flex flex-col items-center justify-center p-3 bg-blue-100 rounded-lg">
                                    {property.icon}
                                </div>
                                <p className="text-sm">{property.title}</p>
                            </div>
                        ))}
                    </div>
                    <div className="flex items-center justify-between">
                        <Link to={`/product-details/${product._id}`}>
                            <Button className="px-6 py-5"> Add to<ShoppingCart />  </Button>
                        </Link>
                        <Link to={`/product-details/${product._id}`}>
                            <Button variant='outline' className="px-6 py-5">View</Button>
                        </Link>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default SingleProduct;