import React from "react";

export default function Modal({show, title, children, onClose, onSave, saveText = "Enregistrer", cancelText = "Annuler"}){
    if(!show) return null;

    return(
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
            <div className="bg-white rounded-2xl shadow-lg w-full max-w-md max-h-[90vh] flex flex-col p-6 relative">
                <div className="bg-cyan-800 text-white py-3 px-4 rounded-t-2xl mx-6 -mt-6 mb-4 text-lg font-semibold">
                    {title}
                </div>
                <div className="px-6 pb-6 overflow-y-auto">
                    {children}
                </div>
                <div className="flex justify-end gap-3 mt-4 px-6">
                    <button className="px-4 py-2 rounded-full border border-gray-400 text-gray-600 hover:bg-gray-100">
                        {cancelText}
                    </button>
                    <button className="bg-cyan-800 text-"></button>
                </div>
            </div>
        </div>
    )
}