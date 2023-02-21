import React, { useRef, useState, useEffect } from "react";
import { FormEvent } from "react";
import axios from "axios";
import Layout from "../components/Layout";
import { RiShieldUserLine } from "react-icons/ri";

const Login = () => {
    const mailRef = useRef<HTMLInputElement>(null);
    const passwRef = useRef<HTMLInputElement>(null);

    const signin = (e: FormEvent): void => {
        e.preventDefault();
        if(mailRef.current && passwRef.current) {
            console.log(mailRef.current.value);
            console.log(passwRef.current.value);
        }
    }

    return (
        <Layout className=" w-screen h-screen flex flex-col justify-center items-center gap-10 text-white">
            <RiShieldUserLine className="text-8xl"/>

            <form onSubmit={e => signin(e)} className=" flex flex-col gap-2 ">
                <input className="px-2 py-1 rounded text-slate-900" placeholder="Username" ref={mailRef} type="text"/>

                <input className="px-2 py-1 rounded text-slate-900" placeholder="Password" ref={passwRef} type="password"/>

                <input type="submit" value="Sign in" className="border-2 transition-all rounded cursor-pointer hover:bg-slate-100 hover:text-slate-900"/>
            </form>
        </Layout>
    );
}
 
export default Login;