import Navbar from "./Navbar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <div className="grid h-screen grid-rows-[auto_1fr_auto]">
      <Navbar />
      <div className="overflow-scroll">
        <main className="mx-auto max-w-3xl">
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default AppLayout;
