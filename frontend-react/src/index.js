import React from 'react';
import ReactDOM from 'react-dom/client';
import UrlShortener from './components/App.tsx';
import Header from './components/Header.tsx';
import './index.css'
import About from './components/About.tsx';
import Advantages from './components/Advantages.tsx';
import Basement from './Basement.tsx';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<div> <Header /> <About /> <Advantages /> <UrlShortener /> </div>);
// <UrlShortener />
// <Basement />