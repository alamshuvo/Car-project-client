import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useUpdateOrderStatusMutation } from "@/redux/features/orders/orderApi";
import { IOrderUpdateStatus, TOrderStatus, TResponseRedux } from "@/types";
import { orderStatuses } from "@/utils/global.constants";
import { toUpperCaseFirstChar } from "@/utils/helperFunctions";
import { useState } from "react";
import { toast } from "sonner";

interface IOrderUpdateModalProps {
  orderId: string;
  currentStatus: TOrderStatus;
}

export function OrderUpdateModal({
  orderId,
  currentStatus,
}: IOrderUpdateModalProps) {
  const [selectedStatus, setSelectedStatus] =
    useState<TOrderStatus>(currentStatus);

  const [updateStatus] = useUpdateOrderStatusMutation();

  const handleOrderStatusUpdate = async () => {
    const toastId = toast.loading("Updating order status");
    try {
      const res = (await updateStatus({
        id: orderId,
        status: selectedStatus,
      })) as TResponseRedux<IOrderUpdateStatus>;
      // console.log(res);
      if (res.data?.success) {
        toast.success("Successfully updated order status!", { id: toastId });
      } else {
        toast.error(
          res.error?.data.message ||
            "Some error occurred while updating order status!",
          { id: toastId },
        );
      }
    } catch (err) {
      console.log(err);
      toast.success("Some error occurred while updating order status!", {
        id: toastId,
      });
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default" className="h-6 ml-2">
          Change
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update</DialogTitle>
          <DialogDescription>Change the order status</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Select
            value={selectedStatus}
            onValueChange={(value) => setSelectedStatus(value as TOrderStatus)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select an order status" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Order Status</SelectLabel>
                {orderStatuses.map((status, idx) => (
                  <SelectItem key={idx} value={status}>
                    {toUpperCaseFirstChar(status)}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <DialogFooter>
          <Button onClick={handleOrderStatusUpdate}>Update</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
