import React, { useState, useEffect, useMemo } from "react";
import SearchBar from "../components/ui/SearchBar";
import AddButton from "../components/ui/AddButton";
import DeleteButton from "../components/ui/DeleteButton";
import EditButton from "../components/ui/EditButton";
import categoriesService from "../api/categoriesService";
import productsService from "../api/productsService";

import axios from "axios";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [desc, setDesc] = useState("");
  const [photo, setPhoto] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  
  const [showModal, setShowModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [pendingDeletedId, setPendingDeletedId] = useState(null);

  const [catData, setCatData] = useState({
    name: "",
    description: "",
    photo: "",
    icon: ""
  });

  const categoryToDelete = categories.find((c) => c.id === pendingDeletedId);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [categoriesRes, productsRes] = await Promise.all([
          categoriesService.getCategories(),
          productsService.getProducts(),
        ]);

        setCategories(categoriesRes.data);
        setProducts(productsRes.data);
      } catch (err) {
        console.error("Erreur lors du chargement des données", err);
      }
    };

    loadData();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    if (!catData.name) return;

    try {
      if (editingCategory) {
        await categoriesService.update(editingCategory.id, catData);

        setCategories((prev) =>
          prev.map((c) =>
            c.id === editingCategory.id ? { ...c, ...catData } : c
          )
        );
      } else {
        const res = await categoriesService.create(catData);
        setCategories((prev) => [...prev, res.data]);
      }

      setShowModal(false);
      setEditingCategory(null);
      setCatData({ name: "", description: "", photo: "",icon: "" });

    } catch (err) {
      console.error("Erreur lors de l'enregistrement", err);
    }
  };

  const openEdit = (cat) => {
    setEditingCategory(cat);
    setCatData({
      name: cat.name,
      description: cat.description || "",
      photo: cat.photo || "",
      icon: cat.icon || ""
    });
    setShowModal(true);
  };

  const handleEditSave = (e) => {
    e.preventDefault();
    if (!editingCategory.name.trim()) return;
    setCategories((prev) =>
      prev.map((c) =>
        c.id === editingCategory.id
          ? { ...c, name: editingCategory.name.trim() }
          : c
      )
    );
    setShowModal(false);
    setEditingCategory(null);
  };

  const confirmDelete = (id) => {
    setPendingDeletedId(id);
    setShowDeleteConfirm(true);
  };

  const handleDelete = async () => {
    if (pendingDeletedId == null) return;
    try{
      await categoriesService.delete(pendingDeletedId);
      setCategories((prev) => prev.filter((c) => c.id !== pendingDeletedId));
      setPendingDeletedId(null);
      setShowDeleteConfirm(false);
    }catch (err) {
      console.error("Erreur lors de la suppression", err);
    }
  };

  const filteredCategories = categories.filter((cat) =>
    cat.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 font-poppins">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold">Gérer les catégories</h1>
        </div>

        <div className="flex items-center gap-3">
          <SearchBar onChange={(e) => setSearch(e.target.value)}></SearchBar>
          <AddButton onClick={() => setShowModal(true)}>
            + Ajouter une catégorie
          </AddButton>
        </div>
      </div>
      {filteredCategories.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCategories.map((cat) => (
            <div
              key={cat.id}
              className="bg-gray-100 shadow-sm rounded-2xl p-6 flex flex-col justify-between"
            >
              <div>
                {cat.icon && (
                  <img src={cat.icon} alt="icon" className="w-10 h-10 mb-3" />
                )}
                {cat.photo && (
                  <img src={cat.photo} alt="photo" className="w-full h-32 object-cover rounded-xl mb-3" />
                )}
                <h2 className="text-lg font-semibold mb-2">{cat.name}</h2>
                {cat.description && (
                  <p className="text-sm text-gray-600 mb-2">{cat.description}</p> 
                )}
                <p className="text-sm text-gray-600">
                  {products.filter((p) => p.categoryId === cat.id).length}{" "} produit
                  {products.filter((p) => p.categoryId === cat.id).length > 1 ? "s" : ""}
                </p>
              </div>

              <div className="flex justify-end gap-2 mt-4">
                <EditButton onClick={() => openEdit(cat)} />
                <DeleteButton onClick={() => confirmDelete(cat.id)} />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center border border-dashed border-cyan-900 rounded-2xl py-16 mt-10">
          <h2 className="text-xl font-medium text-gray-800">
            Aucune catégorie trouvée
          </h2>
          <p className="text-gray-500 mb-6">
            Ajoutez vos catégories pour commencer
          </p>
          <button
            onClick={() => setShowModal(true)}
            className="bg-cyan-800 text-white px-5 py-2 rounded-full hover:bg-cyan-700"
          >
            + Ajouter une catégorie
          </button>
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl shadow-lg w-full max-w-md max-h-[90vh] flex flex-col p-6 relative">
            <div className="bg-cyan-800 text-white py-3 px-4 rounded-t-2xl -mx-6 -mt-6 mb-4 text-lg font-semibold">
              {editingCategory?.id
                ? "Modifier la catégorie"
                : "Ajouter une catégorie"}
            </div>
            <div className="px-6 pb-6 overflow-y-auto">
              <div>
                <label className="text-sm font-medium text-gray-700">Nom</label>
                <input
                  type="text"
                  value={catData.name}
                  onChange={(e) =>
                    setCatData({ ...catData, name: e.target.value })
                  }
                  className="mt-1 w-full border rounded-lg p-2"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Description</label>
                <textarea
                  value={catData.description} 
                  onChange={(e) => setCatData({...catData, description: e.target.value})}
                  className="mt-1 w-full border rounded-lg p-2"/>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Photo (URL)</label>
                <input
                  type="text" 
                  value={catData.photo} 
                  onChange={(e) => setCatData({...catData, photo: e.target.value})}
                  className="mt-1 w-full border rounded-lg p-2" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Icon (URL)</label>
                <input
                  type="text"
                  value={}
                  className="mt-" />
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={() => {
                    setShowModal(false);
                    setEditingCategory(null);
                    setCatData({ name: "" });
                  }}
                  className="px-4 py-2 rounded-full border border-gray-400 text-gray-600 hover:bg-gray-100"
                >
                  Annuler
                </button>
                <button
                  onClick={handleSave}
                  className="bg-cyan-800 text-white px-5 py-2 rounded-full hover:bg-cyan-700"
                >
                  {editingCategory ? "Enregistrer" : "Ajouter"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl shadow-lg w-full max-w-sm p-6 text-center">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Supprimer cette catégorie ?
            </h3>
            <p className="text-gray-500 mb-6">
              Êtes-vous sûr de vouloir supprimer{" "}
              <span className="font-medium text-gray-800">
                {categoryToDelete?.name}
              </span>{" "}
              ?
            </p>

            <div className="flex justify-center gap-3">
              <button
                onClick={() => {
                  setShowDeleteConfirm(false);
                  setPendingDeletedId(null);
                }}
                className="px-4 py-2 rounded-full border border-gray-400 text-gray-700 hover:bg-gray-100"
              >
                Annuler
              </button>
              <button
                onClick={handleDelete}
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
