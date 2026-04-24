import React from 'react';
import ReactDOM from 'react-dom/client';
import UrlShortener from './components/App.tsx';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <UrlShortener />
  </React.StrictMode>
);