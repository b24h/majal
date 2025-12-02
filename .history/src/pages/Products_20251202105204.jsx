import React, { useState } from "react";
import { Plus } from "lucide-react";
import SearchBar from "../components/ui/SearchBar";
import AddButton from "../components/ui/AddButton";
import DeleteButton from "../components/ui/DeleteButton";
import EditButton from "../components/ui/EditButton";
import FilterTabs from "../components/ui/FilterTabs";

export default function Products() {
  const [filter, setFilter] = useState("Tous");
  const [search, setSearch] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [products, setProducts] = useState([
    {
      id: 1,
      name: "huile d'argan",
      coop: "cooperative1",
      categ: "categorie1",
      price: "100 dh",
      desc: "description...",
      status: "Disponible",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStWCOMXp60DVH7_TUp4gZ6mw8r4yL0kZX9uQ&s",
      quant: "30",
    },
    {
      id: 2,
      name: "dattes",
      coop: "cooperative2",
      categ: "categorie2",
      price: "150 dh",
      desc: "description...",
      status: "Stock faible",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsO2xviaBAjVPHe3B0ELWF6qFafg41fEzljA&s",
      quant: "50",
    },
    {
      id: 3,
      name: "amlou",
      coop: "cooperative3",
      categ: "categorie3",
      price: "70 dh",
      desc: "description description description description description description description description description description description",
      status: "Rupture de stock",
      img: "https://i1.wp.com/cuisinedefadila.com/wp-content/uploads/2015/08/amlou-fait-maison-12-sur-13.jpg?fit=1020%2C680&ssl=1",
      quant: "27",
    },
  ]);

  const [modalData, setModalData] = useState({
    name: "",
    coop: "",
    categ: "",
    quant: "",
    price: "",
    desc: "",
    img: "",
  });

  const categories = ["categorie1", "categorie2", "categorie3"];
  const cooperatives = ["cooperative1", "cooperative2", "cooperative3"];

  const openAddModal = () => {
    setEditMode(false);
    setModalData({
      name: "",
      coop: "",
      categ: "",
      quant: "",
      price: "",
      desc: "",
      img: "",
    });
    setShowModal(true);
  };

  const openEditModal = (product) => {
    setEditMode(true);
    setSelectedProduct(product);

    setModalData({
      name: product.name,
      coop: product.coop,
      categ: product.categ,
      quant: product.quant,
      price: product.price,
      desc: product.desc,
      img: product.img,
    });

    setShowModal(true);
  };

  const confirmDelete = () => {
    setProducts(products.filter((p) => p.id !== selectedProduct.id));
    setShowDeleteModal(false);
  };

  const handleSubmit = () => {
    if (editMode) {
      setProducts(
        products.map((p) =>
          p.id === selectedProduct.id ? { ...p, ...modalData } : p
        )
      );
    } else {
      setProducts([
        ...products,
        { id: Date.now(), ...modalData, status: "Disponible" },
      ]);
    }

    setShowModal(false);
  };

  const filtered = products
    .filter((p) => (filter === "Tous" ? true : p.status === filter))
    .filter((p) => p.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="relative p-6 font-poppins">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold">Gérer les produits</h1>
        </div>

        <div className="flex items-center gap-3">
          <SearchBar
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Rechercher un produit..."
          />
          <AddButton onClick={openAddModal}>+ Ajouter un produit</AddButton>
        </div>
      </div>

      <FilterTabs
        tabs={["Tous", "Disponible", "Stock faible", "Rupture de stock"]}
        active={filter}
        onChange={setFilter}
      />

      <div className="space-y-4">
        {filtered.map((p) => (
          <div
            key={p.id}
            className="flex items-center bg-gray-100 rounded-xl p-4 shadow-sm"
          >
            <img
              src={p.img}
              alt={p.name}
              className="w-20 h-20 object-cover rounded-md mr-4"
            />

            <div className="flex-1">
              <h2 className="text-lg font-semibold">{p.name}</h2>
              <p className="text-gray-400">{p.categ}</p>
              <p className="text-gray-500">{p.coop}</p>
              <p className="font-medium">{p.price}</p>
              <p className="text-sm text-gray-600 italic">• {p.status}</p>
            </div>

            <div className="flex flex-col items-end justify-between h-full">
              <div className="flex gap-2">
                <EditButton onClick={() => openEditModal(p)} />
                <DeleteButton
                  onClick={() => {
                    setSelectedProduct(p);
                    setShowDeleteModal(true);
                  }}
                />
              </div>
              <span className="text-sm text-gray-600 mt-2">{p.quant}</span>
            </div>
          </div>
        ))}
      </div>

      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl w-80 text-center">
            <h2 className="text-lg font-semibold">Confirmation</h2>
            <p className="text-gray-600 mt-3">
              Supprimer{" "}
              <span className="font-bold">{selectedProduct?.name}</span> ?
            </p>

            <div className="flex justify-center gap-4 mt-5">
              <button
                className="px-4 py-2 bg-gray-200 rounded"
                onClick={() => setShowDeleteModal(false)}
              >
                Annuler
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded"
                onClick={confirmDelete}
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}


{showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl shadow-lg w-full max-w-md max-h-[90vh] flex flex-col p-6 relative">
            <div className="bg-cyan-800 text-white py-3 px-4 rounded-t-2xl -mx-6 -mt-6 mb-4 text-lg font-semibold">
              {editingPack?.id ? "Modifier le produit" : "Ajouter un produit"}
            </div>
              <div className="px-6 pb-6 overflow-y-auto">
                <label className="text-sm font-medium text-gray-700">Image du produit</label>
                <div className="mt-2 w-full h-40 bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
                  {previewImage ? (<img src={previewImage} alt="preview" className="w-full h-full object-cover" />) 
                  : (<div className="text-gray-400">Aucune image</div>)}
                </div>
                <input type="file" accept="image/*" onChange={handleFileChange} className="mt-2" />
              <div>
                <label className="text-sm font-medium text-gray-700">Nom</label>
                <input type="text" value={modalData?.name || ""} onChange={(e) => setModalData((p) => ({ ...p, name: e.target.value }))} className="mt-1 w-full border rounded-lg p-2"/>
              </div>
              <select value={modalData.coop} onChange={(e) =>setModalData({...modalData({...modalData, coop: e.target.value})})} className="p-2 border rounded">
                <option>Choisir une coopérative</option>
                {cooperatives.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
              <select value={modalData.category} onChange={(e) => setModalData({...modalData, categ: e.target.value})} className="p-2 border rounded">
                <option>Choisir une catégorie</option>
                  {categories.map((cat) => (
                    <option key={cat}>{cat}</option>
                ))}
              </select>
              <div>
                <label className="text-sm font-medium text-gray-700">Quantité</label>
                <input type="number" value={modalData.quant} onChange={(e) => setModalData({...modalData, quant: e.target.value})}  className="p-2 border rounded" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Prix</label>
                <input type="number" value={modalData.price} onChange={(e) => setModalData({...modalData, price: e.target.value})}  className="p-2 border rounded" />
                <span className="text-cyan-800"> MAD</span>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Description</label>
                <textarea value={modalData.desc} onChange={(e) => setModalData({ ...modalData, desc: e.target.value })} className="mt-1 w-full border rounded-lg p-2 mt-1" rows={3}/>
              </div>
              <label className="text-sm font-medium text-gray-700 mt-4">Produit du pack</label>
              <div className="grid grid-cols-1 gap-2 mt-2">
                {products.map((prod) => (<label key={prod.id} className="flex items-center gap-2">
                    <input type="checkbox" checked={editingPack?.products.includes(prod.id)} onChange={() => toggleProduct(prod.id)} />
                    <span>{prod.name} - {prod.price} MAD</span>
                  </label>
                ))}
              </div>
              <label className="text-sm font-medium text-gray-700 mt-4">Taux de réduction (%)</label>
              <input type="number" min="0" max="90" value={editingPack.reduction} onChange={(e) => setEditingPack({...editingPack, reduction: Number(e.target.value)})} className="w-full border rounded-lg p-2 mt-1"/>
              <p className="mt-4 font-semibold text-lg">Prix final : {" "} <span className="text-cyan-800">{editingPack.price} MAD</span></p>
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
        </div>
      )}
      {showForm && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center">
          <div className="bg-white p-6 w-96 rounded-xl shadow-xl">
            <div className="flex flex-col gap-3">
              <div>
                <label className="text-sm font-medium">Image du produit</label>
                <input
                  type="file"
                  accept="image/"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      const url = URL.createObjectURL(file);
                      setFormData({ ...formData, img: url });
                    }
                  }}
                  className="mt-1 p-2 border rounded w-full"
                />
              </div>

              <div className="flex justify-end gap-3 mt-2">
                <button
                  className="px-3 py-2 bg-gray-300 rounded"
                  onClick={() => setShowForm(false)}
                >
                  Annuler
                </button>
                <button
                  className="px-3 py-2 bg-[#2ba4b9] text-white rounded"
                  onClick={handleSubmit}
                >
                  {editMode ? "Modifier" : "Ajouter"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
