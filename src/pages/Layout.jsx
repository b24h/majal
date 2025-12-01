import React,{useState} from "react";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";

export default function Layout() {
  const[collapsed, setCollapsed ]=useState(false);
  return (
    <div className="flex">

      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

      <div className={`flex flex-col flex-1 transition-all duration-300  min-h-screen ${
       collapsed ? "ml-20" : "ml-64"
        }`}
      >
        
      <main className="flex-1 overflow-y-auto bg-gray-100 p-6">
      <Outlet />
      </main>
      <Footer/>      
      </div>

    </div>
  );
}
