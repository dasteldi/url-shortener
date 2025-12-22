import React, { useEffect, useState } from 'react';

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
            <nav className="nav">
                <ul className="nav-links">
                    <li><a href="#register">🔒 Регистрация</a></li>
                    <li><a href="#login">🔐 Вход</a></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;