import FormComponent from "@/components/Form/FormComponent";
import FormInput from "@/components/Form/FormInput";
import { Button } from "@/components/ui/button";
import { useCreateOrderMutation } from "@/redux/features/orders/orderApi";
import { useInitiatePaymentMutation } from "@/redux/features/payment/paymentApi";
import { billingAddressValidationSchema } from "@/schema/billingAddressValidationSchema";
import { IProduct } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { useLocation } from "react-router-dom";
import { toast } from "sonner";

const Checkout = () => {
  const location = useLocation();
  const { state } = location;
  const [createOrder] = useCreateOrderMutation();
  const quantity = state.quantity;
  const selectedColor = state.selectedColor;
  const productData = state.productData as IProduct;
  const [paymentMethod, setPaymentMethod] = useState("credit");
  const [orderPlaced, setOrderPlaced] = useState(false);

  const [initiatePayment] = useInitiatePaymentMutation();

  const handlePlaceOrder = () => {
    // Order confirmation logic
    setOrderPlaced(true);
  };

  const handleBillingSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Placing your order...");
    const orderData = {
      ...data,
      products: [
        {
          product: productData._id,
          quantity: quantity,
          color: selectedColor,
        },
      ],
    };
    try {
      const orderResponse = await createOrder(orderData);
      if (orderResponse.error) {
        toast.error("Couldn't process your order!", { id: toastId });
      } else {
        const paymentResponse = await initiatePayment(
          orderResponse.data?.orderId,
        );
        // console.log(paymentResponse)
        window.location.href = (paymentResponse.data ?? "") as string;
      }
    } catch {
      toast.error("Something went wrong on the server!", { id: toastId });
    }
  };

  const defaultValues = {
    customerName: "SM Tamim Mahmud",
    customerAddress: "Khulna",
    customerPhone: "+8801700000000",
    customerCity: "Khulna",
    customerPostCode: "9100",
  };

  return (
    <div className="w-full py-12 mb-12 space-y-4 rounded bg-gray-50">
      <div className="max-w-4xl px-6 mx-auto">
        <h2 className="mb-6 text-3xl font-semibold">Checkout</h2>

        {/* Delivery Address Section */}

        <FormComponent
          defaultValues={defaultValues}
          onSubmit={handleBillingSubmit}
          resolver={zodResolver(billingAddressValidationSchema)}
        >
          <h3 className="my-2 text-xl">Enter your shipping address:</h3>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            <FormInput
              name="customerName"
              type="text"
              label="Enter Name"
              placeholder=""
            />
            <FormInput
              name="customerAddress"
              type="text"
              label="Enter Address"
              placeholder=""
            />
            <FormInput
              name="customerPhone"
              type="text"
              label="Enter Phone"
              placeholder=""
            />
            <FormInput
              name="customerCity"
              type="text"
              label="Enter City"
              placeholder=""
            />
            <FormInput
              name="customerPostCode"
              type="text"
              label="Enter PostCode"
              placeholder=""
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
                  checked={paymentMethod === "credit"}
                  onChange={() => setPaymentMethod("credit")}
                  className="mr-2"
                />
                <label htmlFor="credit-card" className="text-lg">
                  Shurjo Pay
                </label>
              </div>
            </div>
          </div>

          {/* Order Summary Section */}
          <div className="mb-8">
            <h3 className="mb-4 text-2xl font-medium">Order Summary</h3>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span>{productData.name}</span>
                <span>x{quantity}</span>
                <span>${productData.price * quantity}</span>
              </div>
              <div className="flex justify-between mt-4 text-xl font-semibold">
                <span>Total</span>
                <span>${productData.price * quantity}</span>
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
              {orderPlaced ? "Order Placed!" : "Confirm Order"}
            </Button>
          </div>

          {/* Order Confirmation Message */}
          {orderPlaced && (
            <div className="mt-8 font-semibold text-center text-green-500">
              Your order has been successfully placed!
            </div>
          )}
        </FormComponent>
      </div>
    </div>
  );
};

export default Checkout;
