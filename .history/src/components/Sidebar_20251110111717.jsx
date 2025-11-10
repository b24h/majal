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
            {/* Logo */}
            <div className="flex items-center justify-between px-4 py-4 border-b border-indigo-500">
                <h1 className={`font-bold text-x1 ${collapsed ? "hidden" : "block"}`}>
                    E-Admin
                </h1>
                <button onClick={() => setCollapsed(!collapsed)} className="text-indigo-200"></button>
            </div>
        </div>
    )
}