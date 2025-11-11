import React from "react";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="flex">

      <Sidebar />

      <div className="flex">

      
      <main className="flex-1 ml-64 bg-gray-100 min-h-screen p-6 transition-all duration-300">
        <Outlet />
      </main>

      <Footer/></div>
    </div>
  );
}
