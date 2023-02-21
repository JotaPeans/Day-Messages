import React from "react";

interface ICards {
    message: string,
    date: string
}

const Card = ({ message, date }: ICards) => {
    return (
        <div className="relative z-10 bg-slate-300/40 w-full min-h-[10rem] h-auto rounded-lg shadow-lg py-2 px-3">
            <p className="text-justify">{message}</p>
            <span className="absolute bottom-2 right-2 text-xs text-slate-300">{date}</span>
        </div>
    )
}

export default Card;