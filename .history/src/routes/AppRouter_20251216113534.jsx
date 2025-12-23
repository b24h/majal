import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Sales from "../pages/Sales";
import CommandesDash from "../pages/Dashboard";
import Revenues from "../pages/Dashboard";
import Cooperatives from "../pages/Cooperatives";
import Categories from "../pages/Categories";
import Products from "../pages/Products";
import Discounts from "../pages/Discounts";
import Coupons from "../pages/Coupons";
import Packs from "../pages/Packs";
import Orders from "../pages/Orders";
import Layout from "../pages/Layout";
import Notifications from "../pages/Dashboard";


export default function AppRouter() {
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />

        {isAuthenticated ? (
          <Route element={<Layout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/ventes" element={<Sales />} />
            <Route path="/dashboard/commandes" element={<CommandesDash />} />
            <Route path="/dashboard/revenues" element={<Revenues />} />
            <Route path="/cooperatives" element={<Cooperatives />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/products" element={<Products />} />
            <Route path="/discounts" element={<Discounts />} />
            <Route path="/coupons" element={<Coupons />} />
            <Route path="/packs" element={<Packs />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/notifications" element={<Notifications />} />
          </Route>
        ) : (
          <Route path="*" element={<Navigate to="/login" />} />
        )}

        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}
