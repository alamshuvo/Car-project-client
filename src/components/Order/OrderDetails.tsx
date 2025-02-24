import { Link, useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { useGetSingleOrderQuery, useUpdateOrderStatusMutation } from "@/redux/features/orders/orderApi";
import { OrderUpdateModal } from "./OrderUpdateModal";
import { useAppSelector } from "@/redux/hook";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { IOrderUpdateStatus, TOrderStatus, TResponseRedux } from "@/types";
import { ConfirmModal } from "../ConfirmModal/ConfirmModal";
import { toast } from "sonner";
import { Button } from "../ui/button";

const OrderDetails = () => {

    const user = useAppSelector(selectCurrentUser);

    const { id } = useParams<{ id: string }>();
    const { data: order, isLoading: loading } = useGetSingleOrderQuery(id);

    const [updateStatus] = useUpdateOrderStatusMutation();

    if (!order && !loading) {
        return <div className="grid h-screen place-content-center">
            Something went wrong while fetching order details.
        </div>
    }
    // function to handle order cancellation
    const cancelOrder = async (orderId: string) => {
        const toastId = toast.loading("Updating order status");
        try {
            const res = (await updateStatus({
                id: orderId,
                status: "cancelled",
            })) as TResponseRedux<IOrderUpdateStatus>;
            // console.log(res);
            if (res.data?.success) {
                toast.success("Successfully cancelled the order!", { id: toastId });
            } else {
                toast.error(
                    res.error?.data.message ||
                    "Some error occurred while canceling order!",
                    { id: toastId },
                );
            }
        } catch (err) {
            console.log(err);
            toast.success("Some error occurred while canceling order!", {
                id: toastId,
            });
        }
    };


    return (
        <div className="p-4 mx-auto space-y-6 max-w-11/12 md:p-8">
            {/* Title */}
            <div className="flex justify-between">
                <h1 className="text-2xl font-bold ">Order Details</h1>
                {
                    !loading && <div >
                        {user?.role == "admin" &&
                            order!.status !== "cancelled" && (
                                <OrderUpdateModal
                                    orderId={order!._id}
                                    currentStatus={order!.status as TOrderStatus}
                                    triggerButton={<Button>Update Order Status</Button>}
                                />
                            )}
                        {user?.role == "user" &&
                            order!.status === "pending" && (
                                <ConfirmModal
                                    title="Cancel Order?"
                                    description="Are you sure you want to cancel this order? This action is irreversible."
                                    confirmText="Yes"
                                    cancelText="No"
                                    onConfirm={() => cancelOrder(order!._id)}
                                    triggerButton={
                                        <Button variant="destructive" className="h-6">
                                            Cancel Order
                                        </Button>
                                    }
                                />
                            )}
                    </div>
                }
            </div>


            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                {/* Order Info Card */}
                <Card>
                    <CardHeader>
                        <CardTitle>Order Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        {loading ? (
                            <>
                                <Skeleton className="w-1/2 h-6" />
                                <Skeleton className="w-1/3 h-4" />
                                <Skeleton className="w-1/4 h-4" />
                            </>
                        ) : (
                            <>
                                <p><strong>Order ID:</strong> {order!.orderId}</p>
                                <div><strong>Status:</strong> <Badge variant="outline">{order!.status}</Badge></div>
                                <p><strong>Total Price:</strong> ৳{order!.totalPrice}</p>
                            </>
                        )}
                    </CardContent>
                </Card>

                {/* Payment Info Card */}
                <Card>
                    <CardHeader>
                        <CardTitle>Payment Details</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        {loading ? (
                            <>
                                <Skeleton className="w-1/2 h-4" />
                                <Skeleton className="w-1/3 h-4" />
                                <Skeleton className="w-1/4 h-4" />
                            </>
                        ) : order!.paymentDetails ? (
                            <>
                                <p><strong>Payment Status:</strong> {order!.paymentDetails.status}</p>
                                <p><strong>Amount:</strong> ৳{order!.paymentDetails.amount}</p>
                                <p><strong>Transaction ID:</strong> {order!.paymentDetails.spOrderId}</p>
                            </>
                        ) : (
                            <p>No payment details available.</p>
                        )}
                    </CardContent>
                </Card>

                {/* Billing Address Card */}
                <Card>
                    <CardHeader>
                        <CardTitle>Billing Address</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        {loading ? (
                            <>
                                <Skeleton className="w-3/4 h-4" />
                                <Skeleton className="w-1/2 h-4" />
                                <Skeleton className="w-1/3 h-4" />
                            </>
                        ) : order!.billingAddress ? (
                            <>
                                <p><strong>Name:</strong> {order!.billingAddress.customerName}</p>
                                <p><strong>Phone:</strong> {order!.billingAddress.customerPhone}</p>
                                <p><strong>Address:</strong> {order!.billingAddress.customerAddress}, {order!.billingAddress.customerCity} - {order!.billingAddress.customerPostCode}</p>
                            </>
                        ) : (
                            <p>No billing address available.</p>
                        )}
                    </CardContent>
                </Card>

                {/* Products List Card */}
                <Card>
                    <CardHeader>
                        <CardTitle>Ordered Products</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {loading ? (
                            <>
                                <Skeleton className="w-3/4 h-6" />
                                <Skeleton className="w-2/3 h-6" />
                            </>
                        ) : order!.products.length > 0 ? (
                            order!.products.map((item, index) => (
                                <div
                                    key={index}
                                    className="flex flex-col p-3 border rounded-lg sm:flex-row sm:justify-between"
                                >
                                    <div>
                                        <p><strong>Product Name:</strong>
                                            <Link className="ml-2 text-purple-700 underline" to={`/product-details/${item.product._id}`}>
                                                {item.product.name}
                                            </Link>
                                        </p>
                                        <p><strong>Price:</strong> ৳{item.product.price}</p>
                                    </div>
                                    <div className="mt-2 sm:mt-0">
                                        <p><strong>Quantity:</strong> {item.quantity}</p>
                                        <p><strong>Color:</strong> <span style={{ backgroundColor: item.color }} className="inline-block w-5 h-5 border rounded-full" /></p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>No products found in this order!.</p>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default OrderDetails;
