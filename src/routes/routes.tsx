import App from "@/App";
import Home from "@/pages/Home";
import { createBrowserRouter } from "react-router-dom";
// import { adminPaths } from "./admin.routes";
// import { facultyPaths } from "./faculty.routes";
// import { studentPaths } from "./student.routes";
// import { routeGenerator } from "@/utils/routesGenerator";
// import Login from "../pages/login/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
    ]
  },

  // {
  //   path: '/admin',
  //   element: <App />,
  //   children: routeGenerator(adminPaths)
  // },
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