import Navbar from "./Navbar";
import Footer from "./Footer";
import { Outlet, useLocation } from "react-router-dom";

const AppLayout = () => {
  const { pathname } = useLocation();

  // هل نحن في صفحة تفاصيل الفيلم؟
  // إذا كانت الإجابة نعم، سنلغي الـ Padding والـ Width المقيّد لنسمح للخلفية بالانتشار
  const isMoviePage = pathname.startsWith("/movie/");

  return (
    <div className="min-h-screen flex flex-col bg-[#0a0a0a] text-white">
      <Navbar />

      <main
        className={`mx-auto animate-fadeIn flex-grow transition-all duration-500 ${
          isMoviePage
            ? "w-full" // في صفحة الفيلم خذ العرض الكامل
            : "w-[90%] max-w-[1400px] pt-6 pb-12" // في باقي الصفحات التزم بالتنسيق القديم
        }`}
      >
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default AppLayout;
