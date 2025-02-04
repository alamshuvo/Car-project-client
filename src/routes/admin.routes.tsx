import AdminDashboard from "@/pages/Admin/AdminDashboard";
import CreateProduct from "@/pages/Admin/CreateProduct";
import { TRouteItemsPath } from "@/types";
import { Box, LayoutDashboard } from "lucide-react";
import { Navigate } from "react-router-dom";


export const adminPaths: TRouteItemsPath[] = [
    {
        name: '',
        index: true,
        element: <Navigate to="dashboard" replace />,
    },
    {
        icon: <LayoutDashboard />,
        name: 'Dashboard',
        path: 'dashboard',
        element: <AdminDashboard />
    },
    {
        icon: <Box/>,
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
