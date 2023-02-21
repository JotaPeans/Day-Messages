import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";

//icons
import { HiOutlineLogout } from "react-icons/hi";
import { IoAddOutline } from "react-icons/io5";

//components
import Card from "../components/Card";
import PopupMessage from "../components/PopupMessage";

import test from "../images/test.png";

interface ICards {
    message: string,
    date: string
}   

const Home = () => {
    const [cards, setCards] = useState<ICards[]>([]);
    const [showPopup, setShowPopup] = useState(false);
    const navigate = useNavigate();

    function logOut() {
        localStorage.clear();
        return navigate("/");
    }

    useEffect(() => {
        setCards([
            {
                message: "te amo te amo te amo te amo te amo te amo te amo te amo te amo te amo te amo te amo te amo te amo te amo te amo te amo te amo ",
                date: "01/02/2023"
            },
            {
                message: "te amo 2",
                date: "01/02/2023"
            },
        ])
    }, []);

    return (
        <Layout customClassName={false} className="w-screen min-h-screen h-full flex justify-center text-white font-mono pt-[4.6rem] px-2 pb-20">
            <header className="fixed z-20 top-0 flex items-center justify-between px-5 w-full h-16 bg-[#934389]/80 backdrop-blur-lg shadow-lg">
                <div className="flex items-center gap-4">
                    <div className="h-10 rounded-xl overflow-clip">
                        <img className="h-full" src={test} alt="photo" />
                    </div>
                    <h2 className=" text-2xl font-semibold">usuario</h2>
                </div>
                <button onClick={logOut} className="p-2 bg-white/20 rounded-lg"><HiOutlineLogout className="text-xl"/></button>
            </header>

            <button onClick={e => setShowPopup(!showPopup)} className="fixed z-20 bottom-4 right-4 p-2 bg-slate-100/30 rounded-lg shadow-lg"><IoAddOutline className="text-3xl"/></button>

            <section className="w-full h-full flex flex-col gap-2">

                {cards.map((item, index) => {
                    return (
                        <Card key={index} message={item.message} date={item.date}/>
                    )
                })}

            </section>

            <PopupMessage show={showPopup} setShowPopup={setShowPopup}/>
        </Layout>
    );
}
 
export default Home;