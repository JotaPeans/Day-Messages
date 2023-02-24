import React, { useContext, useState } from "react";
import AppContext from "../context/AppContext";

const Success = () => {
    const { success } = useContext(AppContext);
    return (
        <div className="fixed pointer-events-none top-0 left-0 w-screen h-screen flex justify-center items-center z-50">
            <div className={`absolute bg-emerald-400/95 shadow-xl font-semibold font-sans p-3 rounded-lg transition-all ${success ? " top-4" : " -top-52"}`}>
                Mensagem Criada!
            </div>
        </div>
    );
}
 
export default Success;