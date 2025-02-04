import { Skeleton } from "@/components/ui/skeleton";

const ProductListSkeleton = () => {
    return (
        <div className="flex flex-col w-full">
            {/* Title Skeleton */}
            <div className="my-12 text-center">
                <Skeleton className="w-64 h-12 mx-auto" />
            </div>

            <div className="flex flex-col md:flex-row">
                {/* Sidebar Skeleton (Desktop) */}
                <div className="hidden w-1/5 p-4 border-r md:block">
                    <Skeleton className="w-3/4 h-8 mb-4" />
                    <Skeleton className="w-full h-32 mb-4" />
                    <Skeleton className="w-full h-40 mb-4" />
                    <Skeleton className="w-full h-24" />
                </div>

                {/* Mobile Filter Button Skeleton */}
                <div className="m-4 md:hidden">
                    <Skeleton className="w-24 h-10" />
                </div>

                {/* Products Grid Skeleton */}
                <div className="flex-1 p-4">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
                        {/* Generate 8 product card skeletons */}
                        {Array.from({ length: 8 }).map((_, idx) => (
                            <div key={idx} className="flex flex-col space-y-3">
                                <Skeleton className="w-full h-48 rounded-lg" /> {/* Image */}
                                <Skeleton className="w-3/4 h-4" /> {/* Title */}
                                <Skeleton className="w-1/2 h-4" /> {/* Brand */}
                                <Skeleton className="w-1/4 h-4" /> {/* Price */}
                                <div className="flex gap-2">
                                    <Skeleton className="w-full h-8" /> {/* Button */}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Pagination Skeleton */}
            <div className="flex justify-center my-8">
                <div className="flex gap-2">
                    {Array.from({ length: 5 }).map((_, idx) => (
                        <Skeleton key={idx} className="w-8 h-8 rounded" />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProductListSkeleton;