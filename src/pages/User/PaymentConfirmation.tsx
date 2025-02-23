import { Link, useLocation } from "react-router-dom";
import { useVerifyPaymentQuery } from "@/redux/features/payment/paymentApi.ts";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button.tsx";

const PaymentConfirmation = () => {
    const { search } = useLocation();
    const queryParams = new URLSearchParams(search);
    const orderId = queryParams.get("order_id");

    const { data, isLoading } = useVerifyPaymentQuery(orderId);
    const success = isLoading ? false : data?.data.sp_message === "Success";

    return (
        <div className="flex items-center justify-center w-full h-full">
            <motion.div
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="w-full max-w-md p-8 text-center bg-white shadow-lg rounded-2xl"
            >
                {isLoading ? (
                    <div className="flex flex-col items-center space-y-4">
                        <Loader2 className="w-16 h-16 text-blue-500 animate-spin" />
                        <h2 className="text-lg font-semibold text-gray-700">
                            Verifying Your Payment...
                        </h2>
                        <p className="text-gray-500">Please wait while we process your payment.</p>
                    </div>
                ) : success ? (
                    <div className="flex flex-col items-center space-y-4">
                        <CheckCircle className="w-20 h-20 text-green-500" />
                        <h2 className="text-2xl font-bold text-green-600">Payment Verified!</h2>
                        <p className="text-gray-600">
                            Thank you! Your payment with order ID <strong>{orderId}</strong> has been successfully
                            verified.
                        </p>
                        <Link to={'/user/order'}>
                            <Button className={'primary'}>
                                Go to orders
                            </Button>
                        </Link>

                    </div>
                ) : (
                    <div className="flex flex-col items-center space-y-4">
                        <XCircle className="w-20 h-20 text-red-500" />
                        <h2 className="text-2xl font-bold text-red-600">Verification Failed</h2>
                        <p className="text-gray-600">
                            Unfortunately, we couldn't verify your payment. Please try again or contact support.
                        </p>
                        <Link to={'/user/order'}>
                            <Button className={'primary'}>
                                Go to orders
                            </Button>
                        </Link>
                    </div>
                )}
            </motion.div>
        </div>
    );
};

export default PaymentConfirmation;
