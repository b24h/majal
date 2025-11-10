import React, {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {LayoutDashboard, Store, Package, Tag, Percent, ShoppingBag, Settings, LogOut, Layers, Users, Gift} from "lucide-react";

export default function Sidebar(){
    const navigate = useNavigate();
    const [collapsed, setCollapsed] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem("isAuthenticated");
        navigate("/login");
    };

    return(
        <div className={`${ collapsed ? "w-20" : "w-64"} bg-indigo-700 text-white h-screen flex flex-col transition-all duration-300 fixed`}>
            <div className="flex items-center justify-between px-4 py-4 border-b border-indigo-500">
                <h1 className={`font-bold text-x1 ${collapsed ? "hidden" : "block"}`}>
                    E-Admin
                </h1>
                <button onClick={() => setCollapsed(!collapsed)} className="text-indigo-200 hover:text-white">
                    {collapsed ? "⫸" : "⫸"}
                </button>
            </div>
            <nav className="flex-1 px-3 py-6 space-y-3 overflow-y-auto">
                <SidebarLink to="/dashboard" icon={<LayoutDashboard size={20}/>} label="Tableau de bord" collapsed={collapsed}/>
                <SidebarLink to="/cooperatives" icon={<Users size={20}/>} label="Coopératives" collapsed={collapsed}/>
                <SidebarLink to="/categories" icon={<Layers size={20}/>} label="Catégories" collapsed={collapsed}/>

                <SidebarLink to="/products" icon={<Package size={20}/>} label="Produits" collapsed={collapsed}/>
                <div className={`${collapsed ? "hidden" : "ml-8 space-y-2"}`}>
                    <SidebarLink to="" icon={} label="" collapsed={collapsed}/>
                    <SidebarLink to="" icon={} label="" collapsed={collapsed}/>
                    <SidebarLink to="" icon={} label="" collapsed={collapsed}/>
                </div>
            </nav>
        </div>
    )
}