import React from "react";

interface ICards {
    message: string,
    date: string,
    isNew: boolean
}

const Card = ({ message, date, isNew }: ICards) => {
    return (
        <div className="relative z-10 bg-slate-300/40 w-full min-h-[10rem] h-auto rounded-lg shadow-lg py-2 px-3">
            <p className="text-justify">{message}</p>
            <span className="absolute bottom-2 right-2 text-xs text-slate-300">{date}</span>
            {isNew ? <span className="absolute bottom-2 left-2 text-xs text-red-400 font-bold">Nova!</span> : null}
        </div>
    )
}

export default Card;