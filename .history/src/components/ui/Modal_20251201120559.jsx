import React from "react";

export default function Modal({show, title, children, onClose, onSave, saveText = "Enregistrer", cancelText = "Annuler"}){
    if(!show) return null;

    return(
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
            <div className="bg-white rounded-2xl shadow-lg w-full max-w-md max-h-[90vh] flex flex-col p-6 relative">
                div.bg-cyan
            </div>
        </div>
    )
}