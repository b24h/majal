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
        <div className=""></div>
    )
}