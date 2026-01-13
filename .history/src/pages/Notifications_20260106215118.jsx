import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

export default function Notifications() {
  const [alerts, setAlerts] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    critical: 0,
    stockOut: 0,
    unread: 0,
  });

  const [alertsByType, setAlertsByType] = useState([]);

  useEffect(() => {
    const alertsData = [
      { id: 1, name: "Huile d'argan 250ml", type: "Stock bas" },
      { id: 2, name: "Savon noir 200g", type: "Rupture" },
      { id: 3, name: "Crème visage bio", type: "Expiré" },
      { id: 4, name: "Miel naturel 500g", type: "Stock bas" },
    ];

    const notificationsData = [
      { id: 1, msg: "Nouvelle commande #5847", read: false },
      { id: 2, msg: "Commande #5843 confirmée", read: true },
      { id: 3, msg: "Nouvel avis client sur un produit", read: false },
      { id: 4, msg: "Produit ajouté avec succès", read: true },
    ];

    setAlerts(alertsData);
    setNotifications(notificationsData);

    setStats({
      total: alertsData.length + notificationsData.length,
      critical: alertsData.length,
      stockOut: alertsData.filter(a => a.type === "Rupture").length,
      unread: notificationsData.filter(n => !n.read).length,
    });

    setAlertsByType([
      { type: "Stock bas", count: alertsData.filter(a => a.type === "Stock bas").length },
      { type: "Rupture", count: alertsData.filter(a => a.type === "Rupture").length },
      { type: "Expiré", count: alertsData.filter(a => a.type === "Expiré").length },
    ]);
  }, []);

  const alertColor = (type) => {
    switch (type) {
      case "Rupture":
        return "bg-red-100 text-red-700";
      case "Stock bas":
        return "bg-yellow-100 text-yellow-700";
      case "Expiré":
        return "bg-purple-100 text-purple-700";
      default:
        return "bg-gray-100";
    }
  };

  return (
    <div className="p-6 font-poppins">
      <h1 className="text-2xl font-semibold mb-6">Notifications</h1>

      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard title="Total" value={stats.total} />
        <StatCard title="Alertes critiques" value={stats.critical} />
        <StatCard title="Produits en rupture" value={stats.stockOut} />
        <StatCard title="Non lues" value={stats.unread} />
      </div>

      {/* Alerts + Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Product alerts */}
        <div className="bg-white p-6 rounded-xl shadow-md border">
          <h2 className="text-lg font-semibold mb-4">🚨 Alertes Produits</h2>
          <ul className="space-y-3">
            {alerts.map((a) => (
              <li
                key={a.id}
                className={`p-3 rounded-lg border flex justify-between ${alertColor(a.type)}`}
              >
                <span className="font-medium">{a.name}</span>
                <span className="font-semibold">{a.type}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Admin notifications */}
        <div className="bg-white p-6 rounded-xl shadow-md border">
          <h2 className="text-lg font-semibold mb-4">🔔 Activité récente</h2>
          <ul className="space-y-3">
            {notifications.map((n) => (
              <li
                key={n.id}
                className={`p-3 border rounded-lg ${
                  n.read ? "bg-gray-50" : "bg-blue-50"
                }`}
              >
                {n.msg}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Alerts stats */}
      <div className="bg-white p-6 rounded-xl shadow-md border">
        <h2 className="text-lg font-semibold mb-4">
          Statistiques des alertes
        </h2>
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={alertsByType}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="type" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#0e7490" radius={[6, 6, 0, 0]} />
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
