import { useGetUserDashboardStatsQuery } from "@/redux/features/user/userApi";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { Skeleton } from "@/components/ui/skeleton";

const UserDashboard = () => {
  const { data, isLoading } = useGetUserDashboardStatsQuery([], {
    pollingInterval: 30 * 1000,
    refetchOnFocus: true,
    refetchOnReconnect: true,
  });

  // Reusable component for individual bar charts
  const StatBar = ({ label, value, color }: { label: string; value: number; color: string }) => {
    const chartData = [{ name: label, value }];

    return (
      <div className="w-full p-4 bg-white rounded-2xl shadow">
        <h2 className="mb-2 text-lg font-semibold text-gray-700 text-center">{label}</h2>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" hide />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill={color} radius={[8, 8, 0, 0]} barSize={80} />
          </BarChart>
        </ResponsiveContainer>
        <p className="mt-2 text-xl font-bold text-center text-gray-900">
          {label === "Total Spent" ? `$${value.toFixed(2)}` : value}
        </p>
      </div>
    );
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h1 className="mb-8 text-3xl font-bold text-center">User Dashboard</h1>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-2 max-w-6xl mx-auto">
        {isLoading ? (
          <>
            <Skeleton className="h-[250px] w-full" />
            <Skeleton className="h-[250px] w-full" />
            <Skeleton className="h-[250px] w-full" />
            <Skeleton className="h-[250px] w-full" />
          </>
        ) : (
          <>
            <StatBar label="Total Spent" value={data?.totalSpent || 0} color="#3b82f6" />
            <StatBar label="Total Orders" value={data?.totalOrders || 0} color="#10b981" />
            <StatBar label="Pending Orders" value={data?.pendingOrders || 0} color="#f59e0b" />
            <StatBar label="Processing Orders" value={data?.processingOrders || 0} color="#6366f1" />
          </>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
