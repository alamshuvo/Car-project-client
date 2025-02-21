import { Skeleton } from "@/components/ui/skeleton";

const ProductListSkeleton = () => {
    return (
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
    );
};

export default ProductListSkeleton;