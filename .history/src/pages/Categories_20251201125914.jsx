import React, { useState } from "react";
import SearchBar from "../components/ui/SearchBar";
import AddButton from "../components/ui/AddButton";
import DeleteButton from "../components/ui/DeleteButton";
import EditButton from "../components/ui/EditButton";

export default function Categories() {
  const [categories, setCategories] = useState([
    { id: 1, name: "Vêtements", productCount: 12 },
    { id: 2, name: "Nourriture", productCount: 25 },
    { id: 3, name: "categorie3", productCount: 7 },
  ]);

  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);

  const [showEditModal, setShowEditModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [pendingDeletedId, setPendingDeletedId] = useState(null);

  const [newCategory, setNewCategory] = useState({ name: "" });

  const handleAdd = (e) => {
    e.preventDefault();
    if (!newCategory.name.trim()) return;
    const newId = categories.length
      ? Math.max(...categories.map((c) => c.id)) + 1
      : 1;
    setCategories([
      ...categories,
      { id: newId, name: newCategory.name.trim(), productCount: 0 },
    ]);
    setNewCategory({ name: "" });
    setShowAddModal(false);
  };

  const openEdit = (cat) => {
    setEditingCategory({ id: cat.id, name: cat.name });
    setShowEditModal(true);
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
    setShowEditModal(false);
    setEditingCategory(null);
  };

  const confirmDelete = (id) => {
    setPendingDeletedId(id);
    setShowDeleteConfirm(true);
  };

  const handleDelete = () => {
    if (pendingDeletedId == null) return;
    setCategories((prev) => prev.filter((c) => c.id !== pendingDeletedId));
    setPendingDeletedId(null);
    setShowDeleteConfirm(false);
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
          <SearchBar onChange={setSearch}></SearchBar>
          <AddButton onClick={() => setShowAddModal(true)}>
            + Ajouter une catégorie
          </AddButton>
        </div>
      </div>
      <div className="space-y-5">
        {filteredCategories.length > 0 ? (
          filteredCategories.map((cat) => (
            <div
              key={cat.id}
              className="bg-gray-100 rounded-2xl shadow-sm p-5 flex justify-between items-center hover:shadow-md transition-all"
            >
              <div>
                <h2 className="text-lg font-medium underline cursor-pointer">
                  {cat.name}
                </h2>
                <p className="text-gray-600">
                  {cat.productCount} produit{cat.productCount > 1 ? "s" : ""}
                </p>
              </div>
              <div className="flex gap-2">
                <EditButton onClick={() => openEdit(cat)} />
                <DeleteButton onClick={() => confirmDelete(cat.id)} />
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">Aucune catégorie trouvée.</p>
        )}
      </div>

{showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl shadow-lg w-full max-w-md max-h-[90vh] flex flex-col p-6 relative">
            <div className="bg-cyan-800 text-white py-3 px-4 rounded-t-2xl -mx-6 -mt-6 mb-4 text-lg font-semibold">
              {editingCategory?.id ? "Modifier la catégorie" : "Ajouter une catégorie"}
            </div>
              <div className="px-6 pb-6 overflow-y-auto">
              <div>
                <label className="text-sm font-medium text-gray-700">Nom</label>
                <input type="text" value={coopData.name} onChange={(e) => setCoopData({ ...coopData, name: e.target.value })} className="mt-1 w-full border rounded-lg p-2"/>
              </div>
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


      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl w-[90%] max-w-md shadow-xl relative">
            <form onSubmit={handleAdd} className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="Nom de la catégorie"
                value={newCategory.name}
                onChange={(e) => setNewCategory({ name: e.target.value })}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#2ba4b9]"
              />
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowAddModal(false);
                    setNewCategory({ name: "" });
                  }}
                  className="px-4 py-2 border border-gray-400 rounded-lg hover:bg-gray-100"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="bg-[#2ba4b9] text-white px-4 py-2 rounded-lg hover:bg-[#238a9c]"
                >
                  Ajouter
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {showEditModal && editingCategory && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl w-[90%] max-w-md shadow-xl">
            <h2 className="text-xl font-semibold mb-4">
              Modifier la catégorie
            </h2>
            <form onSubmit={handleEditSave} className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="Nom de la catégorie"
                value={editingCategory.name}
                onChange={(e) =>
                  setEditingCategory({
                    ...editingCategory,
                    name: e.target.value,
                  })
                }
                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#2ba4b9]"
                autoFocus
              />
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowEditModal(false);
                    setEditingCategory(null);
                  }}
                  className="px-4 py-2 border border-gray-400 rounded-lg hover:bg-gray-100"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="bg-[#2ba4b9] text-white px-4 py-2 rounded-lg hover:bg-[#238a9c]"
                >
                  Sauvegarder
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl w-[90%] max-w-sm shadow-xl">
            <h3 className="text-lg font-semibold mb-2">
              Confirmer la suppression
            </h3>
            <p className="text-gray-600 mb-4">
              Attention vous avez cliqué sur "Supprimer". Voulez-vous vraiment
              supprimer cette catégorie ?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => {
                  setShowDeleteConfirm(false);
                  setPendingDeletedId(null);
                }}
                className="px-4 py-2 border border-gray-400 rounded-lg hover:bg-gray-100"
              >
                Annuler
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
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
