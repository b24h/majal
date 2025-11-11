import React from "react";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="flex">

      <Sidebar />

      <div className="flex flex-col flex-1">
        <main className="flex-1 bg-gray-100 p-6 m1-0">
          <Outlet />
        </main>

        <Footer/>
      </div>
    </div>
  );
}
