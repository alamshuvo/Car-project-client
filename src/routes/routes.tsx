import App from "@/App";
import Cart from "@/pages/Cart";
import Checkout from "@/pages/Checkout";
import Home from "@/pages/Home";
import ProductDetails from "@/pages/ProductDetails";
import Products from "@/pages/Products";
import { routeGenerator } from "@/utils/routesGenerator";
import { createBrowserRouter } from "react-router-dom";
import { adminPaths } from "./admin.routes";
import AdminLayout from "@/layout/AdminLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'products',
        element: <Products />,
      },
      {
        path: 'product-details/:id',
        element: <ProductDetails />,
      },
      {
        path: 'cart',
        element: <Cart />,
      },
      {
        path: 'checkout',
        element: <Checkout />,
      },
    ]
  },

  {
    path: '/admin',
    element: <AdminLayout />,
    children: routeGenerator(adminPaths)
  },
  // {
  //   path: '/faculty',
  //   element: <App />,
  //   children: routeGenerator(facultyPaths)
  // },
  // {
  //   path: '/student',
  //   element: <App />,
  //   children: routeGenerator(studentPaths)
  // },
  // {
  //   path: '/login',
  //   element: <Login/>
  // }
]);

export default router;