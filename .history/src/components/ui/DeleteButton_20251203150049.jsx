import React from "react";
import { Trash2 } from "lucide-react";

export default function DeleteButton({onClick}){
    return(
        <button
            onClick={onClick}
            className="p-2 bg-orange-500 text-white rounded-full shadow-sm hover:bg-orange-600 hover:shadow transition-all duration-200"
        >
            <Trash2 size={20}/>
        </button>
    )
}