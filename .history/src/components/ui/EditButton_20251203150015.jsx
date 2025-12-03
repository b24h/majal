import React from "react";
import {Pencil} from "lucide-react";

export default function EditButton({onClick}){
    return(
        <button
            onClick={onClick}
            className="w-9 h-9 flex items-center justify-center rounded-full bg-yellow-500 text-white hover:bg-yellow-600 shadow-sm hover:shadow transition-all duration-200"
        >
            <Pencil size={20}/>
        </button>
    )
}