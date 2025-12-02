import React from "react";

export default function SearchBar({value, onChange, placeholder}){
    return(
        <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder || "Rechercher..."}
            className="px-4 py-"/>
        )
}