import React, { useState } from "react";
import SearchBar from "../components/ui/SearchBar";
import AddButton from "../components/ui/AddButton";
import DeleteButton from "../components/ui/DeleteButton";
import { Calendar, Percent, Tag, Pencil } from "lucide-react";
import EditButton from "../components/ui/EditButton";
import FilterTabs from "../components/ui/FilterTabs";

export default function Coupons() {
  const [coupons, setCoupons] = useState([
    {
      code: "WELCOME10",
      percentage: 10,
      startDate: "2025-01-01",
      endDate: "2025-12-31",
    },
    {
      code: "BLACKFRIDAY20",
      percentage: 20,
      startDate: "2025-11-20",
      endDate: "2025-11-30",
    },
    {
      code: "SPRING15",
      percentage: 15,
      startDate: "2025-03-01",
      endDate: "2025-03-31",
    },
  ]);

  const [formOpen, setFormOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("Tous");
  const [editingIndex, setEditingIndex] = useState(null);

  const [newCoupon, setNewCoupon] = useState({
    code: "",
    percentage: "",
    startDate: "",
    endDate: "",
  });

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);

  const handleCreateCoupon = () => {
    if (!newCoupon.code || !newCoupon.percentage) return;

    let updated = [...coupons];

    if (editingIndex !== null) {
      updated[editingIndex] = newCoupon;
    } else {
      updated.push(newCoupon);
    }

    setCoupons(updated);
    setNewCoupon({ code: "", percentage: "", startDate: "", endDate: "" });
    setEditingIndex(null);
    setFormOpen(false);
  };

  const handleDelete = (index) => {
    setDeleteIndex(index);
    setConfirmOpen(true);
  };

  const confirmDelete = () => {
    setCoupons(coupons.filter((_, i) => i !== deleteIndex));
    setDeleteIndex(null);
    setConfirmOpen(false);
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
    setNewCoupon(coupons[index]);
    setFormOpen(true);
  };

  const getStatus = (c) => {
    const today = new Date();
    const start = new Date(c.startDate);
    const end = new Date(c.endDate);

    if (today < start) return "Planifiés";
    if (today > end) return "Expirés";
    return "Actifs";
  };

  const filteredCoupons = coupons.filter((c) => {
    if (!c.code.toLowerCase().includes(search.toLowerCase())) return false;
    const status = getStatus(c);
    if (filter === "Tous") return true;
    return filter === status;
  });

  return (
    <div className="p-6 pb-28 font-poppins">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold">Gérer les coupons</h1>
        </div>

        <div className="flex items-center gap-3">
          <SearchBar
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Rechercher un produit..."
          />
          <AddButton
            onClick={() => {
              setEditingIndex(null);
              setFormOpen(true);
            }}
          >
            + Ajouter un coupon
          </AddButton>
        </div>
      </div>
      <FilterTabs
        tabs={["Tous", "Actifs", "Planifiés", "Expirés"]}
        active={filter}
        onChange={setFilter}
      />

      <h1 className="text-2xl font-semibold mb-4">Coupons</h1>

      <div className="space-y-4">
        {filteredCoupons.map((c, index) => (
          <div
            key={index}
            className="p-4 bg-gray-100 border-gray rounded-2xl shadow-lg flex justify-between items-center"
          >
            <div>
              <p className="font-semibold text-lg">{c.code}</p>
              <p className="text-sm text-gray-600">{c.percentage}%</p>
              <p className="text-xs text-gray-500">
                Du {c.startDate} au {c.endDate}
              </p>
            </div>

            <div className="flex gap-3">
              <EditButton onClick={() => handleEdit(index)} />
              <DeleteButton onClick={() => handleDelete(index)} />
            </div>
          </div>
        ))}

        {filteredCoupons.length === 0 && (
          <p className="text-gray-500 text-center mt-10">
            Aucun coupon trouvé.
          </p>
        )}
      </div>

      {formOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl shadow-lg w-full max-w-md max-h-[90vh] flex flex-col p-6 relative">
            <div className="bg-cyan-800 text-white py-3 px-4 rounded-t-2xl -mx-6 -mt-6 mb-4 text-lg font-semibold">
              {editingIndex !== null ? "Modifier le Coupon" : "Créer un Coupon"}
            </div>

            <label className="block mb-3">
              <span className="text-sm font-medium">Code du coupon</span>
              <div className="flex items-center border rounded-lg p-2 mt-1">
                <Tag size={18} className="text-gray-500 mr-2" />
                <input type="text" className="flex-1 outline-none"
                  placeholder="Ex: BLACKFRIDAY20" value={newCoupon.code}
                  onChange={(e) => setNewCoupon({ ...newCoupon, code: e.target.value })}/>
              </div>
            </label>

            <label className="block mb-3">
              <span className="text font-medium">Pourcentage</span>
              <div className="flex items-center border rounded-lg p-2 mt-1">
                <Percent size={18} className="text-gray-500 mr-2" />
                <input type="number" className="flex-1 outline-none" placeholder="Ex: 20"
                  value={newCoupon.percentage}
                  onChange={(e) => setNewCoupon({ ...newCoupon, percentage: e.target.value })}/>
              </div>
            </label>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <label className="block">
                <span className="text-sm font-medium">Date début</span>
                <div className="flex items-center border rounded-lg p-2 mt-1">
                  <Calendar size={18} className="text-gray-500 mr-2" />
                  <input type="date" className="flex-1 outline-none" value={newCoupon.startDate}
                    onChange={(e) => setNewCoupon({ ...newCoupon, startDate: e.target.value })}/>
                </div>
              </label>

              <label className="block">
                <span className="text-sm font-medium">Date fin</span>
                <div className="flex items-center border rounded-lg p-2 mt-1">
                  <Calendar size={18} className="text-gray-500 mr-2" />
                  <input type="date" className="flex-1 outline-none" value={newCoupon.endDate}
                    onChange={(e) => setNewCoupon({ ...newCoupon, endDate: e.target.value })}/>
                </div>
              </label>
            </div>

            <div className="flex justify-end mt-6 gap-3">
              <button onClick={() => setFormOpen(false)} className="px-4 py-2 rounded-full border border-gray-400 text-gray-600 hover:bg-gray-100">Annuler</button>
              <button onClick={handleCreateCoupon} className="bg-cyan-800 text-white px-5 py-2 rounded-full hover:bg-cyan-700">{editingIndex !== null ? "Enregistrer" : "Créer"}</button>
            </div>
          </div>
        </div>
      )}

      {formOpen && (
    
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
          </div>
        </div>
      )}

      {confirmOpen && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4">
          <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-sm">
            <h2 className="text-lg font-semibold mb-3 text-center">
              Confirmation de suppression
            </h2>

            <p className="text-center text-gray-700 mb-5">
              Êtes-vous sûr de vouloir supprimer ce coupon ?
            </p>

            <div className="flex mt-4">
              <button
                onClick={() => setConfirmOpen(false)}
                className="px-4 py-2 rounded-full border ml-8 mr-20 border-gray-400 text-gray-700"
              >
                Annuler
              </button>

              <button
                onClick={confirmDelete}
                className="px-4  py-2 rounded-full bg-cyan-900 text-white"
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
