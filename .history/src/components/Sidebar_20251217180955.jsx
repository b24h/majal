import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  Store,
  Tag,
  Percent,
  ShoppingBag,
  LogOut,
  Layers,
  Users,
  Gift,
  Bell,
  ChevronDown,
  TrendingUp,
  ClipboardList,
  DollarSign,
} from "lucide-react";

export default function Sidebar({ collapsed, setCollapsed }) {
  const navigate = useNavigate();

  const [dashboardOpen, setDashboardOpen] = useState(true);
  const [productsOpen, setProductsOpen] = useState(true);

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    navigate("/login");
  };

  return (
    <div
      className={`fixed left-0 top-0 h-screen bg-cyan-900 text-white flex flex-col transition-all duration-300 ${
        collapsed ? "w-20" : "w-64"
      }`}
    >
      <style>{`
                .sidebar-scroll::-webkit-scrollbar {
                    width: 8px;
                }

                .sidebar-scroll::-webkit-scrollbar-track {
                    background: transparent;
                }

                .sidebar-scroll::-webkit-scrollbar-thumb {
                    background: rgba(255, 255, 255, 0.25);
                    border-radius: 10px;
                }

                .sidebar-scroll::-webkit-scrollbar-thumb:hover {
                    background: rgba(255, 255, 255, 0.4);
                }
            `}</style>

      <div className="flex items-center justify-between px-4 py-4 border-b border-gray-300">
        <h1
          className={`font-semibold text-lg tracking-wide ${
            collapsed ? "hidden" : "block"
          }`}
        >
          Espace Admin
        </h1>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="text-white hover:text-cyan-500"
        >
          {collapsed ? "⫸" : "⫷"}
        </button>
      </div>

      <nav className="sidebar-scroll flex-1 px-3 py-6 space-y-3 overflow-y-auto">
        <SidebarGroup
          icon={<LayoutDashboard size={20} />}
          label="Tableau de bord"
          collapsed={collapsed}
          open={dashboardOpen}
          toggle={() => setDashboardOpen(!dashboardOpen)}
        >
          <SidebarLink
            to="/dashboard/ventes"
            icon={<TrendingUp size={18} />}
            label="Ventes"
            collapsed={collapsed}
          />
          <SidebarLink
            to="/dashboard/commandes"
            icon={<ClipboardList size={18} />}
            label="Commandes"
            collapsed={collapsed}
          />
          <SidebarLink
            to="/dashboard/revenues"
            icon={<DollarSign size={18} />}
            label="Revenues"
            collapsed={collapsed}
          />
        </SidebarGroup>

        <SidebarLink
          to="/cooperatives"
          icon={<Users size={20} />}
          label="Coopératives"
          collapsed={collapsed}
        />
        <SidebarLink
          to="/categories"
          icon={<Layers size={20} />}
          label="Catégories"
          collapsed={collapsed}
        />

        <SidebarGroup
          icon={<Package size={20} />}
          label="Produits"
          collapsed={collapsed}
          open={productsOpen}
          toggle={() => setProductsOpen(!productsOpen)}
        >
          <SidebarLink
            to="/products"
            icon={<Store size={18} />}
            label="Liste des produits"
            collapsed={collapsed}
          />
          <SidebarLink
            to="/discounts"
            icon={<Percent size={18} />}
            label="Réductions"
            collapsed={collapsed}
          />
          <SidebarLink
            to="/coupons"
            icon={<Gift size={18} />}
            label="Coupons"
            collapsed={collapsed}
          />
          <SidebarLink
            to="/packs"
            icon={<Tag size={18} />}
            label="Packs"
            collapsed={collapsed}
          />
        </SidebarGroup>

        <SidebarLink
          to="/orders"
          icon={<ShoppingBag size={20} />}
          label="Commandes"
          collapsed={collapsed}
        />
      </nav>

      <div className="px-3 mb-2">
        <SidebarLink
          to="/notifications"
          icon={<Bell size={20} />}
          label="Notifications"
          collapsed={collapsed}
          className="mb-2"
        />
      </div>

      <button
        onClick={handleLogout}
        className="flex items-center justify-center gap-2 py-3 text-amber-500 hover:bg-amber-500/90 hover:text-red-100 transition"
      >
        <LogOut size={18} /> {!collapsed && <span>Se déconnecter</span>}
      </button>
    </div>
  );
}

function SidebarGroup({ icon, label, collapsed, open, toggle, children }) {
  return (
    <div>
      <button
        onClick={toggle}
        className="flex items-center justify-between w-full py-2 px-2 rounded-lg hover:bg-cyan-600 transition"
      >
        <div className="flex items-center gap-3">
          {icon}
          {!collapsed && <span className="font-medium">{label}</span>}
        </div>
        {!collapsed && (
          <ChevronDown
            size={16}
            className={`transition-transform ${open ? "rotate-180" : ""}`}
          />
        )}
      </button>
      {open && !collapsed && (
        <div className="ml-8 mt-2 space-y-2">{children}</div>
      )}
    </div>
  );
}

function SidebarLink({ to, icon, label, collapsed }) {
  return (
    <Link
      to={to}
      className="flex items-center gap-3 py-2 rounded-lg hover:bg-cyan-600 transition"
    >
      {icon && icon}
      {!collapsed && <span className="font-medium">{label}</span>}
    </Link>
  );
}
