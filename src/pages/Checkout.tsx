import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input'; // Assuming you're using Shadcn Input component for address fields
import { useState } from 'react';

const Checkout = () => {
    const [deliveryAddress, setDeliveryAddress] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('credit');
    const [orderPlaced, setOrderPlaced] = useState(false);

    const handlePlaceOrder = () => {
        if (deliveryAddress === '') {
            alert('Please enter your delivery address.');
            return;
        }
        // Order confirmation logic
        setOrderPlaced(true);
    };

    return (
        <div className="w-full py-12 mb-12 space-y-4 rounded bg-gray-50">
            <div className="max-w-4xl px-6 mx-auto">
                <h2 className="mb-6 text-3xl font-semibold">Checkout</h2>

                {/* Delivery Address Section */}
                <div className="mb-8">
                    <h3 className="mb-4 text-2xl font-medium">Delivery Address</h3>
                    <Input
                        type="text"
                        placeholder="Enter your delivery address"
                        className="w-full p-3 border rounded-md"
                        value={deliveryAddress}
                        onChange={(e) => setDeliveryAddress(e.target.value)}
                    />
                </div>

                {/* Payment Method Section */}
                <div className="mb-8">
                    <h3 className="mb-4 text-2xl font-medium">Payment Method</h3>
                    <div className="space-y-4">
                        <div className="flex items-center">
                            <input
                                type="radio"
                                id="credit-card"
                                name="payment-method"
                                checked={paymentMethod === 'credit'}
                                onChange={() => setPaymentMethod('credit')}
                                className="mr-2"
                            />
                            <label htmlFor="credit-card" className="text-lg">
                                Credit Card
                            </label>
                        </div>
                        <div className="flex items-center">
                            <input
                                type="radio"
                                id="paypal"
                                name="payment-method"
                                checked={paymentMethod === 'paypal'}
                                onChange={() => setPaymentMethod('paypal')}
                                className="mr-2"
                            />
                            <label htmlFor="paypal" className="text-lg">
                                PayPal
                            </label>
                        </div>
                        <div className="flex items-center">
                            <input
                                type="radio"
                                id="cash-on-delivery"
                                name="payment-method"
                                checked={paymentMethod === 'cash'}
                                onChange={() => setPaymentMethod('cash')}
                                className="mr-2"
                            />
                            <label htmlFor="cash-on-delivery" className="text-lg">
                                Cash on Delivery
                            </label>
                        </div>
                    </div>
                </div>

                {/* Order Summary Section */}
                <div className="mb-8">
                    <h3 className="mb-4 text-2xl font-medium">Order Summary</h3>
                    <div className="space-y-4">
                        <div className="flex justify-between">
                            <span>Product 1</span>
                            <span>$49.99</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Product 2</span>
                            <span>$29.99</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Shipping</span>
                            <span>$5.00</span>
                        </div>
                        <div className="flex justify-between mt-4 text-xl font-semibold">
                            <span>Total</span>
                            <span>$84.98</span>
                        </div>
                    </div>
                </div>

                {/* Confirmation Button */}
                <div className="w-full">
                    <Button
                        color="primary"
                        className="w-full py-3"
                        onClick={handlePlaceOrder}
                    >
                        {orderPlaced ? 'Order Placed!' : 'Confirm Order'}
                    </Button>
                </div>

                {/* Order Confirmation Message */}
                {orderPlaced && (
                    <div className="mt-8 font-semibold text-center text-green-500">
                        Your order has been successfully placed!
                    </div>
                )}
            </div>
        </div>
    );
};

export default Checkout;
