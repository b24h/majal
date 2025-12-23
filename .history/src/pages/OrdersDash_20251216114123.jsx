import React, { useEffect, useState } from "react";
import {LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, BarChart, Bar} from "recharts";

export default function OrdersDash() {
  const [ordersStats, setOrdersStats] = useState({
    pending: 0,
    confirmed: 0,
    delivered: 0,
    revenue: 0,
  });

  const [dailyOrders, setDailyOrders] = useState([]);

  useEffect(() => {
    setOrdersStats({
      pending: 12,
      confirmed: 34,
      delivered: 108,
      revenue: 45890,
    });

    setDailyOrders([
      { day: "Lun", count: 12 },
      { day: "Mar", count: 19 },
      { day: "Mer", count: 8 },
      { day: "Jeu", count: 23 },
      { day: "Ven", count: 16 },
      { day: "Sam", count: 5 },
      { day: "Dim", count: 3 },
    ]);
  }, []);

  return (
    <div className="p-6 font-poppins">
      <h1 className="text-2xl font-semibold mb-6">Commandes</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard title="En attente" value={ordersStats.pending} color="bg-yellow-500" />
        <StatCard title="Confirmées" value={ordersStats.confirmed} color="bg-blue-600" />
        <StatCard title="Livrées" value={ordersStats.delivered} color="bg-green-600" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">

        <div className="bg-white p-6 rounded-xl shadow-md border">
          <h2 className="text-lg font-semibold mb-4">Commandes par jour</h2>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={dailyOrders}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#1e3a8a" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, color }) {
  return (
    <div className="bg-white shadow-md border p-5 rounded-xl flex flex-col">
      <span className="text-sm text-gray-500">{title}</span>
      <span className="text-2xl font-bold mt-2">{value}</span>
      <div className={`h-1.5 w-full rounded mt-3 ${color}`}></div>
    </div>
  );
}
