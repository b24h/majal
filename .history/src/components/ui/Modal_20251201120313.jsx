import React from "react";

export default function Modal({show, title, children, onClose, onSave, saveText = "Enregis"}){
    if(!open) return null;

    return(
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center p-4 z-50">
            <div className="bg-white p-6 rounded-2xl w-full max-w-md shadow-lg">
                {children}

                <div className="flex justify-end mt-4">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 border rounded-lg">
                            Fermer
                        </button>
                </div>
            </div>
        </div>
    )
}