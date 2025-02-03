import { Button } from '@/components/ui/button';
import { useState } from 'react';

// Dummy data
const product = {
    name: 'Awesome Product',
    images: ['/path-to-image1.jpg', '/path-to-image2.jpg'],
    colorOptions: ['Red', 'Blue', 'Green'],
    sizeOptions: ['Small', 'Medium', 'Large'],
    stock: 20,
    price: 49.99,
};

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

const specifications = [
    'Material: 100% Cotton',
    'Dimensions: 10 x 8 x 4 inches',
    'Weight: 2 kg',
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
    const [quantity, setQuantity] = useState(1);

    const handleIncrement = () => setQuantity(prev => prev + 1);
    const handleDecrement = () => setQuantity(prev => Math.max(prev - 1, 1));

    return (
        <div className="w-full  bg-gray-50">
            {/* Product/Service Details */}
            <div className="flex gap-12 px-6 py-12 mx-auto ">
                {/* Images Column */}
                <div className="w-1/2">
                    <div className="space-y-4">
                        {product.images.map((image, index) => (
                            <img key={index} src={image} alt={`Product Image ${index + 1}`} className="object-cover w-full h-auto rounded-lg" />
                        ))}
                    </div>
                </div>

                {/* Information Column */}
                <div className="w-1/2 space-y-6">
                    {/* Product/Service Name */}
                    <h2 className="text-3xl font-semibold">{product.name}</h2>

                    {/* Color, Size, Stock Quantity */}
                    <div className="space-y-3">
                        <div>
                            <span className="font-medium">Color:</span>
                            <select className="p-2 ml-2 border rounded-md">
                                {product.colorOptions.map((color, index) => (
                                    <option key={index} value={color.toLowerCase()}>
                                        {color}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <span className="font-medium">Size:</span>
                            <select className="p-2 ml-2 border rounded-md">
                                {product.sizeOptions.map((size, index) => (
                                    <option key={index} value={size.toLowerCase()}>
                                        {size}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <span className="font-medium">Stock:</span>
                            <span>{product.stock} items available</span>
                        </div>
                    </div>

                    {/* Quantity Control */}
                    <div className="flex items-center space-x-4">
                        <button
                            className="px-4 py-2 bg-gray-200 border rounded-md"
                            onClick={handleDecrement}>
                            -
                        </button>
                        <span>{quantity}</span>
                        <button
                            className="px-4 py-2 bg-gray-200 border rounded-md"
                            onClick={handleIncrement}>
                            +
                        </button>
                    </div>

                    {/* Add to Cart or Book Service Button */}
                    <Button variant="default" color="primary" className="w-full py-3">
                        Add to Cart
                    </Button>

                    {/* For Service */}
                    <Button variant="outline" color="secondary" className="w-full py-3">
                        Book Service
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

            {/* Specifications Section */}
            <div className="px-6 py-12 mx-auto ">
                <h3 className="mb-4 text-2xl font-semibold">Product Specifications</h3>
                <ul className="pl-5 space-y-3 list-disc">
                    {specifications.map((spec, index) => (
                        <li key={index}>{spec}</li>
                    ))}
                </ul>
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
                                Add to Cart
                            </Button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
