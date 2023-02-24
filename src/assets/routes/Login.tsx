import React, { useRef, useState, useEffect, useContext } from "react";
import AppContext from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import { FormEvent } from "react";

//axios config 
import api from "../api/api";

//components
import Layout from "../components/Layout";

//icons
import { RiShieldUserLine } from "react-icons/ri";

//interfaces
import IUser from "../Interfaces/IUser";

const Login = () => {
    const { user, setUser } = useContext(AppContext);
    const cpfRef = useRef<HTMLInputElement>(null);
    const passwRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    const signin = async (e: FormEvent) => {
        e.preventDefault();
        if(cpfRef.current && passwRef.current) {
            const cpf = cpfRef.current.value;
            const password = passwRef.current.value

            const body = {
                cpf: cpf,
                password: password
            }
            
            const loginRes = await api.post("/signin", body);

            const loginData: IUser = await loginRes.data;
            setUser ? setUser(loginData) : null;
            return navigate("/home");
        }
    }

    useEffect(() => {
        if(user || localStorage.getItem("userData")) {
            navigate("/home");
        }
    }, []);

    return (
        <Layout className=" w-screen h-screen flex flex-col justify-center items-center gap-10 text-white">
            <RiShieldUserLine className="text-8xl"/>

            <form onSubmit={e => signin(e)} className=" flex flex-col gap-2 ">
                <input className="px-2 py-1 rounded text-slate-900" placeholder="Cpf" ref={cpfRef} type="text"/>

                <input className="px-2 py-1 rounded text-slate-900" placeholder="Password" ref={passwRef} type="password"/>

                <input type="submit" value="Sign in" className="border-2 transition-all rounded cursor-pointer hover:bg-slate-100 hover:text-slate-900"/>
            </form>
        </Layout>
    );
}
 
export default Login;