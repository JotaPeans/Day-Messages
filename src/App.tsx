import React, { useEffect, useState } from "react";
import { useLocalStorage } from "usehooks-ts";
import { ReactNode } from "react"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import AppContext from "./assets/context/AppContext";

//Routes
import Login from "./assets/routes/Login";
import Home from "./assets/routes/Home";

interface IPrivateRoute {
    privateElement: JSX.Element
}

function PrivateRoute({privateElement}: IPrivateRoute) {
    const user = localStorage.getItem("userData");
    if(user) {
        return privateElement
    }

    return <Navigate to="/"/>
}

interface IUser {
    user: string[],
    token: string
}

const App = () => {
    const [user, setUser] = useLocalStorage<IUser | null>("userData", null);
    const [success, setSuccess] = useState(false);

    return (
        <AppContext.Provider value={{user, setUser, success, setSuccess}}>
            <BrowserRouter>
                <Routes>
                    <Route index path="/" element={ <Login/> }/>
                    <Route path="/home" element={ <PrivateRoute privateElement={ <Home/> }/> }/>
                </Routes>
            </BrowserRouter>
        </AppContext.Provider>
    );
}
 
export default App;
