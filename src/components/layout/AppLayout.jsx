import Navbar from "./Navbar";
import Footer from "./Footer";
import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";

const AppLayout = () => {
  const { pathname } = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);

  const isDetailPage =
    pathname.startsWith("/movies/") || pathname.startsWith("/series/");

  return (
    <div className="min-h-screen flex flex-col bg-[#0a0a0a] text-white">
      <Navbar />

      <main
        className={`mx-auto animate-fadeIn flex-grow transition-all duration-500 ${
          isDetailPage
            ? "w-full"
            : "w-[90%] max-w-[1400px] pt-6 pb-12"
        }`}
      >
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default AppLayout;
