import React from "react";
import { Trash2 } from "lucide-react";

export default function DeleteButton({onClick}){
    return(
        <button
            onClick={onClick}
            className="text-amber-500 hover:text-amber-700 transition"
        >
            <Trash2 size={20}/>
        </button>
    )
}