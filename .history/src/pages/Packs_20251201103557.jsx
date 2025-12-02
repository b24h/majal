import React, {useState, useEffect} from "react";
import { Plus, X } from "lucide-react";
import DeleteButton from "../components/ui/DeleteButton";
import EditButton from "../components/ui/EditButton";

export default function Packs() {
const [search, setSearch] = useState("");
const products = [
  {
    id: 1,
    name: "Miel 500g",
    price: 129
  },
  {
    id: 2,
    name: "Huile d'argan 250ml",
    price: 99
  },
  {
    id: 3,
    name: "Savon traditionnel",
    price: 35
  },
  {
    id: 4,
    name: "Jellaba",
    price: 89
  },
]
  const [packs, setPacks] = useState([
    {
      id: 1,
      name: "Pack bien-être",
      description: "Un pack complet pour prendre soin de vous",
      products: [1, 3],
      reduction: 10,
      price: 249,
      image: "https://yac-shop.com/wp-content/uploads/2025/06/pack1-1024x1024.webp",
      status: true,
    },
  ]);

  const [showEditModal, setShowEditModal] = useState(false);
  const [editingPack, setEditingPack] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [toDeletePack, setToDeletePack] = useState(null);

  useEffect(() => {
    if (!editingPack) return;

    const selectedProducts = (editingPack?.products || []).map(
      (id) => products.find((p) => p.id === id)?.price || 0
    );

    const subtotal = selectedProducts.reduce((sum, price) => sum + price, 0);
    const discount = (subtotal * (editingPack.reduction || 0)) / 100;
    const finalPrice = subtotal - discount;

    setEditingPack((p) => ({...p, price: finalPrice}));
  }, [JSON.stringify(editingPack?.products), editingPack?.reduction]);

  const openAddModal = () => {
    setEditingPack({
      id: null,
      name: "",
      description: "",
      image: "",
      products: [],
      reduction: 0,
      price: 0,
      status: true,
      _file: null,
    });
    setPreviewImage(prev => {
      if (!prev) return prev;
      const exists = prev.products.includes(productId);
      return {
        ...prev,
        products: exists
        ? prev.products.filter(id => id !== productId)
        : [...prev.products, productId]
      };
    });
    setShowEditModal(true);
  };

  const openEditModal = (pack) => {
    setEditingPack({ ...pack, _file: null });
    setPreviewImage(pack.image || null);
    setShowEditModal(true);
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    setPreviewImage(url);
    setEditingPack((p) => ({ ...p, image: url, _file: file }));
  };

  const toggleProduct = (productId) => {
    setEditingPack((prev) => {
      const exists = prev.products.includes(productId);
      return {
        ...prev,
        products: exists
          ? prev.products.filter((id) => id !== productId)
          : [...prev.products, productId],
      };
    });
  };

  const handleSave = () => {
    if (!editingPack) return;
    if (!editingPack.name || !editingPack.price) {
      alert("Veuillez renseigner au moins le nom du pack et sélectionner des produits.");
      return;
    }

    if (editingPack.id) {
      setPacks((prev) => prev.map((p) => (p.id === editingPack.id ? { ...editingPack } : p)));
    } else {
      setPacks((prev) => [...prev, { ...editingPack, id: Date.now(), image: editingPack.image || null },
      ]);
    }

    setShowEditModal(false);
    setEditingPack(null);
    setPreviewImage(null);
  };

  const openDeleteModal = (pack) => {
    setToDeletePack(pack);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (!toDeletePack) return;
    setPacks((prev) => prev.filter((p) => p.id !== toDeletePack.id));
    setToDeletePack(null);
    setShowDeleteModal(false);
  };

  const toggleStatus = (id) => {
    setPacks((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status: !p.status } : p)));
  };

  const filtered = packs.filter((p) =>
    p.name.toLowerCase().includes(search.trim().toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold">Packs produits</h1>
          <p className="text-sm text-gray-500">Gérez vos packs </p>
        </div>

        <div className="flex items-center gap-3">
          <input
            type="text"
            placeholder="Rechercher un pack..."
            className="px-4 py-2 rounded-full border w-72 bg-white"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <button
            onClick={openAddModal}
            className="flex items-center gap-2 bg-cyan-800 text-white px-4 py-2 rounded-full shadow hover:bg-cyan-700"
          >
            <Plus size={16} /> Créer un pack
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((pack) => (
          <div key={pack.id} className="bg-white rounded-2xl p-4 shadow border border-gray-200 flex flex-col">
            <div className="w-full h-44 rounded-lg overflow-hidden bg-gray-100">
              {pack.image ? (
                <img src={pack.image} alt={pack.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">Aucune image</div>
              )}
            </div>

            <div className="mt-4 flex-1">
              <h2 className="text-lg font-semibold">{pack.name}</h2>
              <p className="text-sm text-gray-600 mt-1 line-clamp-2">{pack.description}</p>

              <div className="mt-3 flex items-center justify-between">
                <div>
                  <p className="font-bold">{pack.price} MAD</p>
                  <p className={`text-xs ${pack.status ? "text-green-600" : "text-gray-400"}`}>
                    {pack.status ? "Actif" : "Inactif"}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <EditButton onClick={() => openEditModal(pack)}/>
                  <DeleteButton onClick={() => openDeleteModal(pack)}/>
                </div>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span className="text-sm">Activer</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={pack.status}
                    onChange={() => toggleStatus(pack.id)}
                    className="sr-only"
                  />
                  <div className={`w-12 h-6 rounded-full transition ${pack.status ? "bg-green-500" : "bg-gray-300"}`} />
                </label>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showEditModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-6 relative">
            <div className="bg-cyan-800 text-white py-3 px-4 rounded-t-2xl -mx-6 -mt-6 mb-4 text-lg font-semibold">
              {editingPack?.id ? "Modifier le pack" : "Ajouter un pack"}
            </div>

            
              <div>
                <label className="text-sm font-medium text-gray-700">Image du pack</label>
                <div className="mt-2 w-full h-40 bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
                  {previewImage ? (
                    <img src={previewImage} alt="preview" className="w-full h-full object-cover" />
                  ) : (
                    <div className="text-gray-400">Aucune image</div>
                  )}
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="mt-2"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">Nom</label>
                <input
                  type="text"
                  value={editingPack?.name || ""}
                  onChange={(e) => setEditingPack((p) => ({ ...p, name: e.target.value }))}
                  className="mt-1 w-full border rounded-lg p-2"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">Description</label>
                <textarea
                  value={editingPack?.description || ""}
                  onChange={(e) => setEditingPack((p) => ({ ...p, description: e.target.value }))}
                  className="mt-1 w-full border rounded-lg p-2 mt-1"
                  rows={3}
                />
              </div>

              <label className="text-sm font-medium text-gray-700 mt-4">Produit du pack</label>
              <div className="grid grid-cols-1 gap-2 mt-2">
                {products.map((prod) => (
                  <label key={prod.id} className="flex items-center gap-2">
                    <input
                      type="checkbox" 
                      checked={editingPack?.products.includes(prod.id)} 
                      onChange={() => toggleProduct(prod.id)} />
                      <span>
                        {prod.name} - {prod.price} MAD
                      </span>
                  </label>
                ))}
              </div>

              <label className="text-sm font-medium text-gray-700 mt-4">Taux de réduction (%)</label>
              <input
                type="number" 
                min="0" 
                max="90" 
                value={editingPack.reduction} 
                onChange={(e) => 
                  setEditingPack({...editingPack, reduction: Number(e.target.value)})}
                className="w-full border rounded-lg p-2 mt-1"
              />


              <p className="mt-4 font-semibold text-lg">
                Prix final : {" "}
                <span className="text-cyan-800">{editingPack.price} MAD</span>
              </p>
            

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => { setShowEditModal(false); setEditingPack(null); setPreviewImage(null); }}
                className="px-4 py-2 rounded-full border border-gray-400 text-gray-600 hover:bg-gray-100"
              >
                Annuler
              </button>
              <button
                onClick={handleSave}
                className="bg-cyan-800 text-white px-5 py-2 rounded-full hover:bg-cyan-700"
              >
                Enregistrer
              </button>
            </div>
          </div>
        </div>
      )}

      {showDeleteModal && toDeletePack && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl shadow-lg w-full max-w-sm p-6 text-center">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Supprimer ce pack ?</h3>
            <p className="text-gray-500 mb-6">
              Êtes-vous sûr de vouloir supprimer <span className="font-medium text-gray-800">{toDeletePack.name}</span> ?
            </p>

            <div className="flex justify-center gap-3">
              <button
                onClick={() => { setShowDeleteModal(false); setToDeletePack(null); }}
                className="px-4 py-2 rounded-full border border-gray-400 text-gray-700 hover:bg-gray-100"
              >
                Annuler
              </button>
              <button
                onClick={confirmDelete}
                className="bg-cyan-900 text-white px-5 py-2 rounded-full hover:bg-cyan-800"
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
