import React, { useState, useMemo, useEffect } from "react";
import SearchBar from "../components/ui/SearchBar";
import AddButton from "../components/ui/AddButton";
import DeleteButton from "../components/ui/DeleteButton";
import EditButton from "../components/ui/EditButton";
import FilterTabs from "../components/ui/FilterTabs";

export default function Discounts() {
  const computeStatus = (start, end) => {
    const today = new Date().toISOString().split("T")[0];

    if (today < start) return "Planifiée";
    if (today > end) return "Expirée";
    return "Active";
  };

  const [discounts, setDiscounts] = useState([]);

  const [query, setQuery] = useState("");
  const [activeTab, setActiveTab] = useState("Tous");
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingDiscount, setEditingDiscount] = useState(null);

  const [form, setForm] = useState({
    title: "",
    percentage: "",
    product: "",
    startDate: "",
    endDate: "",
  });

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [toDelete, setToDelete] = useState(null);

  useEffect(() =>{
    fetch("/data/dicounts.json")
      .then(res => res.json())
      .then(data => {
        const withStatus = data.map(d => ({
          ...d,
          status: computeStatus(d.startDate, d.endDate)
        }));
        setDiscounts(withStatus);
      })
      .catch(err =)
  })

  const filtered = useMemo(() => {
    return discounts.filter((d) => {
      if (activeTab !== "Tous" && d.status !== activeTab) return false;
      const q = query.trim().toLowerCase();
      if (!q) return true;
      return (
        d.title.toLowerCase().includes(q) ||
        d.product.toLowerCase().includes(q)
      );
    });
  }, [discounts, query, activeTab]);

  const openAdd = () => {
    setEditingDiscount(null);
    setForm({
      title: "",
      percentage: "",
      product: "",
      startDate: "",
      endDate: "",
    });
    setShowEditModal(true);
  };

  const openEdit = (disc) => {
    setEditingDiscount(disc);
    setForm({
      title: disc.title || "",
      percentage: disc.percentage || "",
      product: disc.product || "",
      startDate: disc.startDate || "",
      endDate: disc.endDate || "",
    });
    setShowEditModal(true);
  };

  const saveDiscount = () => {
    if (!form.title || !form.percentage || !form.startDate || !form.endDate)
      return;

    const status = computeStatus(form.startDate, form.endDate);

    if (editingDiscount) {
      setDiscounts((prev) =>
        prev.map((d) =>
          d.id === editingDiscount.id
            ? { ...d, ...form, status }
            : d
        )
      );
    } else {
      setDiscounts((prev) => [
        ...prev,
        { id: Date.now(), ...form, status },
      ]);
    }
    setShowEditModal(false);
    setEditingDiscount(null);
  };

  const requestDelete = (disc) => {
    setToDelete(disc);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (!toDelete) return;
    setDiscounts((prev) => prev.filter((d) => d.id !== toDelete.id));
    setToDelete(null);
    setShowDeleteModal(false);
  };

  return (
    <div className="p-8 relative min-h-screen">
      <div className="mb-6 flex flex-col gap-4">
        <div className="flex justify-between items-center mb-6">
                <div>
                  <h1 className="text-2xl font-semibold">Gérer les réductions</h1>
                </div>
        
                <div className="flex items-center gap-3">
                  <SearchBar
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Rechercher un produit..."
                  />
                  <AddButton onClick={openAdd}>+ Ajouter une réduction</AddButton>
                </div>
              </div>

        <FilterTabs
                tabs={["Tous", "Active", "Planifiée", "Expirée"]}
                active={activeTab}
                onChange={setActiveTab}
              />
      </div>

      <div className="space-y-6">
        {filtered.length === 0 ? (
          <div className="bg-white rounded-2xl p-8 shadow-md text-center border border-dashed border-gray-200">
            <p className="text-gray-700 mb-2">Aucune réduction trouvée</p>
            <button
              onClick={openAdd}
              className="bg-cyan-800 text-white px-4 py-2 rounded-full hover:bg-cyan-700 transition"
            >
              + Ajouter une réduction
            </button>
          </div>
        ) : (
          filtered.map((d) => (
            <div
              key={d.id}
              className={`rounded-xl shadow-sm p-6 flex flex-col gap-3 transition ${
                d.status === "Expirée" ? "bg-gray-200 opacity-70" : "bg-gray-50"
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3
                    className={`text-lg font-extrabold tracking-wider uppercase ${
                      d.status === "Expirée" ? "text-gray-500" : ""
                    }`}
                  >
                    {d.title} - {d.percentage}%
                  </h3>
                  <p className="text-sm mt-1 text-gray-500 font-semibold">
                    {d.product}
                  </p>
                </div>

                <div className="flex flex-col items-end gap-2 text-right text-xs text-gray-500">
                  <span className="px-3 py-1 text-xs rounded-full bg-white border border-gray-200 text-gray-700">
                    {d.status}
                  </span>
                  <div>{d.startDate}</div>
                  <div>{d.endDate}</div>
                </div>
              </div>

              <div className="border-t border-gray-400 pt-4 flex items-center justify-end gap-3">
                <EditButton onClick={() => openEdit(d)}/>
                <DeleteButton onClick={() => requestDelete(d)}/>
              </div>
            </div>
          ))
        )}
      </div>

      {showEditModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl shadow-lg w-full max-w-md max-h-[90vh] flex flex-col p-6 relative">
            <div className="bg-cyan-800 text-white py-3 px-4 rounded-t-2xl -mx-6 -mt-6 mb-4 text-lg font-semibold">
              {editingDiscount ? "Modifier la réduction" : "Ajouter une réduction"}
            </div>

            <div className="px-6 pb-6 overflow-y-auto">
              <div>
                <label className="text-sm font-medium text-gray-700">Titre</label>
                <input type="text" value={form.title} onChange={(e) => setForm({...form, title: e.target.value})} className="mt-1 w-full border rounded-lg p-2" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Pourcentage</label>
                <input type="number" value={form.percentage} onChange={(e) => setForm({...form, percentage: e.target.value})} className="mt-1 w-full border rounded-lg p-2" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Produit</label>
                <input type="text" placeholder="Produit" value={form.product} onChange={(e) => setForm({ ...form, product: e.target.value })} className="mt-1 w-full border rounded-lg p-2"/>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Date de début</label>
                <input type="date" value={form.startDate} onChange={(e) => setForm({ ...form, startDate: e.target.value })} className="mt-1 w-full border rounded-lg p-2"/>
                <label className="text-sm font-medium text-gray-700">Date de fin</label>
                <input type="date" value={form.endDate} onChange={(e) => setForm({ ...form, endDate: e.target.value })} className="mt-1 w-full border rounded-lg p-2"/>
              </div>
            </div>
            <div className="flex justify-end mt-6 gap-3">
              <button
                onClick={() => setShowEditModal(false)}
                className="px-4 py-2 rounded-full border border-gray-400 text-gray-600 hover:bg-gray-100">
                Annuler
              </button>
              <button
                onClick={saveDiscount} className="bg-cyan-800 text-white px-5 py-2 rounded-full hover:bg-cyan-700">
                Enregistrer
              </button>
            </div>
          </div>
        </div>
      )}

      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl shadow-lg w-full max-w-sm p-6 text-center">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Supprimer cette réduction ?</h3>
            <p className="text-gray-500 mb-6">
              Êtes-vous sûr de vouloir supprimer <span className="font-medium text-gray-800">{toDelete?.title}</span> ?
            </p>

            <div className="flex justify-center gap-3">
              <button
                onClick={() => { setShowDeleteModal(false); }}
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
 