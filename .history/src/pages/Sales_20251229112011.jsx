import React, { useEffect, useState } from "react";
import {LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell} from "recharts";

const COLORS = ["#0e7490", "#0284c7", "#38bdf8", "#22c55e", "#f97316"]

export default function Sales() {
  const [monthlySales, setMonthlySales] = useState([]);
  const [categorySales, setCategorySales] = useState([]);
  const [stats, setStats] = useState({});

  useEffect(() => {
    setMonthlySales([
      { month: "Jan", sales: 12000 },
      { month: "Fév", sales: 14000 },
      { month: "Mar", sales: 10000 },
      { month: "Avr", sales: 18000 },
      { month: "Mai", sales: 22000 },
      { month: "Jui", sales: 26000 },
    ]);

    setCategorySales([
      {name: "Alimentaire", value: 32000},
      {name: "Artisanat", value: 18000},
      {name: "Cosmétique", value: 12000},
      {name: "Textile", value: 8000},
    ]);

    setStats({
      totalRevenue: 102000,
      currentMonth: 26000,
      growth: 18,
      orders: 412
    })
  }, []);

  return (
    <div className="p-6 font-poppins space-y-8">
      <h1 className="text-2xl font-semibold">Ventes & Statistiques</h1>

      <div className="grid grid-cols-1 sm: grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Chiffre d'affaires" value={`${stats.totalRevenue} MAD`}/>
        <StatCard title="Ventes ce mois" value={`${stats.currentMonth} MAD`}/>
        <StatCard title="Croissance" value={`+${stats.growth}%`} positive/>
        <StatCard title="Commandes" value={stats.orders}/>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-md border">
          <h2 className="text-lg font-semibold mb-4">Evolution mensuelle</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlySales}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="sales" stroke="#0e7490" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-md border">
        <h2 className="text-lg font-semibold mb-4">Ventes par catégorie</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={categorySales}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#0e7490" radius={[8, 8, 0, 0]}></Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white p-6 rounded-xl shadow border max-w-2xl">
        <h2 className="text-lg font-semibold mb-4">Répartition des ventes</h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie data={categorySales} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
              {categorySales.map((_, index) =>(
                <Cell 
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
