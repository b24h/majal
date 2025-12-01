import React, {useState} from "react";
import {Search, CheckCircle, XCircle, Phone, User, MapPin, Filter} from "lucide-react";

export default function Orders() {
  const [orders, setOrders] = useState([
    {
      id: 1,
      name: "client1",
      address: "rabat",
      phone: "0123456789",
      status: "En attente"
    },
    {
      id: 2,
      name: "client2",
      address: "berkane",
      phone: "0987654321",
      status: "Confirmée"
    },
    {
      id: 3,
      name: "client3",
      address: "casablanca",
      phone: "0192837465",
      status: "Rejetée"
    },
    {
      id: 4,
      name: "client4",
      address: "marrakesh",
      phone: "0564738291",
      status: "Livrée"
    },
    {
      id: 5,
      name: "client5",
      address: "fes",
      phone: "0564738291",
      status: "En attente"
    },
    {
      id: 6,
      name: "client6",
      address: "laayoune",
      phone: "0564738291",
      status: "En attente"
    },
    {
      id: 7,
      name: "client7",
      address: "tanger",
      phone: "0564738291",
      status: "En attente"
    },
  ])

  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] = useState("Tout");

  const handleConfirm = (id) => {
    setOrders((prevOrders) => 
      prevOrders.map((order) =>
        order.id === id ? {...order, status: "Confirmée"} : order
      )
    );
  };

  const handleReject = (id) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === id ? {...order, status: "Rejetée"} : order
      )
    );
  };

  const filteredOrders = orders.filter((o) => {
    const matchesSearch = 
      o.name.toLowerCase().includes(search. toLowerCase()) || o.phone.includes(search);

    const matchesFilter = 
      statusFilter === "Tout" ? true : o.status === statusFilter;

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="p-6 pb-28 font-poppins">
      <div className="flex items-center gap-3 mb-4">
        <Search className="text-gray-500"/>
        <input
          type="text"
          placeholder="Rechercher une commande..."
          className="w-full p-2 rounded-lg border border-gray-300" 
          value={search} 
          onChange={(e) => setSearch(e.target.value)} />
      </div>
      <div className="flex items-center gap-3 mb-6">
        <Filter size={20} className="text-gray-600"/>
        <button onClick={() => setStatusFilter("Tout")} className={`px-3 py-1 rounded-lg border ${statusFilter === "Tout" ? "bg-[#2ba4b9] text-white" : "text-gray-700"}`}>
            Tous
        </button>
        <button onClick={() => setStatusFilter("En attente")} className={`px-3 py-1 rounded-lg border ${statusFilter === "En attente" ? "bg-[#2ba4b9] text-white" : "text-gray-700"}`} >
          En attente
        </button>
        <button onClick={() => setStatusFilter("Confirmée")} className={`px-3 py-1 rounded-lg border ${statusFilter === "Confirmée" ? "bg-[#2ba4b9] text-white" : "text-gray-700"}`} >
          Confirmé
        </button>
        <button onClick={() => setStatusFilter("Rejetée")} className={`px-3 py-1 rounded-lg border ${statusFilter === "Rejetée" ? "bg-[#2ba4b9] text-white" : "text-gray-700"}`} >
          Rejetée
        </button>
        <button onClick={() => setStatusFilter("Livrée")} className={`px-3 py-1 rounded-lg border ${statusFilter === "Livrée" ? "bg-[#2ba4b9] text-white" : "text-gray-700"}`} >
          Livré
        </button>
      </div>
      <h1 className="text-2xl font-semibold mb-4">Commandes Clients</h1>
      <div className="space-y-4">
        {filteredOrders.map((order) => (
          <div key={order.id} className="p-4 bg-white rounded-xl shadow-sm border flex justify-between items-center">
            <div>
              <p className="font-semibold text-lg flex items-center gap-2">
                <User size={18} className="text-gray-600"/>
                {order.name}
              </p>
              <p className="text-sm text-gray-600 flex items-center gap-2 mt-1">
                <MapPin size={16}/>
                {order.address}
              </p>
              <p className="text-sm text-gray-600 flex items-center gap-2 mt-1">
                <Phone size={16}/>
                {order.phone}
              </p>
              <p className="mt-1 text-xs font-medium">
                Statut :{" "}
                <span
                  className={`${
                    order.status === "En attente"
                      ? "text-yellow-600"
                      : order.status === "Confirmée"
                      ? "text-blue-600"
                      : order.status === "Rejetée"
                      ? "text-red-600"
                      : "text-green-600"
                  } font-semibold`}>
                    {order.status === "En attente"
                      ? "En attente"
                      : order.status === "Confirmée"
                      ? "Confirmée"
                      : order.status === "Rejetée"
                      ? "Rejetée"
                      : "Livrée"}
                  </span>
              </p>
            </div>
            {order.status === "En attente" && (
              <div className="flex gap-3">
                <button onClick={() => handleConfirm(order.id)} className="text-green-600 hover:text-green-800">
                  <CheckCircle size={26}/>
                </button>
                <button onClick={() => handleReject(order.id)} className="text-red-500 hover:text-red-700">
                  <XCircle size={26}/>
                </button>
              </div>
            )}
          </div>
        ))}
        {filteredOrders.length === 0 && (
          <p className="text-center text-gray-500 mt-10">
            Aucune commande trouvée.
          </p>
        )}
      </div>
    </div>
  );
}
