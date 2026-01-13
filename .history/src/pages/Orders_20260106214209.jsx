import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import SearchBar from "../components/ui/SearchBar";
import FilterTabs from "../components/ui/FilterTabs";
import {
  CheckCircle,
  XCircle,
  Phone,
  User,
  MapPin,
} from "lucide-react";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("Tous");
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [selectedAction, setSelectedAction] = useState(null);
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  const statusColors = {
    "En attente": "text-yellow-500",
    Confirmée: "text-cyan-800",
    Rejetée: "text-orange-500",
    Livrée: "text-green-600",
  };

  const actionLabels = { confirm: "Confirmer", reject: "Rejeter" };
  const actionColors = {
    confirm: "bg-cyan-700 hover:bg-cyan-900",
    reject: "bg-amber-500 hover:bg-amber-700",
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const res = await axios.get("/data/orders.json");
        setOrders(res.data);
      } catch (err) {
        console.error("Erreur axios orders:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const openModal = (action, id) => {
    setSelectedAction(action);
    setSelectedOrderId(id);
    setShowModal(true);
  };

  const handleConfirmAction = () => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === selectedOrderId
          ? {
              ...order,
              status:
                selectedAction === "confirm" ? "Confirmée" : "Rejetée",
            }
          : order
      )
    );
    setShowModal(false);
  };

  const filteredOrders = useMemo(() => {
    return orders.filter((o) => {
      const matchesSearch =
        o.name.toLowerCase().includes(search.toLowerCase()) ||
        o.phone.includes(search);

      const matchesFilter =
        statusFilter === "Tous" ? true : o.status === statusFilter;

      return matchesSearch && matchesFilter;
    });
  }, [orders, search, statusFilter]);

  const stats = useMemo(() => {
    const total = orders.length;
    const pending = orders.filter((o) => o.status === "En attente").length;
    const confirmed = orders.filter((o) => o.status === "Confirmée").length;
    const delivered = orders.filter((o) => o.status === "Livrée").length;

    return { total, pending, confirmed, delivered };
  }, [orders]);

  const statusChartData = [
    { name: "En attente", value: stats.pending },
    { name: "Confirmées", value: stats.confirmed },
    { name: "Livrées", value: stats.delivered },
  ];

  const dailyOrdersData = [
    { day: "Lun", orders: 12 },
    { day: "Mar", orders: 18 },
    { day: "Mer", orders: 9 },
    { day: "Jeu", orders: 22 },
    { day: "Ven", orders: 16 },
    { day: "Sam", orders: 6 },
    { day: "Dim", orders: 3 },
  ];

  return (
    <div className="p-6 pb-28 font-poppins">
      <h1 className="text-2xl font-semibold mb-6">Gestion des commandes</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard title="Total commandes" value={stats.total} />
        <StatCard title="En attente" value={stats.pending} />
        <StatCard title="Confirmées" value={stats.confirmed} />
        <StatCard title="Livrées" value={stats.delivered} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
        <div className="bg-white p-6 rounded-xl shadow-md border">
          <h2 className="text-lg font-semibold mb-4">
            Commandes par jour
          </h2>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={dailyOrdersData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="orders" fill="#0891b2" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md border">
          <h2 className="text-lg font-semibold mb-4">
            Répartition des statuts
          </h2>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={statusChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#155e75" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="flex justify-between items-center mb-4">
        <SearchBar
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Rechercher par nom ou téléphone..."
        />
      </div>

      <FilterTabs
        tabs={["Tous", "En attente", "Confirmée", "Rejetée", "Livrée"]}
        active={statusFilter}
        onChange={setStatusFilter}
      />

      <div className="mt-6 space-y-4">
        {loading ? (
          <p className="text-center text-gray-500 mt-10">
            Chargement des commandes...
          </p>
        ) : filteredOrders.length === 0 ? (
          <p className="text-center text-gray-500 mt-10">
            Aucune commande trouvée.
          </p>
        ) : (
          filteredOrders.map((order) => (
            <div
              key={order.id}
              className="p-4 bg-white rounded-xl shadow-sm border flex justify-between items-center"
            >
              <div>
                <p className="font-semibold text-lg flex items-center gap-2">
                  <User size={18} /> {order.name}
                </p>
                <p className="text-sm text-gray-600 flex items-center gap-2 mt-1">
                  <MapPin size={16} /> {order.address}
                </p>
                <p className="text-sm text-gray-600 flex items-center gap-2 mt-1">
                  <Phone size={16} /> {order.phone}
                </p>
                <p className="mt-1 text-xs font-medium">
                  Statut :
                  <span className={`ml-1 ${statusColors[order.status]}`}>
                    {order.status}
                  </span>
                </p>
              </div>

              {order.status === "En attente" && (
                <div className="flex gap-3">
                  <button
                    onClick={() => openModal("confirm", order.id)}
                    className="text-cyan-600 hover:text-cyan-800"
                  >
                    <CheckCircle size={26} />
                  </button>
                  <button
                    onClick={() => openModal("reject", order.id)}
                    className="text-orange-500 hover:text-red-700"
                  >
                    <XCircle size={26} />
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl shadow-lg w-full max-w-sm p-6 text-center">
            <h3 className="text-lg font-semibold mb-4">
              {actionLabels[selectedAction]} la commande ?
            </h3>
            <div className="flex justify-center gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-200 rounded-lg"
              >
                Annuler
              </button>
              <button
                onClick={handleConfirmAction}
                className={`px-4 py-2 text-white rounded-lg ${actionColors[selectedAction]}`}
              >
                {actionLabels[selectedAction]}
              </button>
            </div>
          </div>
        </div>
      )}
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
