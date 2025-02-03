import { TProduct } from "@/types";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import StarRatings from 'react-star-ratings';

interface ISingleProduct {
    product: TProduct,
}
const SingleProduct = ({ product }: ISingleProduct) => {
    return (
        <Card className="transition-all duration-300 bg-gray-100 cursor-pointer hover:bg-white hover:shadow-lg">
            <CardContent className="p-2">
                <img src={product.imageURL} className="h-[200px] rounded-xl mix-blend-multiply" alt="" />
                <div className="p-4 pt-0">
                    <h3 className="mt-3 text-2xl font-bold text-blue-800 uppercase">
                        {product.title}
                    </h3>
                    <div className="flex items-center mb-3">
                        <StarRatings
                            rating={product.rating}
                            // changeRating={this.changeRating}
                            numberOfStars={5}
                            name='rating'
                            starDimension="18px"
                            starSpacing="3px"
                            starRatedColor="gold"
                            starEmptyColor="gray"
                            starHoverColor="orange"
                        />
                        <p className="pt-1 ml-4 text-gray-500">
                            {product.rating} ({product.reviewCount / 1000}k)
                        </p>
                    </div>
                    <div className="flex flex-wrap items-center justify-start">
                        {product.productProperties.map((property, idx) => (
                            <div className={`grid place-items-center ${idx !== product.productProperties.length - 1 ? 'mr-8' : 'mr-0'}`}>
                                <div className="flex flex-col items-center justify-center p-4 bg-blue-100 rounded-lg">
                                    {property.icon}
                                </div>
                                <p>
                                    {property.title}
                                </p>
                            </div>
                        ))}
                    </div>
                    <p>
                        {product.productLink}
                    </p>
                    <Button className="px-6 py-5 mt-4">Buy Now</Button>
                </div>
            </CardContent>
        </Card>
    );
};

export default SingleProduct;