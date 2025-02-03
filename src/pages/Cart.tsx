import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { Input } from '@/components/ui/input'; // Assuming you're using Shadcn Input component for coupon code

const Cart = () => {
    // Dummy cart items data
    const [cartItems, setCartItems] = useState([
        {
            id: 1,
            name: 'Awesome Product',
            price: 49.99,
            quantity: 1,
            image: '/path-to-image.jpg',
        },
        {
            id: 2,
            name: 'Another Product',
            price: 29.99,
            quantity: 2,
            image: '/path-to-image2.jpg',
        },
    ]);

    const [coupon, setCoupon] = useState('');
    const [discount, setDiscount] = useState(0);

    const handleIncrement = (id: number) => {
        setCartItems(prevItems =>
            prevItems.map(item =>
                item.id === id ? { ...item, quantity: item.quantity + 1 } : item
            )
        );
    };

    const handleDecrement = (id: number) => {
        setCartItems(prevItems =>
            prevItems.map(item =>
                item.id === id && item.quantity > 1
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
            )
        );
    };

    const handleCouponChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCoupon(e.target.value);
    };

    const handleApplyCoupon = () => {
        if (coupon === 'DISCOUNT10') {
            setDiscount(10); // Applying 10% discount
        } else {
            alert('Invalid coupon code');
            setDiscount(0);
        }
    };

    const totalPrice = cartItems.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
    );
    const finalPrice = totalPrice - (totalPrice * discount) / 100;

    return (
        <div className="w-full py-12 bg-gray-50">
            <div className="max-w-full px-6 mx-auto">
                <h2 className="mb-6 text-3xl font-semibold">Your Cart</h2>

                {/* Cart Items List */}
                <div className="space-y-8">
                    {cartItems.map(item => (
                        <div key={item.id} className="flex items-center w-full gap-6 p-4 border-b">
                            <img
                                src={item.image}
                                alt={item.name}
                                className="object-cover w-32 h-32 rounded-md"
                            />
                            <div className="flex-grow">
                                <h3 className="text-xl font-medium">{item.name}</h3>
                                <p className="text-gray-600">Price: ${item.price}</p>

                                {/* Quantity Control */}
                                <div className="flex items-center mt-2 space-x-4">
                                    <button
                                        className="px-4 py-2 bg-gray-200 border rounded-md"
                                        onClick={() => handleDecrement(item.id)}>
                                        -
                                    </button>
                                    <span>{item.quantity}</span>
                                    <button
                                        className="px-4 py-2 bg-gray-200 border rounded-md"
                                        onClick={() => handleIncrement(item.id)}>
                                        +
                                    </button>
                                </div>
                            </div>

                            <div className="text-xl font-semibold">
                                ${(item.price * item.quantity).toFixed(2)}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Coupon Section */}
                <div className="flex items-center w-full gap-4 mt-6">
                    <Input
                        type="text"
                        value={coupon}
                        onChange={handleCouponChange}
                        placeholder="Enter coupon code"
                        className="w-2/3 p-3 border rounded-md"
                    />
                    <Button
                        variant="outline"
                        color="secondary"
                        className="w-1/3 py-3"
                        onClick={handleApplyCoupon}>
                        Apply Coupon
                    </Button>
                </div>

                {/* Price Summary */}
                <div className="flex justify-between w-full mt-8 text-xl font-medium">
                    <div>Total Price:</div>
                    <div>${totalPrice.toFixed(2)}</div>
                </div>
                {discount > 0 && (
                    <div className="flex justify-between w-full mt-2 text-xl font-medium text-red-500">
                        <div>Discount ({discount}%):</div>
                        <div>-${((totalPrice * discount) / 100).toFixed(2)}</div>
                    </div>
                )}
                <div className="flex justify-between w-full mt-4 text-2xl font-semibold">
                    <div>Final Price:</div>
                    <div>${finalPrice.toFixed(2)}</div>
                </div>

                {/* Checkout Button */}
                <div className="w-full mt-8">
                    <Button color="primary" className="w-full py-3">
                        Proceed to Checkout
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Cart;
