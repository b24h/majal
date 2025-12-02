import React from "react";
import {Plus} from "lucide-react";

export default function AddButton({onClick}){
    return(
        <button
            onClick={onClick}
            className="flex items bottom-10 right-6 bg-[#2ba4b9] text-white rounded-full p-4 shadow-lg z-50">
                <Plus size={24}/>
            </button>
    )
}