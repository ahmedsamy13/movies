import Navbar from "./Navbar";
import Footer from "./Footer";
import { Outlet, useLocation } from "react-router-dom";

const AppLayout = () => {
  const { pathname } = useLocation();

  const isMoviePage = pathname.startsWith("/movie/");

  return (
    <div className="min-h-screen flex flex-col bg-[#0a0a0a] text-white">
      <Navbar />

      <main
        className={`flex-grow mx-auto w-full animate-fadeIn transition-all duration-500 ${
          isMoviePage
            ? "px-0"
            : "px-4 sm:px-6 lg:px-8 max-w-[1400px] py-6 sm:py-8 md:py-10"
        }`}
      >
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default AppLayout;
