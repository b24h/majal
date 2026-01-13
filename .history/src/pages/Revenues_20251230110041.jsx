import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

export default function Revenues() {
  const [stats, setStats] = useState({
    pending: 0,
    confirmed: 0,
    delivered: 0,
    revenue: 0,
    totalOrders: 0,
    avgOrder: 0,
  });

  const [monthlyRevenue, setMonthlyRevenue] = useState([]);
  const [dailyOrders, setDailyOrders] = useState([]);
  const [orderStatus, setOrderStatus] = useState([]);

  useEffect(() => {
    setStats({
      pending: 12,
      confirmed: 34,
      delivered: 108,
      revenue: 45890,
      totalOrders: 154,
      avgOrder: 298,
    });

    setMonthlyRevenue([
      { month: "Jan", revenue: 12000 },
      { month: "Fév", revenue: 14000 },
      { month: "Mar", revenue: 10000 },
      { month: "Avr", revenue: 18000 },
      { month: "Mai", revenue: 22000 },
      { month: "Jui", revenue: 26000 },
    ]);

    setDailyOrders([
      { day: "Lun", orders: 12 },
      { day: "Mar", orders: 19 },
      { day: "Mer", orders: 8 },
      { day: "Jeu", orders: 23 },
      { day: "Ven", orders: 16 },
      { day: "Sam", orders: 5 },
      { day: "Dim", orders: 3 },
    ]);

    setOrderStatus([
      { name: "En attente", value: 12 },
      { name: "Confirmées", value: 34 },
      { name: "Livrées", value: 108 },
    ]);
  }, []);

  return (
    <div className="p-6 font-poppins">
      <h1 className="text-2xl font-semibold mb-6">Revenus & Commandes</h1>

      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard title="Chiffre d'affaires" value={`${stats.revenue} MAD`} />
        <StatCard title="Total commandes" value={stats.totalOrders} />
        <StatCard title="Panier moyen" value={`${stats.avgOrder} MAD`} />
        <StatCard title="Commandes livrées" value={stats.delivered} />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Revenue monthly */}
        <div className="bg-white p-6 rounded-xl shadow-md border">
          <h2 className="text-lg font-semibold mb-4">
            Chiffre d'affaires mensuel
          </h2>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={monthlyRevenue}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#0e7490"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Daily orders */}
        <div className="bg-white p-6 rounded-xl shadow-md border">
          <h2 className="text-lg font-semibold mb-4">
            Commandes par jour
          </h2>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={dailyOrders}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="orders" fill="#0891b2" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Order status */}
      <div className="bg-white p-6 rounded-xl shadow-md border">
        <h2 className="text-lg font-semibold mb-4">
          Statut des commandes
        </h2>
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={orderStatus}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#155e75" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function StatCard({ title, value }) {
  return (
    <div className="bg-white shadow-md border p-5 rounded-xl flex flex-col">
      <span className="text-sm text-gray-500">{title}</span>
      <span className="text-2xl font-bold mt-2">{value}</span>
      <div className="h-1.5 w-full rounded mt-3 bg-cyan-700"></div>
    </div>
  );
}
