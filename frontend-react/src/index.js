import React from 'react';
import ReactDOM from 'react-dom/client';
import UrlShortener from './components/App.tsx';
import Header from './components/Header.tsx';
import './index.css'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<div> <Header /> <UrlShortener />  </div>);
