import { Skeleton } from "@/components/ui/skeleton";
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

const AdminDashboard = () => {
  const { data, isLoading } = useGetUserDashboardStatsQuery([], {
    pollingInterval: 30 * 1000,
    refetchOnFocus: true,
    refetchOnReconnect: true,
  });

  const StatBar = ({
    label,
    value,
    color,
    isMoney = false,
  }: {
    label: string;
    value: number;
    color: string;
    isMoney?: boolean;
  }) => {
    const chartData = [{ name: label, value }];
    return (
      <div className="w-full p-4 bg-white rounded-2xl shadow">
        <h2 className="mb-2 text-lg font-semibold text-center text-gray-700">{label}</h2>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" hide />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill={color} barSize={60} radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
        <p className="mt-2 text-xl font-bold text-center text-gray-900">
          {isMoney ? `$${value.toFixed(2)}` : value}
        </p>
      </div>
    );
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h1 className="mb-8 text-3xl font-bold text-center">Admin Dashboard</h1>

      <div className="grid grid-cols-1 gap-6 mx-auto max-w-6xl md:grid-cols-2">
        {isLoading ? (
          <>
            <Skeleton className="h-[250px] w-full" />
            <Skeleton className="h-[250px] w-full" />
            <Skeleton className="h-[250px] w-full" />
            <Skeleton className="h-[250px] w-full" />
          </>
        ) : (
          <>
            <StatBar
              label="User Total Spent"
              value={data?.totalSpent || 0}
              color="#3b82f6"
              isMoney
            />
            <StatBar
              label="Total Orders Till Now"
              value={data?.totalOrders || 0}
              color="#10b981"
            />
            <StatBar
              label="Total Delivered Orders"
              value={data?.deliveredOrders || 0}
              color="#22c55e"
            />
            <StatBar
              label="Total Processing Orders"
              value={data?.processingOrders || 0}
              color="#6366f1"
            />
          </>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
