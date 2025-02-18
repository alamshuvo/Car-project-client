import Login from "@/pages/Login";
import { TRouteItemsPath } from "@/types";

export const userPaths: TRouteItemsPath[] = [
    {
        name: 'Login',
        path: 'login',
        element: <Login />
    }
]