import React, { useEffect, useState } from "react";
import { useLocalStorage } from "usehooks-ts";
import { ReactNode } from "react"
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";

import AppContext from "./assets/context/AppContext";

//Routes
import Login from "./assets/routes/Login";
import Home from "./assets/routes/Home";

//interfaces
import IUser from "./assets/Interfaces/IUser";

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

const App = () => {
    const [user, setUser] = useLocalStorage<IUser | null>("userData", null);
    const [success, setSuccess] = useState(false);

    return (
        <AppContext.Provider value={{user, setUser, success, setSuccess}}>
            <HashRouter>
                <Routes>
                    <Route index path="/" element={ <Login/> }/>
                    <Route path="/home" element={ <PrivateRoute privateElement={ <Home/> }/> }/>
                </Routes>
            </HashRouter>
        </AppContext.Provider>
    );
}
 
export default App;
