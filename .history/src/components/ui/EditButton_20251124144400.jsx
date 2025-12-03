import React from "react";
import {Pencil} from "lucide-react";

export default function EditButton({onClick}){
    return(
        <button
            onClick={onClick}
            className="text-cyan-900 hover:text-cyan-800 transition"
        >
            <Pencil size={20}/>
        </button>
    )
}