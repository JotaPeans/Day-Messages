import React from "react";
import { ReactNode } from "react";
import "../css/bg.css";

interface ILayout {
    children: ReactNode,
    customClassName?: boolean,
    className?: string
}

const Layout = ({ children, customClassName = true, className }: ILayout) => {
    const classNameDefault = "w-screen h-screen flex justify-center items-center text-white font-mono";

    return (
        <section id="app" className={customClassName ? `${classNameDefault} ${className}` : className}>
            {children}
        </section>
    );
}
 
export default Layout;