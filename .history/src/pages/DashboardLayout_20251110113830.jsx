import React from "react";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";

export default function Dashboard() {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 ml-64 bg-gray-100 min-h-screen p-6 transition-all duration-300">
        <Outlet />
      </main>
    </div>
  );
}
