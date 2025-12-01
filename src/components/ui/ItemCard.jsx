import React from "react";

export default function ItemCard({children, actions}){
    return(
        <div className="p-4 bg-white rounded-xl shadow-sm border flex justify-between items-center">
            <div>{children}</div>
            <div className="flex gap-2">
                {actions}
            </div>
        </div>
    )
}