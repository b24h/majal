import React, { useState } from "react";
import { Plus } from "lucide-react";
import DeleteButton from "../components/ui/DeleteButton";
import EditButton from "../components/ui/EditButton";

export default function Products() {
  const [filter, setFilter] = useState("Tous");
  const [search, setSearch] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showForm, setShowForm] = useState(false);
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
      quant: "30"
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
      quant: "50"
    },
    { id: 3,
      name: "amlou",
      coop: "cooperative3",
      categ: "categorie3",
      price: "70 dh",
      desc: "description description description description description description description description description description description",
      status: "Rupture de stock",
      img: "https://i1.wp.com/cuisinedefadila.com/wp-content/uploads/2015/08/amlou-fait-maison-12-sur-13.jpg?fit=1020%2C680&ssl=1",
      quant: "27" },
  ]);

  const [formData, setFormData] = useState({
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

  const openAddForm = () => {
    setEditMode(false);
    setFormData({
      name: "",
      coop: "",
      cate: "",
      quant: "",
      price: "",
      desc: "",
      img: ""
    });
    setShowForm(true);
  };

  const openEditForm = (product) => {
    setEditMode(true);
    setSelectedProduct(product);

    setFormData({
      name: product.name,
      coop: product.coop,
      categ: product.categ,
      quant: product.quant,
      price: product.price,
      desc: product.desc,
      img: product.img
    });

    setShowForm(true);
  };

  const confirmDelete = () => {
    setProducts(products.filter((p) => p.id !== selectedProduct.id));
    setShowDeleteModal(false);
  };

  const handleSubmit = () => {
    if (editMode) {
      setProducts(
        products.map((p) =>
          p.id === selectedProduct.id ? { ...p, ...formData } : p
        )
      );
    } else {
      setProducts([
        ...products,
        { id: Date.now(), ...formData, status: "Disponible" },
      ]);
    }

    setShowForm(false);
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
                  onChange={setSearch}
                  placeholder="Rechercher un produit..."
                />
                <AddButton onClick={() => setShowModal(true)}>
                  Créer un pack
                </AddButton>
              </div>
            </div>
      <input
        type="text"
        placeholder="Rechercher..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-2 mb-4 rounded-lg border border-gray-300"
      />

      <h1 className="text-2xl font-semibold text-gray-800 mb-4">
        Gérer les produits
      </h1>

      <div className="flex gap-3 mb-6">
        {["Tous", "Disponible", "Stock faible", "Rupture de stock"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-1 rounded-full text-sm font-medium border transition ${
              filter === f
                ? "bg-[#2ba4b9] text-white border-[#2ba4b9]"
                : "bg-white border-gray-300 text-gray-700 hover:border-[#2ba4b9]"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {filtered.map((p) => (
          <div key={p.id} className="flex items-center bg-gray-100 rounded-xl p-4 shadow-sm">
            <img src={p.img} alt={p.name} className="w-20 h-20 object-cover rounded-md mr-4" />

            <div className="flex-1">
              <h2 className="text-lg font-semibold">{p.name}</h2>
              <p className="text-gray-400">{p.categ}</p>
              <p className="text-gray-500">{p.coop}</p>
              <p className="font-medium">{p.price}</p>
              <p className="text-sm text-gray-600 italic">• {p.status}</p>
            </div>

          <div className="flex flex-col items-end justify-between h-full">
            <div className="flex gap-2">
              <EditButton onClick={() => openEditForm(p)}/>
              <DeleteButton onClick={() => {setSelectedProduct(p); setShowDeleteModal(true)}}/>
            </div>
            <span className="text-sm text-gray-600 mt-2">{p.quant}</span>
          </div>
          </div>
        ))}
      </div>

      <button
        onClick={openAddForm}
        className="fixed bottom-6 right-6 bg-[#2ba4b9] text-white rounded-full p-4 shadow-lg"
      >
        <Plus size={24} />
      </button>

      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl w-80 text-center">
            <h2 className="text-lg font-semibold">Confirmation</h2>
            <p className="text-gray-600 mt-3">
              Supprimer <span className="font-bold">{selectedProduct?.name}</span> ?
            </p>

            <div className="flex justify-center gap-4 mt-5">
              <button className="px-4 py-2 bg-gray-200 rounded" onClick={() => setShowDeleteModal(false)}>
                Annuler
              </button>
              <button className="px-4 py-2 bg-red-500 text-white rounded" onClick={confirmDelete}>
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}

      {showForm && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center">
          <div className="bg-white p-6 w-96 rounded-xl shadow-xl">
            <h2 className="text-xl font-semibold mb-4">
              {editMode ? "Modifier le produit" : "Ajouter un produit"}
            </h2>

            <div className="flex flex-col gap-3">
              <input
                type="text"
                placeholder="Nom"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="p-2 border rounded"
              />

              <select
                value={formData.coop}
                onChange={(e) => setFormData({ ...formData, coop: e.target.value })}
                className="p-2 border rounded"
              >
                <option>Choisir coopérative</option>
                {cooperatives.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>

              <select
                value={formData.category}
                onChange={(e) => setFormData({...formData, categ: e.target.value})}
                className="p-2 border rounded">
                  <option>Choisir catégorie</option>
                  {categories.map((cat) => (
                    <option key={cat}>{cat}</option>
                  ))}
                </select>

              <input
                type="number"
                placeholder="Quantité"
                value={formData.quant}
                onChange={(e) => setFormData({ ...formData, quant: e.target.value })}
                className="p-2 border rounded"
              />

              <input
                type="text"
                placeholder="Prix"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="p-2 border rounded"
              />

              <textarea
                placeholder="Description"
                value={formData.desc}
                onChange={(e) => setFormData({ ...formData, desc: e.target.value })}
                className="p-2 border rounded"
              ></textarea>

              <div>
                <label className="text-sm font-medium">Image du produit</label>
                <input
                  type="file"
                  accept="image/"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file){
                      const url = URL.createObjectURL(file);
                      setFormData({...formData, img: url});}}}
                      className="mt-1 p-2 border rounded w-full" />
              </div>

              <div className="flex justify-end gap-3 mt-2">
                <button className="px-3 py-2 bg-gray-300 rounded" onClick={() => setShowForm(false)}>
                  Annuler
                </button>
                <button className="px-3 py-2 bg-[#2ba4b9] text-white rounded" onClick={handleSubmit}>
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

