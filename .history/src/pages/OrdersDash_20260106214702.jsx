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

export default function OrdersDash() {
  const [stats, setStats] = useState({
    pending: 0,
    confirmed: 0,
    delivered: 0,
    total: 0,
    deliveryRate: 0,
  });

  const [dailyOrders, setDailyOrders] = useState([]);
  const [weeklyTrend, setWeeklyTrend] = useState([]);
  const [ordersByStatus, setOrdersByStatus] = useState([]);

  useEffect(() => {
    const pending = 12;
    const confirmed = 34;
    const delivered = 108;
    const total = pending + confirmed + delivered;

    setStats({
      pending,
      confirmed,
      delivered,
      total,
      deliveryRate: Math.round((delivered / total) * 100),
    });

    setDailyOrders([
      { day: "Lun", orders: 12 },
      { day: "Mar", orders: 19 },
      { day: "Mer", orders: 8 },
      { day: "Jeu", orders: 23 },
      { day: "Ven", orders: 16 },
      { day: "Sam", orders: 5 },
      { day: "Dim", orders: 3 },
    ]);

    setWeeklyTrend([
      { week: "S1", orders: 45 },
      { week: "S2", orders: 52 },
      { week: "S3", orders: 38 },
      { week: "S4", orders: 61 },
    ]);

    setOrdersByStatus([
      { status: "En attente", value: pending },
      { status: "Confirmées", value: confirmed },
      { status: "Livrées", value: delivered },
    ]);
  }, []);

  return (
    <div className="p-6 font-poppins">
      <h1 className="text-2xl font-semibold mb-6">Commandes</h1>

      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard title="Total commandes" value={stats.total} />
        <StatCard title="En attente" value={stats.pending} />
        <StatCard title="Livrées" value={stats.delivered} />
        <StatCard
          title="Taux de livraison"
          value={`${stats.deliveryRate}%`}
        />
      </div>

      {/* Charts row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Orders per day */}
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
              <Bar dataKey="orders" fill="#1e40af" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Weekly trend */}
        <div className="bg-white p-6 rounded-xl shadow-md border">
          <h2 className="text-lg font-semibold mb-4">
            Évolution hebdomadaire
          </h2>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={weeklyTrend}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="week" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="orders"
                stroke="#0e7490"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Orders by status */}
      <div className="bg-white p-6 rounded-xl shadow-md border">
        <h2 className="text-lg font-semibold mb-4">
          Répartition des commandes
        </h2>
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={ordersByStatus}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="status" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#065f46" radius={[6, 6, 0, 0]} />
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
