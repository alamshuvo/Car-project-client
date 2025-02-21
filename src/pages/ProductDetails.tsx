import CarouselComponent from '@/components/CarouselComponent/CarouselComponent';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useGetSingleProductQuery } from '@/redux/features/admin/productManagement.api';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';


const reviews = [
    {
        name: 'John Doe',
        rating: 5,
        comment: 'This product is amazing! It met all my expectations.',
    },
    {
        name: 'Jane Smith',
        rating: 4,
        comment: 'Good quality, but the color was a bit different from the picture.',
    },
];


const similarProducts = [
    {
        name: 'Product 1',
        price: 29.99,
        image: '/path-to-similar-product1.jpg',
    },
    {
        name: 'Product 2',
        price: 39.99,
        image: '/path-to-similar-product2.jpg',
    },
    {
        name: 'Product 3',
        price: 59.99,
        image: '/path-to-similar-product3.jpg',
    },
];

const ProductDetails = () => {
    const navigate = useNavigate();
    const { id: productId } = useParams<{ id: string }>();
    const { data: productData, isLoading } = useGetSingleProductQuery({ productId });

    const [quantity, setQuantity] = useState(1);
    const [selectedColor, setSelectedColor] = useState(productData?.specifications?.availableColors?.[0]);

    const handleDecrement = () => setQuantity(prev => Math.max(prev - 1, 1));
    const handleIncrement = () => {
        if (productData?.stock && productData?.stock > quantity) {
            setQuantity(prev => prev + 1);
        }
    };

    const handleCheckout = () => {
        if (!selectedColor) {
            toast.error('Please select an available color!');
            return;
        }
        navigate('/checkout', {
            state: {
                productId: productId,
                quantity: quantity,
                selectedColor: selectedColor,
                productData: productData,
            }
        });
    }

    if (isLoading) return 'Loading...';
    if (!productData) return 'Loading...';
    return (
        <div className="w-full rounded-xl bg-gray-50">
            {/* Product/Service Details */}
            <div className="flex gap-12 px-6 py-12 mx-auto ">
                {/* Images Column */}
                <div className="w-1/2">
                    <CarouselComponent bottomNavigation={true} carouselType='images' images={productData.images} />
                </div>

                {/* Information Column */}
                <div className="w-1/2 space-y-6">
                    {/* Product/Service Name */}
                    <h2 className="text-3xl font-semibold">{productData.name}</h2>



                    {/* Specifications Section */}
                    <div>
                        <h3 className="mb-4 text-2xl font-semibold">Product Specifications</h3>
                        <ul className="pl-5 space-y-3 list-disc">

                            <li>Seating Capacity: {productData?.specifications?.seatingCapacity}</li>
                            <li>Fuel Type: {productData?.specifications?.fuelType}</li>
                            <li>Mileage: {productData?.specifications?.mileage}</li>
                            <li>Air-conditioner:
                                {productData?.specifications?.hasAC ? (
                                    <Badge className="ml-2 bg-green-500">Yes</Badge>
                                ) : (
                                    <Badge className="ml-2 bg-red-500">No</Badge>
                                )}
                            </li>

                        </ul>
                    </div>


                    {/* Color, Size, Stock Quantity */}
                    <div className="space-y-3">
                        <span className="font-medium">Available Colors:</span>
                        <div className='flex flex-wrap items-center space-x-2'>
                            {productData?.specifications?.availableColors?.map((color: string, index: number) => (
                                <button
                                    key={index}
                                    style={{ backgroundColor: color }}
                                    className={`w-16 h-16 px-4 py-1 text-white rounded ${selectedColor === color ? 'border-2 border-blue-500' : ''}`}
                                    onClick={() => setSelectedColor(color)}
                                >
                                </button>
                            ))}
                        </div>
                        <div>
                            <span className="font-medium">Stock: </span>
                            <span className='text-lg font-bold'>{productData.stock}</span> items available
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        {/* Quantity Control */}
                        <div className="flex items-center space-x-4">
                            <button
                                disabled={productData?.stock === 0}
                                className="px-4 py-2 bg-gray-200 border rounded-md"
                                onClick={handleDecrement}>
                                -
                            </button>
                            <span>{quantity}</span>
                            <button
                                disabled={productData?.stock === 0}
                                className="px-4 py-2 bg-gray-200 border rounded-md"
                                onClick={handleIncrement}>
                                +
                            </button>
                        </div>
                        <p className='pr-2 text-3xl font-bold'>
                            ${productData.price}
                        </p>
                    </div>



                    {/* Buy Now CTA */}
                    <Button onClick={handleCheckout} disabled={productData?.stock === 0} variant="default" color="primary" className="w-full py-3">
                        Buy Now
                    </Button>
                </div>
            </div>

            {/* Reviews Section */}
            <div className="px-6 py-12 mx-auto ">
                <h3 className="mb-4 text-2xl font-semibold">Customer Reviews</h3>
                <div className="space-y-6">
                    {reviews.map((review, index) => (
                        <div key={index} className="pb-4 border-b">
                            <h4 className="font-medium">{review.name}</h4>
                            <p>⭐⭐⭐⭐⭐</p>
                            <p>{review.comment}</p>
                        </div>
                    ))}
                </div>
            </div>



            {/* Description Section */}
            <div className="px-6 py-12 mx-auto ">
                <h3 className="mb-4 text-2xl font-semibold">Product Description</h3>
                <p>
                    {productData.description}
                </p>
            </div>

            {/* Similar Products/Services */}
            <div className="px-6 py-12 mx-auto ">
                <h3 className="mb-4 text-2xl font-semibold">Similar Products</h3>
                <div className="grid grid-cols-3 gap-6">
                    {similarProducts.map((product, index) => (
                        <div key={index} className="p-4 border rounded-lg">
                            <img src={product.image} alt={`Similar Product ${index + 1}`} className="object-cover w-full h-48 mb-4 rounded-lg" />
                            <h4 className="text-xl font-semibold">{product.name}</h4>
                            <p className="text-gray-500">Price: ${product.price}</p>
                            <Button variant="default" color="primary" className="w-full py-2 mt-4">
                                View Details
                            </Button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
