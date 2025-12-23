import React, { useEffect, useState } from "react";
import {LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, BarChart, Bar} from "recharts";

export default function Revenues() {
  const [ordersStats, setOrdersStats] = useState({
    pending: 0,
    confirmed: 0,
    delivered: 0,
    revenue: 0,
  });

  const [monthlySales, setMonthlySales] = useState([]);
  const [dailyOrders, setDailyOrders] = useState([]);

  useEffect(() => {
    setOrdersStats({
      pending: 12,
      confirmed: 34,
      delivered: 108,
      revenue: 45890,
    });

    setMonthlySales([
      { month: "Jan", sales: 12000 },
      { month: "Fév", sales: 14000 },
      { month: "Mar", sales: 10000 },
      { month: "Avr", sales: 18000 },
      { month: "Mai", sales: 22000 },
      { month: "Jui", sales: 26000 },
    ]);

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
      <h1 className="text-2xl font-semibold mb-6">Revenues</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard title="Chiffre d'affaires" value={ordersStats.revenue + " MAD"} color="bg-cyan-700" />
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
