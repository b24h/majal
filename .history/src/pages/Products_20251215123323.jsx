import React, { useState, useEffect, useMemo } from "react";
import SearchBar from "../components/ui/SearchBar";
import AddButton from "../components/ui/AddButton";
import DeleteButton from "../components/ui/DeleteButton";
import EditButton from "../components/ui/EditButton";
import FilterTabs from "../components/ui/FilterTabs";
import productsService from "../api/productsService";
import cooperativesService from "../api/cooperativesService";
import categoriesService from "../api/categoriesService";

export default function Products() {
  const [filter, setFilter] = useState("Tous");
  const [search, setSearch] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [selectedCooperative, setSelectedCooperative] = useState("Tous");
  const [selectedCategory, setSelectedCategory] = useState("Tous");
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [cooperatives, setCooperatives] = useState([]);

  const [modalData, setModalData] = useState({
    name: "",
    description: "",
    details: "",
    price: "",
    photo: "",
    categoryId: "",
    cooperativeId: "",
    attachementRequests: [],
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        const [productsRes, cooperativesRes, categoriesRes] = await Promise.all(
          [
            productsService.getProducts(),
            cooperativesService.getCooperatives(),
            categoriesService.getCategories(),
          ]
        );

        setProducts(productsRes.data.result);
        setCooperatives(cooperativesRes.data);
        setCategories(categoriesRes.data);
      } catch (err) {
        console.error("Erreur lors du chargement des données", err);
      }
    };
    loadData();
  }, []);

  const handleSubmit = async () => {
    try {
      const payload = {
        name: modalData.name,
        description: modalData.description,
        details: modalData.details,
        price: parse(modalData.price),
        photo: modalData.photo,
        categoryId: modalData.categoryId,
        cooperativeId: modalData.cooperativeId,
        attachementRequests: modalData.attachementRequests
      };
      if (editMode) {
        await productsService.updateProduct(selectedProduct.id, payload);
      } else {
        await productsService.createProduct(payload);
      }

      const productsRes = await productsService.getProducts();
      setProducts(productsRes.data.result);

      setShowModal(false);
      setPreviewImage(null);
    } catch (err) {
      console.error("Erreur lors de l'enregistrement :", err.response?.data || err);
    }
  };

  const openAddModal = () => {
    setEditMode(false);
    setModalData({
      name: "",
      cooperativeId: "",
      categoryId: "",
      quant: "",
      price: "",
      shortDesc: "",
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
      cooperativeId: product.cooperativeId,
      categoryId: product.categoryId,
      quant: product.quant,
      price: product.price,
      shortDesc: product.shortDesc,
      desc: product.desc,
      img: product.img,
    });
    setPreviewImage(product.img);
    setShowModal(true);
  };

  const confirmDelete = async () => {
    try {
      await productsService.deleteProduct(selectedProduct.id);

      const productsRes = await productsService.getProducts();
      setProducts(productsRes.data.result);
      setShowDeleteModal(false);
    } catch (err) {
      console.error("Erreur lors de la suppression :", err);
    }
  };

  // const filtered = products
  //   .filter((p) => (filter === "Tous" ? true : p.status === filter))
  //   .filter((p) => p.name.toLowerCase().includes(search.toLowerCase()));

  const filteredProducts = useMemo(() => {
    if (!Array.isArray(products)) return [];
    return products.filter((product) => {
      const matchesSearch = product.name
        ?.toLowerCase()
        .includes(search.toLowerCase());
      const matchesStatus = filter === "Tous" || product.status === filter;
      const matchesCoop =
        selectedCooperative === "Tous" ||
        product.cooperativeId === selectedCooperative;
      const matchesCat =
        selectedCategory === "Tous" || product.categoryId === selectedCategory;
      return matchesSearch && matchesStatus && matchesCoop && matchesCat;
    });
  }, [products, search, selectedCooperative, selectedCategory]);
  const openDeleteModal = (product) => {
    setSelectedProduct(product);
    setShowDeleteModal(true);
  };

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

      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((p) => (
            <div
              key={p.id}
              className="bg-white rounded-2xl p-4 shadow border border-gray-200 flex flex-col"
            >
              <div className="w-full h-44 rounded-lg overflow-hidden bg-gray-100">
                {p.photo ? (
                  <img
                    src={`data:image/jpeg;base64,${p.photo}`}
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
                <p className="text-sm text-orange-600 mt-1 line-clamp-2">
                  {p.cooperativeName || "Inconnu"}
                </p>
                <p className="text-sm text-blue-600 mt-1 line-clamp-2">
                  {categoryName || "Inconnu"}
                </p>
                <p className="text-sm text-gray-400 mt-1 line-clamp-2">
                  {p.description}
                </p>
                <div className="mt-3 flex items-center justify-between">
                  <div>
                    <p className="font-bold">{p.price} MAD</p>
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
      ) : (
        <div className="flex flex-col items-center justify-center border border-dashed border-cyan-900 rounded-2xl py-16 mt-10">
          <h2 className="text-xl font-medium text-gray-800">
            Aucun produit trouvé
          </h2>
          <p className="text-gray-500 mb-6">
            Ajoutez vos produits pour commencer
          </p>
          <button
            onClick={showModal}
            className="bg-cyan-800 text-white px-5 py-2 rounded-full hover:bg-cyan-700"
          >
            + Ajouter un produit
          </button>
        </div>
      )}

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
                    setModalData({ ...modalData, photo: url });
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

              <div className="mt-4">
                <label className="text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  value={modalData.description}
                  onChange={(e) =>
                    setModalData({ ...modalData, description: e.target.value })
                  }
                  className="mt-1 w-full border rounded-lg p-2"
                />
              </div>

              <div className="mt-4">
                <label className="text-sm font-medium text-gray-700">
                  Détails
                </label>
                <textarea
                  value={modalData.details}
                  onChange={(e) =>
                    setModalData({ ...modalData, details: e.target.value })
                  }
                  className="mt-1 w-full border rounded-lg p-2"
                />
              </div>

              <div className="mt-4">
                <label className="text-sm font-medium text-gray-700">
                  Prix
                </label>
                <input
                  value={modalData.price}
                  onChange={(e) =>
                    setModalData({ ...modalData, price: e.target.value })
                  }
                  className="mt-1 w-full border rounded-lg p-2"
                />
              </div>

              <div className="mt-4">
                <label className="text-sm font-medium text-gray-700">
                  Coopérative
                </label>
                <select
                  value={modalData.cooperativeId}
                  onChange={(e) =>
                    setModalData({
                      ...modalData,
                      cooperativeId: parseInt(e.target.value),
                    })
                  }
                  className="p-2 border rounded mt-4 w-full"
                >
                  <option>Choisir une coopérative</option>
                  {cooperatives.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mt-4">
                <label className="text-sm font-medium text-gray-700">
                  Catégorie
                </label>
                <select
                  value={modalData.categoryId}
                  onChange={(e) =>
                    setModalData({
                      ...modalData,
                      categoryId: parseInt(e.target.value),
                    })
                  }
                  className="p-2 border rounded mt-4 w-full"
                >
                  <option>Choisir une catégorie</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
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
