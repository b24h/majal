import React from "react";
import {Plus} from "lucide-react";

export default function AddButton({onClick, children}){
    return(
        <button
            onClick={onClick}
            className="flex items-center gap-2 bg-cyan-800 text-white px-4 py-2 rounded-full shadow hover:bg-cyan-700">
                
            </button>
    )
}