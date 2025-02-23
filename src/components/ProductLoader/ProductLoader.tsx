import { Skeleton } from "../ui/skeleton";

const ProductLoader = () => {
  return (
    <div className="w-full rounded-xl bg-gray-50">
      <div className="flex gap-12 px-6 py-12 mx-auto ">
        {/* Images Column */}
        <div className="w-1/2">
          <Skeleton className="h-[300px] w-full" />
        </div>

        {/* Information Column */}
        <div className="w-1/2 space-y-6">
          <Skeleton className="h-[30px] w-[80%]" />
          <Skeleton className="h-[25px] w-[60%]" />
          <div className="space-y-4">
            <Skeleton className="h-[20px] w-full" />
            <Skeleton className="h-[20px] w-full" />
            <Skeleton className="h-[20px] w-full" />
            <Skeleton className="h-[20px] w-full" />
          </div>
          <Skeleton className="h-[40px] w-[30%]" />
          <Skeleton className="h-[50px] w-full" />
        </div>
      </div>

      {/* Product Description Skeleton */}
      <div className="px-6 py-12 mx-auto ">
        <Skeleton className="h-[30px] w-[60%]" />
        <Skeleton className="h-[20px] w-full" />
        <Skeleton className="h-[20px] w-full" />
        <Skeleton className="h-[20px] w-full" />
      </div>

      {/* Similar Products Skeleton */}
      <div className="px-6 py-12 mx-auto ">
        <Skeleton className="h-[30px] w-[60%]" />
        <div className="grid grid-cols-3 gap-6">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="p-4 border rounded-lg">
              <Skeleton className="h-[200px] w-full" />
              <Skeleton className="h-[20px] w-[80%]" />
              <Skeleton className="h-[20px] w-[60%]" />
              <Skeleton className="h-[40px] w-full" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductLoader;
