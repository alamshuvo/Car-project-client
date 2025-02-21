import {useLocation} from "react-router-dom";
import {useVerifyPaymentQuery} from "@/redux/features/payment/paymentApi.ts";
import {CheckCircle, XCircle, Loader2} from "lucide-react";
import {motion} from "framer-motion";
import {Button} from "@/components/ui/button.tsx";

const PaymentConfirmation = () => {
    const {search} = useLocation();
    const queryParams = new URLSearchParams(search);
    const orderId = queryParams.get("order_id");

    const {data, isLoading} = useVerifyPaymentQuery(orderId);
    const success = isLoading ? false : data.sp_message === "Success";

    return (
        <div className="w-full h-full flex items-center justify-center">
            <motion.div
                initial={{opacity: 0, y: -30}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.6}}
                className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md text-center"
            >
                {isLoading ? (
                    <div className="flex flex-col items-center space-y-4">
                        <Loader2 className="animate-spin w-16 h-16 text-blue-500"/>
                        <h2 className="text-lg font-semibold text-gray-700">
                            Verifying Your Payment...
                        </h2>
                        <p className="text-gray-500">Please wait while we process your payment.</p>
                    </div>
                ) : success ? (
                    <div className="flex flex-col items-center space-y-4">
                        <CheckCircle className="text-green-500 w-20 h-20"/>
                        <h2 className="text-2xl font-bold text-green-600">Payment Verified!</h2>
                        <p className="text-gray-600">
                            Thank you! Your payment with order ID <strong>{orderId}</strong> has been successfully
                            verified.
                        </p>
                        <a href={'/user/order'}>
                            <Button className={'primary'}>
                                Go to orders
                            </Button>
                        </a>

                    </div>
                ) : (
                    <div className="flex flex-col items-center space-y-4">
                        <XCircle className="text-red-500 w-20 h-20"/>
                        <h2 className="text-2xl font-bold text-red-600">Verification Failed</h2>
                        <p className="text-gray-600">
                            Unfortunately, we couldn't verify your payment. Please try again or contact support.
                        </p>
                        <a href={'/user/order'}>
                            <Button className={'primary'}>
                                Go to orders
                            </Button>
                        </a>
                    </div>
                )}
            </motion.div>
        </div>
    );
};

export default PaymentConfirmation;
