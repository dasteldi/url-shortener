import React from "react";

function Header() {
    return (
        <header>
            <img src="/favicon.ico" alt="Icon" className="logo"></img>
            <a href="/">Главная</a>
            <a href="/about">Другие сервисы</a>
            <a href="/vacansy">Контакты</a>
        </header>
    );
}


export default Header;