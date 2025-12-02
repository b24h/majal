import React, { useState } from "react";
import SearchBar from "../components/ui/SearchBar";
import AddButton from "../components/ui/AddButton";
import DeleteButton from "../components/ui/DeleteButton";
import EditButton from "../components/ui/EditButton";

export default function Cooperatives() {
  const [cooperatives, setCooperatives] = useState([
    {
      id: 1,
      name: "Coopérative Sidi Bouzid",
      address: "Adresse",
      date: "2024-05-12",
      productCount: 5,
    },
    {
      id: 2,
      name: "Open Sulaymaniyah",
      address: "Adresse",
      date: "2024-08-02",
      productCount: 8,
    },
    {
      id: 3,
      name: "Coopérative Agricole Zegzal",
      address: "Adresse",
      date: "2024-09-22",
      productCount: 3,
    },
  ]);

  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [coopToDelete, setCoopToDelete] = useState(null);
  const [editingCoop, setEditingCoop] = useState(null);
  const [coopData, setCoopData] = useState({
    name: "",
    address: "",
    date: "",
    productCount: "",
  });

  const handleSave = () => {
    if (!coopData.name || !coopData.address || !coopData.date) return;

    if (editingCoop) {
      setCooperatives((prev) =>
        prev.map((c) =>
          c.id === editingCoop.id
            ? {
                ...editingCoop,
                ...coopData,
                productCount: parseInt(coopData.productCount || 0),
              }
            : c
        )
      );
    } else {
      setCooperatives((prev) => [
        ...prev,
        {
          id: Date.now(),
          ...coopData,
          productCount: parseInt(coopData.productCount || 0),
        },
      ]);
    }

    setShowModal(false);
    setEditingCoop(null);
    setCoopData({ name: "", address: "", date: "", productCount: "" });
  };

  const handleDeleteRequest = (coop) => {
    setCoopToDelete(coop);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    setCooperatives((prev) => prev.filter((c) => c.id !== coopToDelete.id));
    setShowDeleteModal(false);
    setCoopToDelete(null);
  };

  const handleEdit = (coop) => {
    setEditingCoop(coop);
    setCoopData({
      name: coop.name,
      address: coop.address,
      date: coop.date,
      productCount: coop.productCount,
    });
    setShowModal(true);
  };

  return (
    <div className="p-6 relative">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold">Gérer les coopératives</h1>
        </div>

        <div className="flex items-center gap-3">
          <SearchBar
            onChange={setSearch}
            placeholder="Rechercher une coopérative"
          />
          <AddButton onClick={() => {
          setEditingCoop(null);
          setCoopData({ name: "", address: "", date: "", productCount: "" });
          setShowModal(true);
        }}>
            + Ajouter une coopérative
          </AddButton>
        </div>
      </div>
      {cooperatives.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cooperatives.map((coop) => (
            <div
              key={coop.id}
              className="bg-gray-100 shadow-sm rounded-2xl p-6 flex flex-col justify-between"
            >
              <div>
                <h2 className="text-lg font-semibold mb-2">{coop.name}</h2>
                <p className="text-sm text-gray-600">
                  Adresse : {coop.address}
                </p>
                <p className="text-sm text-gray-600">
                  Date d’inscription : {coop.date}
                </p>
                <p className="text-sm text-gray-600">
                  Nombre de produits : {coop.productCount}
                </p>
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <EditButton onClick={() => handleEdit(coop)} />
                <DeleteButton onClick={() => handleDeleteRequest(coop)} />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center border border-dashed border-cyan-900  rounded-2xl py-16 mt-10">
          <h2 className="text-xl font-medium text-gray-800 mb-2">
            Aucune coopérative trouvée
          </h2>
          <p className="text-gray-500 mb-6">
            Ajoutez vos coopératives pour commencer
          </p>
          <button
            onClick={() => setShowModal(true)}
            className="bg-cyan-800 text-white px-5 py-2 rounded-full hover:bg-cyan-700 transition"
          >
            + Ajouter une coopérative
          </button>
        </div>
      )}

{showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl shadow-lg w-full max-w-md max-h-[90vh] flex flex-col p-6 relative">
            <div className="bg-cyan-800 text-white py-3 px-4 rounded-t-2xl -mx-6 -mt-6 mb-4 text-lg font-semibold">
              {editingCoop?.id ? "Modifier la coopérative" : "Ajouter une coopérative"}
            </div>
              <div className="px-6 pb-6 overflow-y-auto">
              <div>
                <label className="text-sm font-medium text-gray-700">Nom</label>
                <input type="text" placeholder="Nom de la coopérative" value={coopData.name} onChange={(e) => setCoopData({ ...coopData, name: e.target.value })} className="mt-1 w-full border rounded-lg p-2"/>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Adresse</label>
                <input type="text" placeholder="Adresse de la coo" value={coopData.address} onChange={(e) => setCoopData({ ...coopData, address: e.target.value })} className="mt-1 w-full border rounded-lg p-2"/>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Date</label>
                <input type="text" value={coopData.date} onChange={(e) => setCoopData({ ...coopData, date: e.target.value })} className="mt-1 w-full border rounded-lg p-2"/>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Description</label>
                <textarea value={editingCoop?.description || ""} onChange={(e) => setEditingCoop((p) => ({ ...p, description: e.target.value }))} className="mt-1 w-full border rounded-lg p-2 mt-1" rows={3}/>
              </div>
              <label className="text-sm font-medium text-gray-700 mt-4">Taux de réduction (%)</label>
              <input type="number" min="0" max="90" value={editingPack.reduction} onChange={(e) => setEditingPack({...editingPack, reduction: Number(e.target.value)})} className="w-full border rounded-lg p-2 mt-1"/>
              <p className="mt-4 font-semibold text-lg">Prix final : {" "} <span className="text-cyan-800">{editingPack.price} MAD</span></p>
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => { setShowModal(false); setEditingCoop(null); }}
                className="px-4 py-2 rounded-full border border-gray-400 text-gray-600 hover:bg-gray-100">
                Annuler
              </button>
              <button
                onClick={handleSave}
                className="bg-cyan-800 text-white px-5 py-2 rounded-full hover:bg-cyan-700"
              >
                {editingCoop ? "Enregistrer" : "Ajouter"}
              </button>
            </div>
            </div>
          </div>
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-6 relative">
            <div className="flex flex-col gap-3">
              <input
                type="number"
                placeholder="Nombre de produits"
                className="border rounded-lg p-2"
                value={coopData.productCount}
                onChange={(e) =>
                  setCoopData({
                    ...coopData,
                    productCount: e.target.value,
                  })
                }
              />
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => {
                  setShowModal(false);
                  setEditingCoop(null);
                }}
                className="px-4 py-2 rounded-full border border-gray-400 text-gray-600 hover:bg-gray-100"
              >
                Annuler
              </button>
              <button
                onClick={handleSave}
                className="bg-cyan-800 text-white px-5 py-2 rounded-full hover:bg-cyan-700 transition"
              >
                {editingCoop ? "Enregistrer" : "Ajouter"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de confirmation de suppression */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-lg w-full max-w-sm p-6 text-center">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Supprimer cette coopérative ?
            </h2>
            <p className="text-gray-500 mb-6">
              Êtes-vous sûr de vouloir supprimer{" "}
              <span className="font-medium text-gray-800">
                {coopToDelete?.name}
              </span>{" "}
              ?
            </p>
            <div className="flex justify-center gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 rounded-full border border-gray-400 text-gray-700 hover:bg-gray-100"
              >
                Annuler
              </button>
              <button
                onClick={confirmDelete}
                className="bg-cyan-900 ml-17 text-white px-5 py-2 rounded-full hover:bg-cyan-800 transition"
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
