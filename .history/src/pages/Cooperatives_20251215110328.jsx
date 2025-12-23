import React, { useState, useEffect } from "react";
import SearchBar from "../components/ui/SearchBar";
import AddButton from "../components/ui/AddButton";
import DeleteButton from "../components/ui/DeleteButton";
import EditButton from "../components/ui/EditButton";
import cooperativesService from "../api/cooperativesService";
import productsService from "../api/productsService";

export default function Cooperatives() {
  const [cooperatives, setCooperatives] = useState([]);
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [coopToDelete, setCoopToDelete] = useState(null);
  const [editingCoop, setEditingCoop] = useState(null);
  const [coopData, setCoopData] = useState({
    name: "",
    shortDesc: "",
    longDesc: "",
    photo: "",
    videoURL: "",
  });

  useEffect(() => {
    const loadData = async () => {
      try{
        const res = await cooperativesService.getCooperatives();

        const data = Array.isArray(res.data)
          ? res.data
          : res.data?.cooperatives || [];

          setCooperatives(data);
      } catch (err){
        console.error("Erreur lors du chargement des données", err);
        setCooperatives([]);
      }
    };
    loadData();
  }, []);

  const calculateProductCount = (coopId) => {
    return products.filter(p => p.cooperativeId === coopId).length;
  };

  const handleSave = async () => {
    if (!coopData.name || !coopData.address || !coopData.date) return;
    try{
      if(editingCoop){
        await cooperativesService.update(editingCoop.id, coopData);
        setCooperatives(prev =>
          prev.map(c => c.id === editingCoop.id ? {...c, ...coopData} : c)
        );
      }else{
        const res = await cooperativesService.createCooperative({...coopData, productCount: 0});
        setCooperatives(prev => [...prev, res.data]);
      }
      setShowModal(false);
      setEditingCoop(null);
      setCoopData({ name: "", address: "", date: ""});
        } catch (err){
          console.error("Erreur lors de l'enregistrement", err);
        }

    setShowModal(false);
    setEditingCoop(null);
    setCoopData({ name: "", address: "", date: "" });
  };

  const handleDeleteRequest = (coop) => {
    setCoopToDelete(coop);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      await cooperativesService.delete(coopToDelete.id);
      setCooperatives(prev => prev.filter(c => c.id !== coopToDelete.id));
      setShowDeleteModal(false);
      setCoopToDelete(null);
    } catch (err) {
      console.error("Error lors de la suppression", err);
    }
  };

  const handleEdit = (coop) => {
    setEditingCoop(coop);
    setCoopData({
      name: coop.name,
      address: coop.address,
      date: coop.date,
    });
    setShowModal(true);
  };

  const filteredCoops = (cooperatives || []).filter(coop =>
    coop.name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 relative">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Gérer les coopératives</h1>

        <div className="flex items-center gap-3">
          <SearchBar
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Rechercher une coopérative"
          />

          <AddButton
            onClick={() => {
              setEditingCoop(null);
              setCoopData({ name: "", address: "", date: "" });
              setShowModal(true);
            }}
          >
            + Ajouter une coopérative
          </AddButton>
        </div>
      </div>

      {filteredCoops.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCoops.map((coop) => (
            <div
              key={coop.id}
              className="bg-gray-100 shadow-sm rounded-2xl p-6 flex flex-col justify-between"
            >
              <div>
                {coop.photo && (
                  <img
                    src={coop.photo}
                    alt={coop.name}
                    className="w-full h-32 object-cover rounded-xl mb-3" />
                )}
                <h2 className="text-lg font-semibold mb-2">{coop.name}</h2>
                {coop.shortDesc && (
                  <p className="text-sm text-gray-600 mb-1">
                    {coop.shortDesc}
                  </p>
                )}
                {coop.vision && (
                  <p className="text-sm text-gray-500 italic">
                    Vision : {coop.vision}
                  </p>
                )}
              </div>

              <div className="flex justify-end gap-2 mt-4">
                <EditButton onClick={() => handleEdit(coop)} />
                <DeleteButton onClick={() => handleDeleteRequest(coop)} />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center border border-dashed border-cyan-900 rounded-2xl py-16 mt-10">
          <h2 className="text-xl font-medium text-gray-800">
            Aucune coopérative trouvée
          </h2>
          <p className="text-gray-500 mb-6">
            Ajoutez vos coopératives pour commencer
          </p>
          <button
            onClick={() => setShowModal(true)}
            className="bg-cyan-800 text-white px-5 py-2 rounded-full hover:bg-cyan-700"
          >
            + Ajouter une coopérative
          </button>
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl shadow-lg w-full max-w-md max-h-[90vh] flex flex-col p-6 relative">
            <div className="bg-cyan-800 text-white py-3 px-4 rounded-t-2xl -mx-6 -mt-6 mb-4 text-lg font-semibold">
              {editingCoop ? "Modifier la coopérative" : "Ajouter une coopérative"}
            </div>

            <div className="px-6 pb-6 overflow-y-auto">
              <div>
                <label className="text-sm font-medium text-gray-700">Nom</label>
                <input
                  type="text"
                  placeholder="Name"
                  value={coopData.name}
                  onChange={(e) =>
                    setCoopData({ ...coopData, name: e.target.value })
                  }
                  className="mt-1 w-full border rounded-lg p-2"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">Description courte</label>
                <textarea
                  placeholder="Description courte"
                  value={coopData.shortDesc}
                  onChange={(e) =>
                    setCoopData({...coopData, shortDesc: e.target.value})}
                  className="mt-1 w-full border rounded-lg p-2"/>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">Description longue</label>
                <textarea
                  placeholder="Description courte"
                  value={coopData.shortDesc}
                  onChange={(e) =>
                    setCoopData({...coopData, shortDesc: e.target.value})}
                  className="mt-1 w-full border rounded-lg p-2"/>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">Vision</label>
                <input
                  type="text"
                  placeholder="Vision"
                  value={coopData.name}
                  onChange={(e) =>
                    setCoopData({ ...coopData, name: e.target.value })
                  }
                  className="mt-1 w-full border rounded-lg p-2"
                />
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={() => {
                    setShowModal(false);
                    setEditingCoop(null);
                  }}
                  className="px-4 py-2 rounded-full border border-gray-400 text-gray-600 hover:bg-gray-100"
                >
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

      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl shadow-lg w-full max-w-sm p-6 text-center">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Supprimer cette coopérative ?
            </h3>

            <p className="text-gray-500 mb-6">
              Êtes-vous sûr de vouloir supprimer{" "}
              <span className="font-medium text-gray-800">
                {coopToDelete?.name}
              </span>{" "}
              ?
            </p>

            <div className="flex justify-center gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
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
