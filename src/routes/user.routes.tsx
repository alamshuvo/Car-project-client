import Orders from "@/pages/User/Orders";
import UserDashboard from "@/pages/User/UserDashboard";
import { TRouteItemsPath } from "@/types";
import { Boxes, LayoutDashboard } from "lucide-react";
import { Navigate } from "react-router-dom";

export const userPaths: TRouteItemsPath[] = [
    {

        name: '',
        index: true,
        element: <Navigate to="dashboard" replace />,
    },
    {
        icon: <LayoutDashboard />,
        name: 'Dashboard',
        path: 'dashboard',
        element: <UserDashboard />
    },
    {
        icon: <Boxes />,
        name: 'Orders',
        path: 'order',
        element: <Orders />
    },
]