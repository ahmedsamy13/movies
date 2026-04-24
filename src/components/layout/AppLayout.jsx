import Navbar from "./Navbar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    // min-h-screen تضمن أن الصفحة تأخذ كامل طول الشاشة
    <div className="min-h-screen flex flex-col bg-[#0a0a0a] text-white">
      <Navbar />

      {/* - تمت إزالة flex-1 إذا كنت لا تريد تمطيط المحتوى الصغير ليشغل الصفحة
         - تقليل الـ py-8 إلى pt-6 (padding top) لتقريب المحتوى من الناف بار
      */}
      <main className="w-[90%] max-w-[1400px] mx-auto pt-6 pb-12 animate-fadeIn flex-grow">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default AppLayout;
