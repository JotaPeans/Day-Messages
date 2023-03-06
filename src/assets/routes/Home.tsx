import React, { useState, useEffect, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";

//icons
import { HiOutlineLogout } from "react-icons/hi";
import { IoAddOutline } from "react-icons/io5";

//components
import Card from "../components/Card";
import PopupMessage from "../components/PopupMessage";
import Success from "../components/Success";

import test from "../images/test.png";
import AppContext from "../context/AppContext";
import api from "../api/api";
import { AxiosError } from "axios";

interface IMessage {
    userFromId: string,
    userToId: string,
    message: string,
    date: string
}

const Home = () => {
    const { user, setUser } = useContext(AppContext);
    const [cards, setCards] = useState<IMessage[]>([]);
    const [showPopup, setShowPopup] = useState(false);
    const navigate = useNavigate();

    function logOut() {
        setUser ? setUser(null) : null;
        localStorage.clear();
        return navigate("/");
    }

    async function loadMessages() {
        try {
            const messageRes = await api.get(`/message/${user?.userId}`, {
                headers: {
                    Authorization: `bearer ${user?.token}`
                }
            });
            const messageData: IMessage[] = await messageRes.data;
            //console.log(messageData);
        
            setCards(messageData.reverse());
        } catch (err) {
            console.log(err)
            if(err instanceof AxiosError) {                
                if(err.response?.data) {
                    setUser ? setUser(null) : null;
                    console.log(err.response?.data.message);
                    navigate("/");
                }
            }
        }
    }

    useEffect(() => {
        loadMessages();
    }, []);

    return (
        <Layout customClassName={false} className="w-screen min-h-screen h-full flex justify-center text-white font-mono pt-[4.6rem] px-2 pb-20">
            <header className="fixed z-20 top-0 flex items-center justify-between px-5 w-full h-16 bg-[#934389]/80 backdrop-blur-lg shadow-lg">
                <div className="flex items-center gap-4">
                    <div className="h-10 rounded-xl overflow-clip">
                        <img className="h-full" src={`data:image/jpeg;base64,${user?.userPhoto}`} alt="photo" />
                    </div>
                    <h2 className=" text-2xl font-semibold">{user?.userName}</h2>
                </div>
                <button onClick={logOut} className="p-2 bg-white/20 rounded-lg"><HiOutlineLogout className="text-xl"/></button>
            </header>

            <Success/>

            <button onClick={e => setShowPopup(!showPopup)} className="fixed z-20 bottom-4 right-4 p-2 bg-[#934389]/80 backdrop-blur-md rounded-lg shadow-lg"><IoAddOutline className="text-3xl"/></button>

            <section className="w-full h-full flex flex-col gap-2">

                {cards.length >= 1 ? (
                    cards.map((item, index) => {
                        return (
                            <Card key={index} message={item.message} date={item.date}/>
                        )
                    })

                ) : (
                    <div className="relative z-10 bg-slate-300/20 w-full min-h-[10rem] h-auto rounded-lg shadow-lg py-2 px-3 animate-pulse">

                    </div>
                )}

            </section>

            <PopupMessage show={showPopup} setShowPopup={setShowPopup}/>
        </Layout>
    );
}
 
export default Home;