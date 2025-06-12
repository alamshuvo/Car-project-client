import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Badge } from "../ui/badge";
import { Skeleton } from "../ui/skeleton";
import { useEffect, useState } from "react";
import {
  useGetAllOrdersQuery,
  useUpdateOrderStatusMutation,
} from "@/redux/features/orders/orderApi";
import { IOrderUpdateStatus, TQueryParam, TResponseRedux } from "@/types";
import { toUpperCaseFirstChar } from "@/utils/helperFunctions";
import { Box } from "lucide-react";
import { useAppSelector } from "@/redux/hook";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { OrderUpdateModal } from "./OrderUpdateModal";
import { orderStatuses } from "@/utils/global.constants";
import { ConfirmModal } from "../ConfirmModal/ConfirmModal";
import { Button } from "../ui/button";
import { toast } from "sonner";
// import { Link } from "react-router-dom";
const OrderList = () => {
  const [params, setParams] = useState<TQueryParam[]>([]);
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState("all");
  const { data, isLoading, refetch, isFetching } = useGetAllOrdersQuery(params);
  const user = useAppSelector(selectCurrentUser);

  useEffect(() => {
    const newParams = [
      { name: "page", value: `${page}` },
      { name: "limit", value: `5` },
      { name: "sortBy", value: "createdAt" },
      { name: "sortOrder", value: "desc" },
    ];
    if (status !== "all") {
      newParams.push({ name: "status", value: status });
    }
    setParams(newParams);
    refetch();
  }, [page, status, refetch]);

  const orders = data?.data || [];
  const meta = data?.meta;
 console.log(orders);
  const tabs = ["all", ...orderStatuses];
  const [updateStatus] = useUpdateOrderStatusMutation();

  // function to handle order cancellation
  // some code added added and added some code 
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
    <div className="w-11/12 mx-auto">
      <h2 className="my-6 text-2xl font-bold">Order list</h2>
      <Tabs defaultValue="all" className="w-full">
        <TabsList
          className={`grid w-full grid-cols-3 sm:grid-cols-6 place-content-center  justify-start h-fit sm:h-12 bg-transparent border-b rounded-none`}
        >
          {tabs?.map((tab, idx) => (
            <TabsTrigger
              onClick={() => {
                setStatus(tab);
                setPage(1);
              }}
              key={idx}
              value={tab}
              className="h-10"
            >
              <span className="font-bold">{toUpperCaseFirstChar(tab)}</span>
            </TabsTrigger>
          ))}
        </TabsList>
        {!isLoading && meta && (
          <div className="flex items-center justify-between mt-6">
            <p>
              Showing{" "}
              {meta.page === 1 ? 1 : meta.page * meta.limit - meta.limit + 1} to{" "}
              {meta.page * meta.limit > meta.total
                ? meta.total
                : meta.page * meta.limit}{" "}
              of total {meta.total}
            </p>
            <div>
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      href="#"
                      onClick={() => setPage(page > 1 ? page - 1 : 1)}
                    />
                  </PaginationItem>
                  {Array.from({ length: meta.totalPages }).map((_, index) => (
                    <PaginationItem key={index}>
                      <PaginationLink
                        href="#"
                        isActive={page === index + 1}
                        onClick={() => setPage(index + 1)}
                      >
                        {index + 1}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  <PaginationItem>
                    <PaginationNext
                      href="#"
                      onClick={() =>
                        setPage(
                          page === meta.totalPages ? meta.totalPages : page + 1,
                        )
                      }
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </div>
        )}
        {/* Dynamically switch content based on the tab status */}
        {tabs?.map((tab) => (
          <TabsContent key={tab} value={tab} className="mt-6">
            <div className="space-y-4">
              {isLoading || isFetching ? (
                Array.from({ length: 2 }).map((_, index) => (
                  <Card key={index}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <Skeleton className="w-8 h-8 rounded-full" />
                          <Skeleton className="w-32 h-4" />
                        </div>
                        <Skeleton className="w-20 h-4" />
                      </div>
                      <div className="space-y-4">
                        {Array.from({ length: 2 }).map((_, idx) => (
                          <div key={idx} className="flex gap-4">
                            <Skeleton className="w-16 h-16" />
                            <div className="flex-1">
                              <Skeleton className="w-full h-4 mb-2" />
                              <Skeleton className="w-24 h-4" />
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : orders.length>0  && !isLoading? (
                orders?.map((order) => (
                  <Card key={order.id}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between pb-4 mb-4 border-b">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">
                            Order Id: {order.id}
                          </span>
                        </div>
                        <div className="flex flex-col items-end justify-center gap-1 sm:items-center sm:justify-end sm:flex-row">
                          <div>
                            <Badge variant={order.status} className="mr-0">
                              {order.status.charAt(0).toUpperCase() +
                                order.status.slice(1)}
                            </Badge>
                          </div>
                          {user?.role == "admin" &&
                            order.status !== "cancelled" && (
                              <OrderUpdateModal
                                orderId={order._id}
                                currentStatus={order.status}
                              />
                            )}
                          {user?.role == "user" &&
                            order.status === "pending" && (
                              <ConfirmModal
                                title="Cancel Order?"
                                description="Are you sure you want to cancel this order? This action is irreversible."
                                confirmText="Yes"
                                cancelText="No"
                                onConfirm={() => cancelOrder(order._id)}
                                triggerButton={
                                  <Button variant="destructive" className="h-6">
                                    Cancel Order
                                  </Button>
                                }
                              />
                            )}
                        </div>
                      </div>
                      {/* <div className="space-y-4">
                        {order?.products?.map((item) => (
                          <div key={item._id} className="flex gap-4">
                            <Link to={`/product-details/${item.product._id}`}>
                              <div className="w-16 h-16 overflow-hidden rounded">
                                <img
                                  src={item?.product?.images[0]}
                                  alt={item?.product?.name}
                                  className="object-cover w-full h-full"
                                />
                              </div>
                            </Link>
                            <div className="flex-1">
                              <h3 className="mb-1 font-medium line-clamp-2">
                                <Link
                                  to={`/product-details/${item.product._id}`}
                                >
                                  {item.product.name}
                                </Link>
                              </h3>
                              <div className="text-sm text-gray-500">
                                Color: {item.color}
                              </div>
                              <div className="flex items-center justify-between mt-2">
                                <span className="text-sm">
                                  Qty: {item.quantity}
                                </span>
                                <span className="font-medium">
                                  ${item.product.price.toLocaleString()}
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                        <div className="flex items-center justify-between pt-4 border-t">
                          <Link to={`/${user?.role}/order-details/${order._id}`}>
                            <Button>Details</Button>
                          </Link>
                          <div className="text-right">
                            <div className="text-sm text-gray-500">
                              Order Total:
                            </div>
                            <div className="text-lg font-medium">
                              ${order.totalPrice.toLocaleString()}
                            </div>
                          </div>
                        </div>
                      </div> */}
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center h-64 text-gray-500">
                  <Box className="w-16 h-16 mb-4" />
                  <p>No orders found!</p>
                </div>
              )}
            </div>
          </TabsContent>
        ))}
      </Tabs>

      {!isLoading && meta && (
        <div className="flex items-center justify-between mt-6">
          <p>
            Showing{" "}
            {meta.page === 1 ? 1 : meta.page * meta.limit - meta.limit + 1} to{" "}
            {meta.page * meta.limit > meta.total
              ? meta.total
              : meta.page * meta.limit}{" "}
            of total {meta.total}
          </p>
          <div>
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={() => setPage(page > 1 ? page - 1 : 1)}
                  />
                </PaginationItem>
                {Array.from({ length: meta.totalPages }).map((_, index) => (
                  <PaginationItem key={index}>
                    <PaginationLink
                      href="#"
                      isActive={page === index + 1}
                      onClick={() => setPage(index + 1)}
                    >
                      {index + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={() =>
                      setPage(
                        page === meta.totalPages ? meta.totalPages : page + 1,
                      )
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderList;
