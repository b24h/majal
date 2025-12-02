import React from "react";

export default function SearchBar({value, onChange, placeholder}){
    return(
        <div className="flex items-center gap-3">
            <input type="text" className="px-4 py-2 rounded-full border w-72 bg-white" />
        </div>
    )
}