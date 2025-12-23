import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import SearchBar from "../components/ui/SearchBar";
import FilterTabs from "../components/ui/FilterTabs";
import { CheckCircle, XCircle, Phone, User, MapPin } from "lucide-react";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("Tous");

  const [showModal, setShowModal] = useState(false);
  const [selectedAction, setSelectedAction] = useState(null);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [loading, setLoading] = useState(true);

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
    const axiosOrders = async () => {
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
    if (!selectedOrderId || !selectedAction) return;

    setOrders((prev) =>
      prev.map((order) =>
        order.id === selectedOrderId
          ? { ...order, status: selectedAction === "confirm" ? "Confirmée" : "Rejetée" }
          : order
      )
    );

    setShowModal(false);
    setSelectedAction(null);
    setSelectedOrderId(null);
  };

  const filteredOrders = useMemo(() => {
    return orders.filter((o) => {
      const matchesSearch =
        o.name.toLowerCase().includes(search.toLowerCase()) ||
        o.phone.includes(search);

      const matchesFilter = statusFilter === "Tous" ? true : o.status === statusFilter;

      return matchesSearch && matchesFilter;
    });
  }, [orders, search, statusFilter]);

  return (
    <div className="p-6 pb-28 font-poppins">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Gérer les commandes</h1>
        <SearchBar
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Rechercher un produit..."
        />
      </div>

      {/* Filter Tabs */}
      <FilterTabs
        tabs={["Tous", "En attente", "Confirmée", "Rejetée", "Livrée"]}
        active={statusFilter}
        onChange={setStatusFilter}
      />

      {/* Orders List */}
      <div className="mt-6 space-y-4">
        {loading ? (
          <p className="text-center text-gray-500 mt-10">Chargement des commandes...</p>
        ) : filteredOrders.length === 0 ? (
          <p className="text-center text-gray-500 mt-10">Aucune commande trouvée.</p>
        ) : (
          filteredOrders.map((order) => (
            <div
              key={order.id}
              className="p-4 bg-white rounded-xl shadow-sm border flex justify-between items-center"
            >
              <div>
                <p className="font-semibold text-lg flex items-center gap-2">
                  <User size={18} className="text-gray-600" /> {order.name}
                </p>
                <p className="text-sm text-gray-600 flex items-center gap-2 mt-1">
                  <MapPin size={16} /> {order.address}
                </p>
                <p className="text-sm text-gray-600 flex items-center gap-2 mt-1">
                  <Phone size={16} /> {order.phone}
                </p>
                <p className="mt-1 text-xs font-medium">
                  Statut:{" "}
                  <span className={`${statusColors[order.status]} font-semibold`}>
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

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl shadow-lg w-full max-w-sm p-6 text-center">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              {actionLabels[selectedAction]} la commande ?
            </h3>
            <p className="text-gray-500 mb-6">
              Êtes-vous sûr de vouloir{" "}
              <span className="font-medium text-gray-800">{actionLabels[selectedAction].toLowerCase()}</span>{" "}
              cette commande ?
            </p>

            <div className="flex justify-center gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
              >
                Annuler
              </button>
              <button
                onClick={handleConfirmAction}
                className={`px-4 py-2 rounded-lg text-white ${actionColors[selectedAction]}`}
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
