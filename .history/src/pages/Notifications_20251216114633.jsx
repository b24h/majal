import React, { useEffect, useState } from "react";
import {LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, BarChart, Bar} from "recharts";

export default function Notifications() {
  const [alerts, setAlerts] = useState([]);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    setAlerts([
      { id: 1, name: "Huile d'argan 250ml", type: "Stock bas" },
      { id: 2, name: "Savon noir 200g", type: "Rupture" },
      { id: 3, name: "Crème visage bio", type: "Expiré" },
    ]);

    setNotifications([
      { id: 1, msg: "Nouvelle commande #5847" },
      { id: 2, msg: "Commande #5843 confirmée" },
      { id: 3, msg: "Nouvel avis client sur un produit" },
    ]);
  }, []);

  return (
    <div className="p-6 font-poppins">
      <h1 className="text-2xl font-semibold mb-6">Notifications</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        <div className="bg-white p-6 rounded-xl shadow-md border">
          <h2 className="text-lg font-semibold mb-4">Alertes Produits</h2>
          <ul className="space-y-3">
            {alerts.map((a) => (
              <li key={a.id} className="p-3 border rounded-lg bg-red-50 flex justify-between">
                <span className="font-medium">{a.name}</span>
                <span className="text-red-600 font-semibold">{a.type}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md border">
          <h2 className="text-lg font-semibold mb-4">Notifications Administrateur</h2>
          <ul className="space-y-3">
            {notifications.map((n) => (
              <li key={n.id} className="p-3 border rounded-lg bg-blue-50">
                {n.msg}
              </li>
            ))}
          </ul>
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
