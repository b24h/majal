import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login";
import Dashboard from "../pages/DashboardLayout";
import Cooperatives from "../pages/Cooperatives";
import Categories from "../pages/Categories";
import Products from "../pages/Products";
import Discounts from "../pages/Discounts";
import Coupons from "../pages/Coupons";
import Packs from "../pages/Packs";
import Orders from "../pages/Orders";
import Settings from "../pages/Settings";
import DashboardLayout from "./pages/DashboardLayout";

export default function AppRouter() {
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />

        {isAuthenticated ? (
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/cooperatives" element={<Cooperatives />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/products" element={<Products />} />
            <Route path="/discounts" element={<Discounts />} />
            <Route path="/coupons" element={<Coupons />} />
            <Route path="/packs" element={<Packs />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/settings" element={<Settings />} />
          </Route>
        ) : (
          <Route path="*" element={<Navigate to="/login" />} />
        )}

        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}
