import FormComponent from "@/components/Form/FormComponent";
import FormInput from "@/components/Form/FormInput";
import FormTextarea from "@/components/Form/FormTextarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { reviewValidationSchema } from "@/schema/reviewValidationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  useCreateReviewMutation,
  useGetReviewsOfAProductQuery,
} from "@/redux/features/review/reviewApi";
import { TError, TReviewFormValues } from "@/types";
import { useState } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";
import StarRatings from "react-star-ratings";

interface IReviewSectionProps {
  hasPurchased?: boolean;
  productId?: string;
}

export const ReviewSection = ({
  hasPurchased,
  productId,
}: IReviewSectionProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const defaultReviewValues: TReviewFormValues = {
    rating: 1,
    comment: "",
  };
  const { data: reviewsData, isLoading } = useGetReviewsOfAProductQuery([
    { name: "productId", value: `${productId}` },
  ]);
  if (!isLoading) {
    console.log(reviewsData);
  }
  const [createReview] = useCreateReviewMutation();

  //* handle review form submit
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const loading = toast.loading("Submitting review...");
    try {
      const payload = { ...data, productId };
      const res = await createReview(payload);
      if (res.data) {
        toast.success(res.data.message, { id: loading });
      } else {
        toast.error((res.error as TError).data.message, { id: loading });
      }
      setIsDialogOpen(false);
    } catch (error) {
      toast.error("Failed to submit review");
      console.error(error);
    }
  };

  return (
    <div className="px-6 py-12 mx-auto">
      {/* Reviews Section */}
      <div className="flex justify-between w-full">
        <h3 className="mb-4 text-2xl font-semibold">Customer Reviews</h3>
        <div>
          {hasPurchased && (
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="default" type="submit">
                  Write a Review
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogDescription />
                <DialogTitle>Write a Review</DialogTitle>
                <FormComponent
                  onSubmit={onSubmit}
                  defaultValues={defaultReviewValues}
                  resolver={zodResolver(reviewValidationSchema)}
                >
                  <FormInput type="number" name="rating" label="Rating" />
                  <FormTextarea name="comment" label="Review" />
                  <DialogFooter>
                    <Button variant="default" type="submit">
                      Submit Review
                    </Button>
                  </DialogFooter>
                </FormComponent>
              </DialogContent>
            </Dialog>
          )}
        </div>
      </div>
      {isLoading ? (
        <Skeleton className="h-4 w-[200px]" />
      ) : (
        <div className="space-y-6">
          {reviewsData?.reviews.map((review, index) => (
            <div key={index} className="pb-4 border-b">
              <h4 className="font-medium">{review.userId.name}</h4>
              <StarRatings
                rating={review.rating}
                numberOfStars={5}
                name="rating"
                starDimension="15px"
                starSpacing="3px"
                starRatedColor="gold"
                starEmptyColor="gray"
                starHoverColor="orange"
              />
              <p>{review.comment}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
