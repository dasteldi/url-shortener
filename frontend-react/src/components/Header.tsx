import React from "react";

function Header() {
    return (
        <header>
            <img src="/favicon.ico" alt="Icon" className="logo"></img>
            <a href="/">Home</a>
            <a href="/about">Other services</a>
            <a href="/vacansy">Contact</a>
        </header>
    );
}


export default Header;