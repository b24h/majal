import React, { useState, useEffect } from "react";
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
  const [previewImage, setPreviewImage] = useState(null);

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  cont [cooperatives, setCooperatives] = useState([]);

  const [modalData, setModalData] = useState({
    name: "",
    coop: "",
    categ: "",
    quant: "",
    price: "",
    desc: "",
    img: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsRes, categoriesRes, cooperativesRes] = await Promise.all([
          fetch("/data/products.json"),
          fetch("/data/cooperatives.json"),
          fetch("/data/categories.json"),
        ]);

        const productsData = await productsRes.json();
        const cooperativesData = await cooperativesRes.json();
        const categoriesData = await categoriesRes.json();

        setProducts(productsData);
        setCategories(categoriesData);
        set
      }
    }
  })


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
    setPreviewImage(product.img);
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

  const openDeleteModal = (product) => {
    setSelectedProduct(product);
    setShowDeleteModal(true);
  }

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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((p) => (
          <div
            key={p.id}
            className="bg-white rounded-2xl p-4 shadow border border-gray-200 flex flex-col"
          >
            <div className="w-full h-44 rounded-lg overflow-hidden bg-gray-100">
              {p.img ? (
                <img
                  src={p.img}
                  alt={p.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  Aucune image
                </div>
              )}
            </div>

            <div className="mt-4 flex-1">
              <h2 className="text-lg font-semibold">{p.name}</h2>
              <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                {p.coop}
              </p>
              <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                {p.categ}
              </p>

              <div className="mt-3 flex items-center justify-between">
                <div>
                  <p className="font-bold">{p.price} MAD</p>
                  <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                    • {p.status}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <EditButton onClick={() => openEditModal(p)} />
                  <DeleteButton onClick={() => openDeleteModal(p)} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl shadow-lg w-full max-w-md max-h-[90vh] flex flex-col p-6 relative">
            <div className="bg-cyan-800 text-white py-3 px-4 rounded-t-2xl -mx-6 -mt-6 mb-4 text-lg font-semibold">
              {editMode ? "Modifier le produit" : "Ajouter un produit"}
            </div>

            <div className="px-6 pb-6 overflow-y-auto">
              <label className="text-sm font-medium text-gray-700">
                Image du produit
              </label>
              <div className="mt-2 w-full h-40 bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
                {previewImage ? (
                  <img
                    src={previewImage}
                    alt="preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-gray-400">Aucune image</div>
                )}
              </div>

              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    const url = URL.createObjectURL(file);
                    setModalData({ ...modalData, img: url });
                    setPreviewImage(url);
                  }
                }}
                className="mt-2"
              />

              <div className="mt-4">
                <label className="text-sm font-medium text-gray-700">Nom</label>
                <input
                  type="text"
                  value={modalData?.name || ""}
                  onChange={(e) =>
                    setModalData({ ...modalData, name: e.target.value })
                  }
                  className="mt-1 w-full border rounded-lg p-2"
                />
              </div>

              <select
                value={modalData.coop}
                onChange={(e) =>
                  setModalData({ ...modalData, coop: e.target.value })
                }
                className="p-2 border rounded mt-4 w-full"
              >
                <option>Choisir une coopérative</option>
                {cooperatives.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>

              <select
                value={modalData.categ}
                onChange={(e) =>
                  setModalData({ ...modalData, categ: e.target.value })
                }
                className="p-2 border rounded mt-4 w-full"
              >
                <option>Choisir une catégorie</option>
                {categories.map((cat) => (
                  <option key={cat}>{cat}</option>
                ))}
              </select>

              <div className="mt-4">
                <label className="text-sm font-medium text-gray-700">
                  Quantité
                </label>
                <input
                  type="number"
                  value={modalData.quant}
                  onChange={(e) =>
                    setModalData({ ...modalData, quant: e.target.value })
                  }
                  className="p-2 border rounded w-full"
                />
              </div>

              <div className="mt-4">
                <label className="text-sm font-medium text-gray-700">
                  Prix
                </label>
                <div className="flex items-center">
                  <input
                    type="number"
                    value={modalData.price}
                    onChange={(e) =>
                      setModalData({ ...modalData, price: e.target.value })
                    }
                    className="p-2 border rounded w-full"
                  />
                  <span className="text-cyan-800 ml-2">MAD</span>
                </div>
              </div>

              <div className="mt-4">
                <label className="text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  value={modalData.desc}
                  rows={3}
                  onChange={(e) =>
                    setModalData({ ...modalData, desc: e.target.value })
                  }
                  className="mt-1 w-full border rounded-lg p-2"
                />
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={() => {
                    setShowModal(false);
                    setPreviewImage(null);
                  }}
                  className="px-4 py-2 rounded-full border border-gray-400 text-gray-600 hover:bg-gray-100"
                >
                  Annuler
                </button>

                <button
                  onClick={handleSubmit}
                  className="bg-cyan-800 text-white px-5 py-2 rounded-full hover:bg-cyan-700"
                >
                  {editMode ? "Enregistrer" : "Ajouter"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl shadow-lg w-full max-w-sm p-6 text-center">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Supprimer ce produit ?
            </h3>
            <p className="text-gray-500 mb-6">
              Êtes-vous sûr de vouloir supprimer{" "}
              <span className="font-medium text-gray-800">
                {selectedProduct?.name}
              </span>{" "}
              ?
            </p>

            <div className="flex justify-center gap-3">
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                }}
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
