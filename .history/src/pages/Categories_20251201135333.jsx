import React, { useState } from "react";
import SearchBar from "../components/ui/SearchBar";
import AddButton from "../components/ui/AddButton";
import DeleteButton from "../components/ui/DeleteButton";
import EditButton from "../components/ui/EditButton";

export default function Categories() {
  const [categories, setCategories] = useState([
    { id: 1, name: "Vêtements"},
    { id: 2, name: "Nourritures"},
    { id: 3, name: "Décorations"},
  ]);


  const [products, setProducts] = useState([
    {id: 1: name: "Amlou d'amendes", categoryId: 2},
    {id: 2: name: "Amlou de cahahuètes", categoryId: 2},
    {id: 3: name: "Jellaba", categoryId: 1},
    {id: 4: name: "Caftan", categoryId: 1},
    {id: 5: name: "Derbouka", categoryId: },
    {id: 6: name: "Huile d'argan", categoryId: ""},
    {id: 7: name: "Savon beldi", categoryId: ""},
    {id: 8: name: "Hayk", categoryId: ""},
    {id: 9: name: "Tapis traditionnel", categoryId: ""},
    {id: 10: name: "Belgha", categoryId: ""},
    {id: 11: name: "Huile d'olive", categoryId: ""},
  ])
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [pendingDeletedId, setPendingDeletedId] = useState(null);

  const [catData, setCatData] = useState({ name: "" });

  const handleSave = (e) => {
    e.preventDefault();
    if (!catData.name) return;

    if (editingCategory){
      setCategories((prev) =>
        prev.map((c) =>
          c.id === editingCategory.id
            ? {
              ...editingCategory,
              ...catData,
              productCount: parseInt(catData.productCount || 0),
            } : c
    ))
    } else{
      setCategories((prev) => [
        ...prev,
        {
          id: Date.now(),
          ...catData,
          productCount: parseInt(catData.productCount || 0),
        },
      ]);
    }
    setShowModal(false);
    setEditingCategory(null);
    setCatData({ name: "" });
  };

  const openEdit = (cat) => {
    setEditingCategory(cat);
    setCatData({name: cat.name});
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
          <SearchBar onChange={(e) => setSearch(e.target.value)}></SearchBar>
          <AddButton onClick={() => setShowModal(true)}>
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
                  {products.filter(p => p.categoryId === cat.id).length} produit
                  {products.filter(p => p.categoryId === cat.id).length > 1 ? "s" : ""}
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
                <input type="text" value={catData.name} onChange={(e) => setCatData({ ...catData, name: e.target.value })} className="mt-1 w-full border rounded-lg p-2"/>
              </div>
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => { setShowModal(false); setEditingCategory(null); setCatData({name: ""});}}
                className="px-4 py-2 rounded-full border border-gray-400 text-gray-600 hover:bg-gray-100">
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
