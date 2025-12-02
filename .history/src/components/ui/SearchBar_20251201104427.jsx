import React from "react";

export default function SearchBar({value, onChange, placeholder}){
    return(
        <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder || "Rechercher..."}
            className="px-w-full bg-cyan-800 text-gray-200 rounded-full px-4 py-2 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-200"/>
        )
}