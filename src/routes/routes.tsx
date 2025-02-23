import App from "@/App";
import Cart from "@/pages/Cart";
import Checkout from "@/pages/Checkout";
import Home from "@/pages/Home";
import ProductDetails from "@/pages/ProductDetails";
import Products from "@/pages/Products";
import { routeGenerator } from "@/utils/routesGenerator";
import { createBrowserRouter } from "react-router-dom";
import { adminPaths } from "./admin.routes";
import DashboardLayout from "@/layout/DashboardLayout";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import { userPaths } from "./user.routes";
import ProtectedRoute from "@/layout/ProtectedRoute";
import PaymentConfirmation from "@/pages/User/PaymentConfirmation.tsx";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import ScrollToTop from "@/components/ScrollToTop/ScrollToTop";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <ScrollToTop />
        <App />
      </>
    ),
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "products",
        element: <Products />,
      },
      {
        path: "product-details/:id",
        element: <ProductDetails />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "checkout",
        element: (
          <ProtectedRoute>
            <Checkout />
          </ProtectedRoute>
        ),
      },
      {
        path: "payments",
        element: <PaymentConfirmation />,
        children: [
          {
            path: "verify",
            index: true,
          },
        ],
      },
    ],
  },

  {
    path: "/admin",
    element: <DashboardLayout />,
    children: routeGenerator(adminPaths),
  },
  {
    path: "/user",
    element: <DashboardLayout />,
    children: routeGenerator(userPaths),
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

export default router;
