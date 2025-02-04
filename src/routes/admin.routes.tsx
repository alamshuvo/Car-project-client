import AdminDashboard from "@/pages/Admin/AdminDashboard";
import CreateProduct from "@/pages/Admin/CreateProduct";
import { LayoutDashboard } from "lucide-react";
import { Navigate } from "react-router-dom";


export const adminPaths = [
    {
        icon: <LayoutDashboard/>,
        name: 'Dashboard',
        index: true,
        element: <Navigate to="dashboard" replace />,
    },
    {
        name: 'Dashboard',
        path: 'dashboard',
        element: <AdminDashboard />
    },
    {
        name: 'Product Management',
        children: [
            {
                name: 'Create Product',
                path: 'create-product',
                element: <CreateProduct />,
            },
        ],
    },
]
