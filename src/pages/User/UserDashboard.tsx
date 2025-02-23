import { Skeleton } from "@/components/ui/skeleton";
import { useGetUserDashboardStatsQuery } from "@/redux/features/user/userApi";
import { CreditCard, ShoppingBag } from "lucide-react";

const UserDashboard = () => {
    const { data, isLoading } = useGetUserDashboardStatsQuery([], {
        pollingInterval: 30 * 1000,
        refetchOnFocus: true,
        refetchOnReconnect: true,
    });

    return (
        <div className="min-h-screen p-6 bg-gray-100">
            <h1 className="mb-8 text-3xl font-bold text-center">User Dashboard</h1>

            <div className="grid max-w-4xl grid-cols-1 gap-6 mx-auto md:grid-cols-2">
                {/* Total Spent Card */}
                <div className="flex items-center p-6 space-x-4 bg-white shadow-lg rounded-2xl">
                    <div className="p-4 text-blue-600 bg-blue-100 rounded-full">
                        <CreditCard className="w-8 h-8" />
                    </div>
                    <div>
                        <h2 className="text-lg font-semibold text-gray-700">Total Spent</h2>
                        <p className="text-2xl font-bold text-gray-900">
                            {isLoading ? (
                                <Skeleton className="h-6 w-44" />
                            ) : (
                                `$${data?.totalSpent.toFixed(2)}`
                            )}
                        </p>
                    </div>
                </div>

                {/* Total Orders Card */}
                <div className="flex items-center p-6 space-x-4 bg-white shadow-lg rounded-2xl">
                    <div className="p-4 text-green-600 bg-green-100 rounded-full">
                        <ShoppingBag className="w-8 h-8" />
                    </div>
                    <div>
                        <h2 className="text-lg font-semibold text-gray-700">Total Orders</h2>
                        <div className="text-2xl font-bold text-gray-900">
                            {isLoading ? (
                                <Skeleton className="h-6 w-44" />
                            ) : (
                                data?.totalOrders
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserDashboard;
