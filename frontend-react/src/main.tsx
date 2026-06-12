import React from 'react';
import ReactDOM from 'react-dom/client';
import UrlShortener from './components/App.tsx';
import './index.css';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root element not found');
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <UrlShortener />
  </React.StrictMode>
);
