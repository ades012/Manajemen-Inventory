import { useState } from "react";
import SidebarLaporanHarian from "../components/DashboardLaporahHarian/SidebarLaporanHarian";
import Navbar from "./Navbar";

export default function MainLayout2({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <SidebarLaporanHarian isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      {/* Main Content */}
      <div className="flex flex-col flex-1 overflow-hidden 
                      transition-all duration-300
                      lg:ml-64">
        {/* Navbar */}
        <Navbar toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

        {/* Konten Halaman */}
        <main className="flex-1 p-4 overflow-y-auto mt-16">
          {children}
        </main>
      </div>
    </div>
  );
}
