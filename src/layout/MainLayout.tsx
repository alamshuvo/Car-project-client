import Footer from "@/components/Footer/Footer";
import NavBar from "@/components/NavBar/NavBar";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <>
      <div className="bg-purple-600 sticky top-0 z-50">
        <NavBar />
      </div>

      <div className="flex justify-center min-h-screen bg-gray-50">
        <div className="w-11/12 md:w-10/12 max-w-screen-2xl">
          <div className="flex justify-center">
            <Outlet />
          </div>

          <Footer />
        </div>
      </div>
    </>
  );
};

export default MainLayout;
