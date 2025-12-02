import React from "react";

export default function FilterTabs({tabs, active, onChange}){
    return(
        <div className="flex gap-3 mb-6">
            {tabs.map((tab) => (
                <button
                    key={tab}
                    onClick={() => onChange(tab)}
                    className={`px-4 py-1 rounded-full text-sm font-medium border transition ${
                        active === tab ?
                        ? "bg-[#2ba4b9] text-white border-[#" : "bg-white"
                    }`}
                    >
                        {tab}
                    </button>
            ))}
        </div>
    )
}