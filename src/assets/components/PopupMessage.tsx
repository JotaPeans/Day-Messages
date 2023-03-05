import React, { useState, useEffect, useRef, FormEvent, useContext } from "react";
import { Dispatch } from "react";

//icons
import { AiOutlineCloseCircle } from "react-icons/ai";
import api from "../api/api";
import AppContext from "../context/AppContext";

interface IPopup {
    show: boolean,
    setShowPopup: Dispatch<React.SetStateAction<boolean>>
}

interface IUserDB {
    _id: string,
    cpf: string,
    userPhoto: string
}

const PopupMessage = ({show, setShowPopup} : IPopup) => {
    const { user, setSuccess } = useContext(AppContext);
    const [userToId, setUserToId] = useState<string>();
    const [users, setUsers] = useState<IUserDB[]>();
    const message = useRef<HTMLTextAreaElement>(null);

    async function submitMessage(e: FormEvent) {
        e.preventDefault();
        if(message.current) {
            const postMessageRes = await api.post("/message", {
                userFromId: user?.userId,
                userToId: userToId,
                message: message.current.value
            }, { headers: {Authorization: `bearer ${user?.token}`} });

            if(postMessageRes.status === 200) {
                setSuccess ? setSuccess(true) : null
                setInterval(() => {
                    setSuccess ? setSuccess(false) : null;
                    message.current.value = "";
                    seShowPopup(false);
                }, 3000);
            }
            else {
                //TODO setFailed();
            }
        }
    }

    function closePopup() {
        if(message.current) {
            message.current.value = "";
        }
        setShowPopup(false);
    }

    async function loadUsers() {
        const usersRes = await api.get("/user", {
            headers: {
                authorization: `bearer ${user?.token}`
            }
        });
        const usersData: IUserDB[] = await usersRes.data;
        const newUsersData = usersData.filter(value => {
            if (value._id !== user?.userId) {
                return value;
            }
        })
        
        setUsers(newUsersData)

    }

    function selectUserToMessage(userId: string) {
        setUserToId(userId);
    }

    useEffect(() => {
        loadUsers();
    }, []);

    return (
        <div className={`fixed z-40 top-0 left-0 w-screen h-screen flex justify-center items-center p-5 ${!show ? "pointer-events-none" : null}`}>
            <div className={`transition-all duration-200 absolute w-screen h-screen top-0 left-0 z-30 bg-black/50 ${show ? "opacity-100" : "opacity-0"}`}></div>

            <div className={`transition-all duration-200 text-slate-900 relative z-40 w-full min-h-[16rem] bg-white rounded-xl p-2 ${show ? "" : "scale-110 opacity-0"}`}>
                <div className=" w-full flex items-center justify-end"><AiOutlineCloseCircle onClick={closePopup} className="text-black text-2xl cursor-pointer"/></div>

                <div className="w-full flex gap-1 mb-2">
                    {users?.map((item, index) => {
                        return (
                            <div onClick={() => selectUserToMessage(item._id)} key={index} className={`h-10 w-10 rounded-xl overflow-clip flex justify-center items-center cursor-pointer transition-all hover:scale-105 ${item._id === userToId ? " border-[3px] border-blue-500" : null}`}>
                                <img src={`data:image/jpeg;base64,${item.userPhoto}`} alt="photo" />
                            </div>
                        )
                    })}
                </div>

                <form onSubmit={e => submitMessage(e)} className="flex flex-col">
                    <label htmlFor="message">Mensagem:</label>
                    <textarea ref={message} className="border p-1" id="message" cols={30} rows={10}></textarea>
                    <input disabled={!userToId ? true : false} className={`p-2 transition-all rounded-md font-bold text-white mt-2 ${!userToId ? " bg-slate-400/50 cursor-not-allowed" : "bg-violet-500 hover:bg-violet-600 cursor-pointer"}`} type="submit" value="Submit" />
                </form>
            </div>
        </div>
    );
}
 
export default PopupMessage;