import React from "react";
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
    const user = localStorage.getItem("user");
    if(!user) {
        return privateElement
    }

    return <Navigate to="/"/>
}


const App = () => {
    return (
        <AppContext.Provider value={{}}>
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
