import React, { useState, useEffect, useRef, FormEvent } from "react";
import { Dispatch } from "react";

//icons
import { AiOutlineCloseCircle } from "react-icons/ai";

interface IPopup {
    show: boolean,
    setShowPopup: Dispatch<React.SetStateAction<boolean>>
}

const PopupMessage = ({show, setShowPopup} : IPopup) => {
    const message = useRef<HTMLTextAreaElement>(null);

    function submitMessage(e: FormEvent) {
        e.preventDefault();
        if(message.current) {
            alert(message.current.value)
        }
    }

    function closePopup() {
        if(message.current) {
            message.current.value = "";
        }
        setShowPopup(false);
    }

    return (
        <div className={`fixed z-40 top-0 left-0 w-screen h-screen flex justify-center items-center p-5 ${!show ? "pointer-events-none" : null}`}>
            <div className={`transition-all duration-200 absolute w-screen h-screen top-0 left-0 z-30 bg-black/50 ${show ? "opacity-100" : "opacity-0"}`}></div>

            <div className={`transition-all duration-200 text-slate-900 relative z-40 w-full min-h-[16rem] bg-white rounded-xl p-2 ${show ? "" : "scale-110 opacity-0"}`}>
                <div className=" w-full flex items-center justify-end"><AiOutlineCloseCircle onClick={closePopup} className="text-black text-2xl cursor-pointer"/></div>

                <form onSubmit={e => submitMessage(e)} className="flex flex-col">
                    <label htmlFor="message">Mensagem</label>
                    <textarea ref={message} className="border p-1" id="message" cols={30} rows={10}></textarea>
                    <input className="p-2 bg-violet-500 hover:bg-violet-600 transition-all rounded-md font-bold text-white mt-2" type="submit" value="Submit" />
                </form>
            </div>
        </div>
    );
}
 
export default PopupMessage;